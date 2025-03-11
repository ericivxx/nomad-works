import { Job, Skill, Location, Category, Company } from '../../../shared/schema';

export interface JobSearchParams {
  query?: string;
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
  type?: string;
  experienceLevel?: string;
}

export interface JobProvider {
  name: string;
  fetchJobs: (params: JobSearchParams) => Promise<JobProviderResponse>;
  isAvailable: () => Promise<boolean>;
  getJobDetails?: (id: string) => Promise<JobWithRelations | null>;
}

export interface JobProviderResponse {
  jobs: JobWithRelations[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
  error?: string;
}

export interface JobWithRelations extends Omit<Job, 'id'> {
  id: number | string;
  company: Company;
  category: Category;
  location: Location;
  skills: Skill[];
  source?: string; // The API/provider that supplied this job
  externalId?: string; // Original ID from the source
  applyUrl?: string; // URL to apply for the job
}

export interface JobProviderConfig {
  enabled: boolean;
  apiKey?: string;
  apiUrl?: string;
  apiVersion?: string;
  options?: Record<string, any>;
}