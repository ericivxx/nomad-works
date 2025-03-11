import { JobProvider, JobSearchParams, JobProviderResponse, JobWithRelations } from './types';
import { remoteOkProvider } from './remoteOkProvider';
import { adzunaProvider } from './adzunaProvider';
import { rapidApiProvider } from './rapidApiProvider';
import config from './config';

class JobProviderManager {
  private providers: JobProvider[] = [];

  constructor() {
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
  }

  registerProvider(provider: JobProvider) {
    this.providers.push(provider);
  }

  async fetchAllJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      // Check which providers are available
      const availableProviders = await Promise.all(
        this.providers.map(async provider => ({
          provider,
          available: await provider.isAvailable()
        }))
      );

      // Fetch jobs from all available providers
      const providerResponses = await Promise.all(
        availableProviders
          .filter(({ available }) => available)
          .map(({ provider }) => provider.fetchJobs(params))
      );

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
    // Extract provider and original ID from the combined ID
    const [providerName, externalId] = id.split(':');
    
    if (!providerName || !externalId) {
      return null;
    }

    // Find the corresponding provider
    const provider = this.providers.find(p => p.name === providerName);
    
    if (!provider || !provider.getJobDetails) {
      return null;
    }

    try {
      return await provider.getJobDetails(externalId);
    } catch (error) {
      console.error(`Error fetching job details from ${providerName}:`, error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const jobProviderManager = new JobProviderManager();