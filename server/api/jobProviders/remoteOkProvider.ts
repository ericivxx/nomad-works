import { JobProvider, JobSearchParams, JobProviderResponse, JobWithRelations } from './types';
import fetch from 'node-fetch';

interface RemoteOkJob {
  id: string;
  company: string;
  position: string;
  description: string;
  tags: string[];
  logo: string;
  url: string;
  date: string;
  location: string;
  salary?: string;
}

export class RemoteOkProvider implements JobProvider {
  name = 'remoteok';
  private apiUrl = 'https://remoteok.com/api';
  
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}`);
      return response.status === 200;
    } catch (error) {
      console.error('Error checking RemoteOK API availability:', error);
      return false;
    }
  }

  async fetchJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      // Base URL
      let url = this.apiUrl;
      
      // Add query parameters if provided
      if (params.query) {
        url += `/remote-${encodeURIComponent(params.query.toLowerCase())}-jobs`;
      } else if (params.category) {
        // Convert our category to a format RemoteOK understands
        const category = this.mapCategoryToRemoteOk(params.category);
        url += `/remote-${encodeURIComponent(category)}-jobs`;
      }
      
      console.log(`Making RemoteOK API request: ${url}`);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'NomadWorks Job Board (development@nomadworks.com)',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`RemoteOK API error: Status ${response.status}, Response text:`, await response.text());
        throw new Error(`RemoteOK API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as RemoteOkJob[];
      
      // Skip the first item which is usually metadata
      const jobs = data.slice(1);
      
      // Transform to our format
      const transformedJobs = jobs.map(job => this.transformJob(job));
      
      // Filter by location if specified
      let filteredJobs = transformedJobs;
      if (params.location && params.location !== 'worldwide') {
        const locationFilter = params.location.toLowerCase();
        filteredJobs = transformedJobs.filter(job => 
          job.location.slug === locationFilter || 
          job.location.name.toLowerCase().includes(locationFilter)
        );
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
      
      return {
        jobs: paginatedJobs,
        totalCount: filteredJobs.length,
        pageCount: Math.ceil(filteredJobs.length / limit),
        currentPage: page
      };
    } catch (error) {
      console.error('Error fetching jobs from RemoteOK:', error);
      return {
        jobs: [],
        totalCount: 0,
        pageCount: 0,
        currentPage: params.page || 1,
        error: 'Failed to fetch jobs from RemoteOK'
      };
    }
  }

  async getJobDetails(id: string): Promise<JobWithRelations | null> {
    try {
      const url = `${this.apiUrl}`;
      console.log(`Making RemoteOK job detail request: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'NomadWorks Job Board (development@nomadworks.com)',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error(`RemoteOK API error: Status ${response.status}, Response text:`, await response.text());
        throw new Error(`RemoteOK API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json() as RemoteOkJob[];
      
      // Skip the first item which is usually metadata and find the job by ID
      const jobs = data.slice(1);
      const job = jobs.find(j => j.id === id);
      
      if (!job) {
        return null;
      }
      
      return this.transformJob(job);
    } catch (error) {
      console.error('Error fetching job details from RemoteOK:', error);
      return null;
    }
  }

  private transformJob(job: RemoteOkJob): JobWithRelations {
    // Extract salary information if available
    let salaryMin: number | null = null;
    let salaryMax: number | null = null;
    
    if (job.salary) {
      const salaryRangeMatch = job.salary.match(/\$(\d+)k\s*-\s*\$(\d+)k/i);
      if (salaryRangeMatch) {
        salaryMin = parseInt(salaryRangeMatch[1], 10) * 1000;
        salaryMax = parseInt(salaryRangeMatch[2], 10) * 1000;
      }
    }
    
    // Map tags to skills
    const skills = job.tags.map((tag, index) => ({
      id: index,
      name: tag
    }));
    
    // Determine job type
    let jobType = 'full-time';
    if (job.tags.some(tag => tag.toLowerCase().includes('part-time'))) {
      jobType = 'part-time';
    } else if (job.tags.some(tag => tag.toLowerCase().includes('contract'))) {
      jobType = 'contract';
    } else if (job.tags.some(tag => tag.toLowerCase().includes('freelance'))) {
      jobType = 'freelance';
    }
    
    // Determine experience level
    let experienceLevel = 'mid';
    if (job.tags.some(tag => tag.toLowerCase().includes('senior') || tag.toLowerCase().includes('lead'))) {
      experienceLevel = 'senior';
    } else if (job.tags.some(tag => tag.toLowerCase().includes('junior') || tag.toLowerCase().includes('entry'))) {
      experienceLevel = 'entry';
    }
    
    // Create a unique slug combining company and position
    const slug = `${job.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${job.position.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`.replace(/-+/g, '-').replace(/^-|-$/g, '');
    
    // Extract category from tags
    const categoryName = this.getCategoryFromTags(job.tags);
    
    return {
      id: `remoteok:${job.id}`,
      slug,
      title: job.position,
      description: job.description,
      companyId: 0, // Placeholder
      categoryId: 0, // Placeholder
      locationId: 0, // Placeholder
      type: jobType,
      salaryMin,
      salaryMax,
      featured: false,
      postedAt: new Date(job.date),
      timezone: null,
      experienceLevel,
      source: 'remoteok',
      externalId: job.id,
      applyUrl: job.url,
      
      // Required relations
      company: {
        id: 0,
        name: job.company,
        logo: job.logo,
        website: null
      },
      category: {
        id: 0,
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      },
      location: {
        id: 0,
        name: 'Worldwide',
        slug: 'worldwide',
        region: 'Global'
      },
      skills
    };
  }
  
  private getCategoryFromTags(tags: string[]): string {
    const categoryMapping: Record<string, string[]> = {
      'Development': ['dev', 'developer', 'programming', 'code', 'software', 'engineer', 'engineering', 'fullstack', 'frontend', 'backend', 'devops', 'mobile', 'qa', 'testing'],
      'Design': ['design', 'ui', 'ux', 'graphic', 'product design', 'creative', 'visual', 'art', 'branding'],
      'Marketing': ['marketing', 'seo', 'content', 'social media', 'growth', 'digital', 'ppc', 'campaign', 'email marketing', 'analytics'],
      'Customer Support': ['customer', 'support', 'success', 'service', 'operations', 'client', 'onboarding'],
      'Sales': ['sales', 'business development', 'account', 'enterprise', 'partnership', 'revenue', 'lead'],
      'Management': ['manager', 'director', 'head', 'lead', 'executive', 'ceo', 'cto', 'coo', 'chief'],
      'Finance': ['finance', 'accounting', 'bookkeeping', 'cfo', 'financial', 'tax', 'payroll'],
      'Human Resources': ['hr', 'recruit', 'hiring', 'people', 'talent', 'personnel', 'benefits'],
      'Product': ['product', 'pm', 'product manager', 'product owner'],
      'Writing': ['writer', 'content writer', 'copywriter', 'editor', 'journalist', 'blog', 'author'],
      'Data': ['data', 'analyst', 'scientist', 'ai', 'machine learning', 'analytics', 'business intelligence'],
      'Education': ['teacher', 'instructor', 'tutor', 'professor', 'education', 'teaching', 'coach', 'trainer']
    };
    
    // Lowercase all tags for comparison
    const normalizedTags = tags.map(tag => tag.toLowerCase());
    
    // Check each category against the tags
    for (const [category, keywords] of Object.entries(categoryMapping)) {
      if (keywords.some(keyword => normalizedTags.some(tag => tag.includes(keyword)))) {
        return category;
      }
    }
    
    // Default category if no match is found
    return 'Other';
  }
  
  private mapCategoryToRemoteOk(category: string): string {
    const categoryMap: Record<string, string> = {
      'development': 'dev',
      'design': 'design',
      'marketing': 'marketing',
      'customer-service': 'customer-support',
      'customer-support': 'customer-support',
      'sales': 'sales',
      'management': 'exec',
      'finance': 'finance',
      'human-resources': 'hr',
      'product': 'product',
      'writing': 'copywriting',
      'data': 'data',
      'education': 'teaching'
    };
    
    return categoryMap[category.toLowerCase()] || 'dev';
  }
}

// Create and export a singleton instance
export const remoteOkProvider = new RemoteOkProvider();