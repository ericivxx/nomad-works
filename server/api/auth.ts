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
    };
  }
}

const router = Router();

// Helper function to get current session
function getSession(req: Request) {
    return req.session;
}

// Helper function to set session
function setSession(req: Request, user: {
    id: number;
    email: string;
    fullName?: string | null;
    gender?: string | null;
    location?: string | null;
}) {
    req.session.user = user;
}

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
    
    // Create and set session
    const session: Session = { 
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        location: user.location
      } 
    };
    setSession(req, session);
    
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
    
    // Create session
    const session: Session = { 
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        location: user.location
      } 
    };
    setSession(req, session);
    
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
  const session = getSession(req);
  if (session?.user) {
    res.json({ user: session.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout route
router.post('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.json({ success: true });
});

export default router;