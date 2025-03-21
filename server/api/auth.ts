import { Router, Request, Response } from "express";
import { storage } from "../storage";
import { 
  loginSchema, 
  registerSchema, 
  checkEmailSchema, 
  changePasswordSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema,
  User 
} from "@shared/schema";
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
      location: user.location,
      role: user.role
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
    console.log('Check email request received:', req.body);
    const validationResult = checkEmailSchema.safeParse(req.body);

    if (!validationResult.success) {
      console.log('Email validation failed:', validationResult.error.errors);
      return res.status(400).json({ 
        error: "Invalid email format", 
        details: validationResult.error.errors 
      });
    }

    const { email } = validationResult.data;
    console.log('Checking if email exists:', email);
    const exists = await storage.checkEmailExists(email);
    console.log('Email exists result:', exists);

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
      return res.status(400).json({ error: "Invalid input data", details: validationResult.error.errors });
    }

    const { email, password } = validationResult.data;

    // Get user by email
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password using validateUserCredentials
    const validUser = await storage.validateUserCredentials(email, password);
    if (!validUser) {
      console.log('Invalid credentials for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set session data
    req.session.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      location: user.location,
      role: user.role
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
      savedJobs: updatedUser.savedJobs || [],
      role: updatedUser.role
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
      savedJobs: updatedUser.savedJobs || [],
      role: updatedUser.role
    };

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.error('Error unsaving job:', err);
    res.status(500).json({ error: 'Failed to unsave job' });
  }
});

// Change password route
router.post('/change-password', async (req: Request, res: Response) => {
  try {
    // Check if user is authenticated
    if (!req.session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Validate input data
    const validationResult = changePasswordSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input data", 
        details: validationResult.error.errors 
      });
    }

    const { currentPassword, newPassword } = validationResult.data;
    
    // Change the password
    const success = await storage.changePassword(
      req.session.user.id, 
      currentPassword, 
      newPassword
    );

    if (!success) {
      return res.status(400).json({ error: 'Failed to change password. Please verify your current password.' });
    }

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Request password reset
router.post('/reset-password-request', async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validationResult = resetPasswordRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid email format", 
        details: validationResult.error.errors 
      });
    }

    const { email } = validationResult.data;
    
    // Check if the user exists
    const exists = await storage.checkEmailExists(email);
    if (!exists) {
      // For security reasons, don't reveal that the email doesn't exist
      // Just return success to prevent email enumeration attacks
      return res.json({ 
        success: true, 
        message: 'If an account with this email exists, a password reset link has been sent.' 
      });
    }
    
    // Create a password reset token
    const token = await storage.createPasswordResetToken(email);
    
    if (!token) {
      return res.status(500).json({ error: 'Failed to create password reset token' });
    }
    
    // In a real application, send an email with the reset link
    // For this example, we'll just return the token in the response
    // NOTE: In production, you would NOT return the token, but email it instead!
    
    console.log(`Reset token created for ${email}: ${token}`);
    
    res.json({ 
      success: true, 
      message: 'If an account with this email exists, a password reset link has been sent.',
      token: token // Only for demonstration - would not be returned in production
    });
  } catch (err) {
    console.error('Error requesting password reset:', err);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// Reset password with token
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validationResult = resetPasswordSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "Invalid input data", 
        details: validationResult.error.errors 
      });
    }

    const { token, newPassword } = validationResult.data;
    
    // Validate the token and get the user ID
    const userId = await storage.validatePasswordResetToken(token);
    
    if (!userId) {
      return res.status(400).json({ 
        error: 'Invalid or expired reset token. Please request a new password reset link.' 
      });
    }
    
    // Reset the password
    const success = await storage.resetPassword(userId, newPassword);
    
    if (!success) {
      return res.status(500).json({ error: 'Failed to reset password' });
    }
    
    res.json({ 
      success: true, 
      message: 'Password has been reset successfully. You can now log in with your new password.' 
    });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

export default router;