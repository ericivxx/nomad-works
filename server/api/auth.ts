import { Router } from "express";
import { storage } from "../storage";

const router = Router();

interface User {
  id: string;
  email: string;
  fullName?: string;
  gender?: string;
  location?: string;
}

const users = new Map<string, User & { password: string }>();

router.post("/register", (req, res) => {
  try {
    const { email, password, fullName, gender, location } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Normalize email and check for existing user
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = Array.from(users.values()).find(u => u.email.toLowerCase().trim() === normalizedEmail);
    
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    // Create new user
    const id = Math.random().toString(36).substring(2);
    const user = { id, email: normalizedEmail, password, fullName, gender, location };
    users.set(normalizedEmail, user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
  console.log('User registered:', normalizedEmail);
    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.get(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

export default router;