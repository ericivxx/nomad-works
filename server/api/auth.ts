import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { loginSchema, registerSchema, checkEmailSchema, User } from "@shared/schema";
import { z } from "zod";
import 'express-session';

// Extend express-session with our custom data
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      fullName?: string | null;
      gender?: string | null;
      location?: string | null;
      savedJobs?: string[];
      role?: string;
    };
  }
}

const router = Router();

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validationResult = registerSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input data", 
        details: validationResult.error.errors 
      });
    }
    
    const userData = validationResult.data;
    
    // Check if email already exists
    const emailExists = await storage.checkEmailExists(userData.email);
    if (emailExists) {
      return res.status(409).json({ 
        error: "An account with this email already exists. Please login instead.",
        exists: true 
      });
    }
    
    // Create user
    const user = await storage.createUser(userData);
    
    // Remove the password from the response
    const { password, ...userWithoutPassword } = user;
    
    // Set session data
    req.session.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      location: user.location
    };
    
    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Check if an email exists
router.post("/check-email", async (req: Request, res: Response) => {
  try {
    const validationResult = checkEmailSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid email format", 
        details: validationResult.error.errors 
      });
    }
    
    const { email } = validationResult.data;
    const exists = await storage.checkEmailExists(email);
    
    res.json({ exists });
  } catch (err) {
    console.error('Check email error:', err);
    res.status(500).json({ error: "Failed to check email" });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input data", 
        details: validationResult.error.errors 
      });
    }
    
    const { email, password } = validationResult.data;
    
    // Validate credentials and get user
    const user = await storage.validateUserCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Update last login time
    await storage.updateUserLastLogin(user.id);
    
    // Set session data
    req.session.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      location: user.location
    };
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get current session
router.get('/session', (req: Request, res: Response) => {
  if (req.session?.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout route
router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Logout failed' });
    } else {
      res.json({ success: true });
    }
  });
});

// Save job to user's saved jobs
router.post('/save-job', async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const { jobSlug } = req.body;
    
    if (!jobSlug) {
      return res.status(400).json({ error: 'Job slug is required' });
    }
    
    // Get the current user
    const user = await storage.getUserById(req.session.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Add job to saved jobs
    const updatedUser = await storage.saveUserJob(user.id, jobSlug);
    
    if (!updatedUser) {
      return res.status(500).json({ error: 'Failed to save job' });
    }
    
    // Update session with the new user data
    req.session.user = {
      id: updatedUser.id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      gender: updatedUser.gender,
      location: updatedUser.location,
      savedJobs: updatedUser.savedJobs || []
    };
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error('Error saving job:', err);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

// Remove job from user's saved jobs
router.post('/unsave-job', async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const { jobSlug } = req.body;
    
    if (!jobSlug) {
      return res.status(400).json({ error: 'Job slug is required' });
    }
    
    // Get the current user
    const user = await storage.getUserById(req.session.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove job from saved jobs
    const updatedUser = await storage.unsaveUserJob(user.id, jobSlug);
    
    if (!updatedUser) {
      return res.status(500).json({ error: 'Failed to unsave job' });
    }
    
    // Update session with the new user data
    req.session.user = {
      id: updatedUser.id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      gender: updatedUser.gender,
      location: updatedUser.location,
      savedJobs: updatedUser.savedJobs || []
    };
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error('Error unsaving job:', err);
    res.status(500).json({ error: 'Failed to unsave job' });
  }
});

export default router;