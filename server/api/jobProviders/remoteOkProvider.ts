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
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'NomadWorks Job Board (development@nomadworks.com)',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
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
        filteredJobs = transformedJobs.filter(job => 
          job.location.slug === params.location || 
          job.location.name.toLowerCase().includes(params.location.toLowerCase())
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
    } else if (job.tags.some(tag => tag.toLowerCase().includes('junior') || job.tags.some(tag => tag.toLowerCase().includes('entry')))) {
      experienceLevel = 'entry';
    }
    
    // Create a unique slug combining company and position
    const slug = \`\${job.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-\${job.position.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`.replace(/-+/g, '-').replace(/^-|-$/g, '');
    
    // Extract category from tags
    const categoryName = this.getCategoryFromTags(job.tags);
    
    return {
      id: \`remoteok:\${job.id}\`,
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
      'Development': ['dev', 'developer', 'programming', 'code', 'software', 'engineer', 'engineering', 'fullstack', 'frontend', 'backend', 'devops', 'mobile'],
      'Design': ['design', 'ui', 'ux', 'graphic', 'product design'],
      'Marketing': ['marketing', 'seo', 'content', 'social media', 'growth'],
      'Customer Service': ['customer', 'support', 'success', 'service'],
      'Sales': ['sales', 'business development', 'account', 'enterprise'],
      'Management': ['manager', 'director', 'head', 'lead', 'executive', 'ceo', 'cto', 'coo'],
      'Finance': ['finance', 'accounting', 'bookkeeping'],
      'Human Resources': ['hr', 'recruit', 'hiring', 'people', 'talent'],
      'Product': ['product', 'pm']
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
      'sales': 'sales',
      'management': 'exec',
      'finance': 'finance',
      'human-resources': 'hr',
      'product': 'product'
    };
    
    return categoryMap[category.toLowerCase()] || 'dev';
  }
}

// Create and export a singleton instance
export const remoteOkProvider = new RemoteOkProvider();