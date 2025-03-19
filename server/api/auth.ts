
import { Router } from "express";
import { storage } from "../storage";

const router = Router();

interface User {
  id: string;
  email: string;
}

const users = new Map<string, { email: string; password: string }>();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user already exists
  if (users.has(email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Create new user
  const id = Math.random().toString(36).substring(2);
  users.set(email, { email, password });

  // Return user without password
  res.status(201).json({ 
    user: { id, email }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  const user = users.get(email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ 
    user: { id: Math.random().toString(36).substring(2), email }
  });
});

export default router;
