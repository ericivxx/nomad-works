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
  const { email, password, fullName, gender, location } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if user already exists - case insensitive check
  const normalizedEmail = email.toLowerCase();
  if (Array.from(users.values()).some(user => user.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({ message: "An account with this email already exists. Please login instead." });
  }

  // Create new user
  const id = Math.random().toString(36).substring(2);
  const user = { id, email: normalizedEmail, password, fullName, gender, location };
  users.set(normalizedEmail, user);

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json({ user: userWithoutPassword });
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