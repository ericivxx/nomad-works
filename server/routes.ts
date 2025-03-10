import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
      const search = req.query.search as string | undefined;
      const categorySlug = req.query.category as string | undefined;
      const locationSlug = req.query.location as string | undefined;
      const type = req.query.type as string | undefined;
      const experienceLevel = req.query.experience as string | undefined;
      const countOnly = req.query.count === 'true';
      
      let jobs = await storage.getAllJobs();
      
      // Apply filters
      if (search) {
        jobs = await storage.getJobsBySearch(search);
      }
      
      if (categorySlug) {
        jobs = await storage.getJobsByCategory(categorySlug);
      }
      
      if (locationSlug) {
        jobs = await storage.getJobsByLocation(locationSlug);
      }
      
      // Apply additional filters
      if (type) {
        const types = type.split(',');
        jobs = jobs.filter(job => types.includes(job.type));
      }
      
      if (experienceLevel) {
        const levels = experienceLevel.split(',');
        jobs = jobs.filter(job => levels.includes(job.experienceLevel || ''));
      }
      
      // If count parameter is true, just return the count
      if (countOnly) {
        return res.json({
          count: jobs.length
        });
      }
      
      // Pagination
      const page = parseInt(req.query.page as string || '1');
      const limit = parseInt(req.query.limit as string || '10');
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedJobs = jobs.slice(startIndex, endIndex);
      
      res.json({
        jobs: paginatedJobs,
        pagination: {
          total: jobs.length,
          page,
          limit,
          totalPages: Math.ceil(jobs.length / limit)
        }
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });
  
  app.get("/api/jobs/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const job = await storage.getJobBySlug(slug);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });
  
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const jobs = await storage.getJobsByCategory(slug);
      
      res.json({
        category,
        jobs,
        count: jobs.length
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  app.get("/api/locations", async (req: Request, res: Response) => {
    try {
      const locations = await storage.getAllLocations();
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });
  
  app.get("/api/locations/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const location = await storage.getLocationBySlug(slug);
      
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      const jobs = await storage.getJobsByLocation(slug);
      
      res.json({
        location,
        jobs,
        count: jobs.length
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });
  
  app.get("/api/skills", async (req: Request, res: Response) => {
    try {
      const skills = await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const jobCount = await storage.getJobCount();
      const categoryCount = await storage.getCategoryCount();
      const locationCount = await storage.getLocationCount();
      
      res.json({
        jobCount,
        categoryCount,
        locationCount
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });
  
  app.post("/api/newsletter", (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // In a real application, you would save this to a database and/or
      // integrate with an email service like Mailchimp
      
      res.json({ message: "Subscription successful" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
