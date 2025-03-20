import { Router, Request, Response } from "express";
//import { storage } from "../storage"; //This line is not used and removed for simplicity

const router = Router();

interface User {
  id: string;
  email: string;
  fullName?: string;
  gender?: string;
  location?: string;
}

const users = new Map<string, User & { password: string }>();

// Mock session object - In a real application, use a proper session middleware
interface Session {
    user?: User;
}

function getSession(req: Request): Session | undefined {
    // In a real app, this would fetch the session from the middleware
    return req['session'] as Session | undefined;
}

function setSession(req: Request, session: Session) {
    // In a real app, this would set the session via the middleware
    req['session'] = session;
}


router.post("/register", (req: Request, res: Response) => {
  try {
    const { email, password, fullName, gender, location } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = users.get(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists. Please login instead." });
    }

    const id = Math.random().toString(36).substring(2);
    const user = { id, email: normalizedEmail, password, fullName, gender, location };
    users.set(normalizedEmail, user);

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.get(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const session: Session = { user };
  setSession(req, session); // Set the session

  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

router.get('/session', (req: Request, res: Response) => {
  const session = getSession(req);
  if (session?.user) {
    res.json({ user: session.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;