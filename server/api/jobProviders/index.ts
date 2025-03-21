import { JobProvider, JobSearchParams, JobProviderResponse, JobWithRelations } from './types';
import { remoteOkProvider } from './remoteOkProvider';
import { adzunaProvider } from './adzunaProvider';
import { rapidApiProvider } from './rapidApiProvider';
import config from './config';
import { storage } from '../../storage';

class JobProviderManager {
  private providers: JobProvider[] = [];

  constructor() {
    this.initializeProviders();
  }

  /**
   * Initialize providers based on current configuration
   */
  private initializeProviders() {
    // Clear any existing providers
    this.providers = [];
    
    // Initialize with configured providers
    if (config.remoteok.enabled) {
      this.registerProvider(remoteOkProvider);
    }
    if (config.adzuna.enabled) {
      this.registerProvider(adzunaProvider);
    }
    if (config.rapidapi.enabled) {
      this.registerProvider(rapidApiProvider);
    }

    console.log(`Initialized job providers: ${this.providers.map(p => p.name).join(', ') || 'none'}`);
  }

  /**
   * Reinitialize providers based on updated configuration
   * Called when configuration changes in admin panel
   */
  reinitializeProviders() {
    this.initializeProviders();
  }

  registerProvider(provider: JobProvider) {
    this.providers.push(provider);
  }

  async fetchAllJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      console.log(`Fetching jobs with params:`, JSON.stringify(params));
      
      // Check which providers are available
      const availableProviders = await Promise.all(
        this.providers.map(async provider => ({
          provider,
          available: await provider.isAvailable()
        }))
      );
      
      console.log(`Available providers: ${availableProviders.filter(p => p.available).map(p => p.provider.name).join(', ')}`);
      
      // If no external providers are available, fallback to in-memory storage
      if (availableProviders.filter(p => p.available).length === 0) {
        console.log('No external job providers available. Using in-memory storage.');
        const memoryJobs = await storage.getAllJobs();
        
        // Apply search/filtering if needed
        let filteredJobs = [...memoryJobs];
        if (params.query) {
          const searchTerm = params.query.toLowerCase();
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) || 
            job.description.toLowerCase().includes(searchTerm)
          );
        }
        
        if (params.category) {
          filteredJobs = filteredJobs.filter(job => 
            job.category.slug === params.category
          );
        }
        
        if (params.location) {
          filteredJobs = filteredJobs.filter(job => 
            job.location.slug === params.location
          );
        }
        
        // Apply pagination
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        return {
          jobs: filteredJobs.slice(startIndex, endIndex),
          totalCount: filteredJobs.length,
          pageCount: Math.ceil(filteredJobs.length / limit),
          currentPage: page
        };
      }
      
      // Fetch jobs from all available providers with proper error handling for each provider
      const providerResponses: JobProviderResponse[] = [];
      
      for (const { provider, available } of availableProviders) {
        if (available) {
          try {
            const response = await provider.fetchJobs(params);
            providerResponses.push(response);
            console.log(`Provider ${provider.name} returned ${response.jobs.length} jobs`);
          } catch (err) {
            console.error(`Error with provider ${provider.name}:`, err);
            // Don't add to providerResponses if there was an error
          }
        }
      }
      
      // If all providers failed, use in-memory storage as fallback
      if (providerResponses.length === 0) {
        console.log('All external job providers failed. Using in-memory storage fallback.');
        const memoryJobs = await storage.getAllJobs();
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        return {
          jobs: memoryJobs.slice(startIndex, endIndex),
          totalCount: memoryJobs.length,
          pageCount: Math.ceil(memoryJobs.length / limit),
          currentPage: page
        };
      }

      // Merge results
      const response: JobProviderResponse = {
        jobs: [],
        totalCount: 0,
        pageCount: 1,
        currentPage: params.page || 1
      };

      for (const providerResponse of providerResponses) {
        if (!providerResponse.error) {
          response.jobs.push(...providerResponse.jobs);
          response.totalCount += providerResponse.totalCount;
        }
      }

      // Sort by posted date
      response.jobs.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());

      // Apply pagination to combined results
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      response.jobs = response.jobs.slice(startIndex, endIndex);
      response.pageCount = Math.ceil(response.totalCount / limit);

      return response;
    } catch (error) {
      console.error('Error fetching jobs from providers:', error);
      return {
        jobs: [],
        totalCount: 0,
        pageCount: 0,
        currentPage: params.page || 1,
        error: 'Failed to fetch jobs from providers'
      };
    }
  }

  async getJobDetails(id: string): Promise<JobWithRelations | null> {
    // Check if this is a numeric ID (from in-memory storage)
    if (/^\d+$/.test(id)) {
      console.log(`Looking up job with numeric ID ${id} from in-memory storage`);
      const jobId = parseInt(id, 10);
      return await storage.getJobById(jobId) || null;
    }
    
    // Otherwise, this is an external provider job ID in format provider:externalId
    // Extract provider and original ID from the combined ID
    const [providerName, externalId] = id.split(':');
    
    if (!providerName || !externalId) {
      console.log(`Invalid job ID format: ${id}`);
      return null;
    }

    // Find the corresponding provider
    const provider = this.providers.find(p => p.name === providerName);
    
    if (!provider || !provider.getJobDetails) {
      console.log(`Provider ${providerName} not found or doesn't support getJobDetails`);
      return null;
    }

    try {
      // Check if provider is available
      const isAvailable = await provider.isAvailable();
      if (!isAvailable) {
        console.log(`Provider ${providerName} is not available`);
        return null;
      }
      
      const job = await provider.getJobDetails(externalId);
      if (job) {
        return job;
      }
      console.log(`No job found for ${id}`);
      return null;
    } catch (error) {
      console.error(`Error fetching job details from ${providerName}:`, error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const jobProviderManager = new JobProviderManager();