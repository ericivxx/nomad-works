import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { jobProviderManager } from "./api/jobProviders";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
      console.log("Query parameters:", req.query);
      
      // Support both 'q' and 'search' parameters for better compatibility
      const search = (req.query.q || req.query.search) as string | undefined;
      const categorySlug = req.query.category as string | undefined;
      const locationSlug = req.query.location as string | undefined;
      const type = req.query.type as string | undefined;
      const experienceLevel = req.query.experience as string | undefined;
      const salary = req.query.salary as string | undefined;
      const timezone = req.query.timezone as string | undefined;
      const sort = req.query.sort as string | undefined;
      const countOnly = req.query.count === 'true';
      const page = parseInt(req.query.page as string || '1');
      const limit = parseInt(req.query.limit as string || '10');
      
      // Check if we should use external job providers
      if (process.env.USE_JOB_PROVIDERS === 'true') {
        try {
          // Map our API parameters to the job provider parameters
          const providerResult = await jobProviderManager.fetchAllJobs({
            query: search,
            category: categorySlug,
            location: locationSlug,
            type,
            experienceLevel,
            page,
            limit,
            sort
          });
          
          if (countOnly) {
            return res.json({
              count: providerResult.totalCount
            });
          }
          
          return res.json({
            jobs: providerResult.jobs,
            pagination: {
              total: providerResult.totalCount,
              page: providerResult.currentPage,
              limit,
              totalPages: providerResult.pageCount
            }
          });
        } catch (providerError) {
          console.error("Error fetching from job providers:", providerError);
          // Fall back to in-memory storage
        }
      }
      
      // Use in-memory storage if job providers aren't enabled or if there was an error
      let jobs = await storage.getAllJobs();
      
      // Apply filters
      if (search) {
        jobs = await storage.getJobsBySearch(search);
      }
      
      if (categorySlug) {
        const categoryJobs = await storage.getJobsByCategory(categorySlug);
        // Only filter by category if we haven't already searched
        if (!search) {
          jobs = categoryJobs;
        } else {
          // If we did search, find the intersection
          const categoryJobIds = new Set(categoryJobs.map(job => job.id));
          jobs = jobs.filter(job => categoryJobIds.has(job.id));
        }
      }
      
      if (locationSlug) {
        const locationJobs = await storage.getJobsByLocation(locationSlug);
        // Only completely replace jobs if we haven't already filtered
        if (!search && !categorySlug) {
          jobs = locationJobs;
        } else {
          // If we already filtered, find the intersection
          const locationJobIds = new Set(locationJobs.map(job => job.id));
          jobs = jobs.filter(job => locationJobIds.has(job.id));
        }
      }
      
      // Apply additional filters
      if (type) {
        const types = type.split(',');
        jobs = jobs.filter(job => types.includes(job.type));
      }
      
      if (experienceLevel) {
        const levels = experienceLevel.split(',');
        jobs = jobs.filter(job => job.experienceLevel && levels.includes(job.experienceLevel));
      }
      
      // Filter by salary range
      if (salary) {
        const salaryRanges = salary.split(',');
        jobs = jobs.filter(job => {
          // Only include jobs with salary info
          if (!job.salaryMin && !job.salaryMax) return false;
          
          const jobMaxSalary = job.salaryMax || job.salaryMin || 0;
          const jobMinSalary = job.salaryMin || job.salaryMax || 0;
          
          return salaryRanges.some(range => {
            const [min, max] = range.split('-').map(Number);
            // Job salary range overlaps with filter range
            return (jobMinSalary <= max && jobMaxSalary >= min);
          });
        });
      }
      
      // Filter by timezone
      if (timezone) {
        const zones = timezone.split(',');
        jobs = jobs.filter(job => {
          if (!job.timezone) return false;
          
          // Simple mapping for demo - in real app would use more sophisticated timezone matching
          if (zones.includes('americas') && 
              (job.timezone.includes('PST') || job.timezone.includes('EST') || job.timezone.includes('CST'))) {
            return true;
          }
          
          if (zones.includes('europe') && 
              (job.timezone.includes('GMT') || job.timezone.includes('CET') || job.timezone.includes('EET'))) {
            return true;
          }
          
          if (zones.includes('asia') && 
              (job.timezone.includes('IST') || job.timezone.includes('JST') || job.timezone.includes('AEST'))) {
            return true;
          }
          
          return false;
        });
      }
      
      // If count parameter is true, just return the count
      if (countOnly) {
        return res.json({
          count: jobs.length
        });
      }
      
      // Pagination
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
      
      // Check if this is a provider-specific ID (contains a colon)
      if (slug.includes(':') && process.env.USE_JOB_PROVIDERS === 'true') {
        try {
          const job = await jobProviderManager.getJobDetails(slug);
          
          if (!job) {
            return res.status(404).json({ message: "Job not found" });
          }
          
          return res.json(job);
        } catch (providerError) {
          console.error("Error fetching job from provider:", providerError);
          // Fall back to in-memory storage
        }
      }
      
      // Use in-memory storage
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

      // Get jobs using either job providers or in-memory storage
      let jobs;
      
      if (process.env.USE_JOB_PROVIDERS === 'true') {
        try {
          const result = await jobProviderManager.fetchAllJobs({
            category: slug,
            limit: 50 // Get more jobs for category pages
          });
          jobs = result.jobs;
        } catch (providerError) {
          console.error("Error fetching jobs from provider:", providerError);
          // Fall back to in-memory storage
          jobs = await storage.getJobsByCategory(slug);
        }
      } else {
        jobs = await storage.getJobsByCategory(slug);
      }
      
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

      // Get jobs using either job providers or in-memory storage
      let jobs;
      
      if (process.env.USE_JOB_PROVIDERS === 'true') {
        try {
          const result = await jobProviderManager.fetchAllJobs({
            location: slug,
            limit: 50 // Get more jobs for location pages
          });
          jobs = result.jobs;
        } catch (providerError) {
          console.error("Error fetching jobs from provider:", providerError);
          // Fall back to in-memory storage
          jobs = await storage.getJobsByLocation(slug);
        }
      } else {
        jobs = await storage.getJobsByLocation(slug);
      }
      
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
  
  // Add a dedicated search endpoint
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      // Support both q and query parameters for search flexibility
      const searchQuery = req.query.q || req.query.query;
      const { page, limit, sort } = req.query;
      
      if (!searchQuery) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const pageNum = parseInt(page as string || '1');
      const limitNum = parseInt(limit as string || '10');
      
      if (process.env.USE_JOB_PROVIDERS === 'true') {
        try {
          const result = await jobProviderManager.fetchAllJobs({
            query: searchQuery as string,
            page: pageNum,
            limit: limitNum,
            sort: sort as string
          });
          
          return res.json({
            jobs: result.jobs,
            pagination: {
              total: result.totalCount,
              page: result.currentPage,
              limit: limitNum,
              totalPages: result.pageCount
            }
          });
        } catch (providerError) {
          console.error("Error searching jobs from provider:", providerError);
          // Fall back to in-memory storage
        }
      }
      
      // Use in-memory storage
      const jobs = await storage.getJobsBySearch(searchQuery as string);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      const paginatedJobs = jobs.slice(startIndex, endIndex);
      
      res.json({
        jobs: paginatedJobs,
        pagination: {
          total: jobs.length,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(jobs.length / limitNum)
        }
      });
    } catch (error) {
      console.error("Error searching jobs:", error);
      res.status(500).json({ message: "Failed to search jobs" });
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
