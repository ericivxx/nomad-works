
import type { Request, Response } from "express";
import { storage } from "../storage";

export async function handleGetUser(req: Request, res: Response) {
  const userId = req.headers['x-replit-user-id'];
  const username = req.headers['x-replit-user-name'];
  
  if (!userId || !username) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  let user = await storage.getUserById(userId as string);
  
  if (!user) {
    // Create new user if they don't exist
    user = await storage.createUser({
      id: userId as string,
      username: username as string,
      email: '',
      savedSearches: []
    });
  }

  res.json({ user });
}

export async function handleSaveSearch(req: Request, res: Response) {
  const userId = req.headers['x-replit-user-id'];
  
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { search } = req.body;
  const user = await storage.saveUserSearch(userId as string, search);
  
  res.json({ savedSearches: user.savedSearches });
}
