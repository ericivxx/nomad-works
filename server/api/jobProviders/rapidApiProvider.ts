import fetch from 'node-fetch';
import { JobProvider, JobProviderResponse, JobSearchParams } from './types';
import { JobWithRelations, Category, Skill } from '@shared/schema';
import { storage } from '../../storage';
import config from './config';

interface RapidApiJob {
  job_id: string;
  employer_name: string;
  employer_logo?: string;
  employer_website?: string;
  job_title: string;
  job_description: string;
  job_city?: string;
  job_country?: string;
  job_employment_type?: string;
  job_apply_link: string;
  job_posted_at_timestamp?: number;
  job_min_salary?: number;
  job_max_salary?: number;
  job_is_remote?: boolean;
}

interface RapidApiResponse {
  results: RapidApiJob[];
  count: number;
  data?: never; // This helps TypeScript discriminate between RapidApiResponse and JSearchResponse
}

// JSearch API specific response format 
interface JSearchResponse {
  status: string;
  request_id: string;
  parameters?: Record<string, any>;
  data: Array<{
    results?: never; // This helps TypeScript discriminate between RapidApiResponse and JSearchResponse
    employer_name: string;
    employer_logo?: string;
    employer_website?: string;
    employer_company_type?: string;
    job_publisher?: string;
    job_id: string;
    job_employment_type?: string;
    job_title: string;
    job_apply_link: string;
    job_description: string;
    job_is_remote?: boolean;
    job_posted_at_timestamp?: number;
    job_posted_at_datetime_utc?: string;
    job_city?: string;
    job_state?: string;
    job_country?: string;
    job_latitude?: number;
    job_longitude?: number;
    job_benefits?: string[];
    job_google_link?: string;
    job_offer_expiration_datetime_utc?: string;
    job_required_experience?: any;
    job_required_skills?: string[];
    job_required_education?: any;
    job_experience_in_place_of_education?: boolean;
    job_min_salary?: number;
    job_max_salary?: number;
    job_salary_currency?: string;
    job_salary_period?: string;
    job_highlights?: {
      Qualifications?: string[];
      Responsibilities?: string[];
      Benefits?: string[];
    };
  }>;
}

export class RapidApiProvider implements JobProvider {
  name = 'rapidapi';
  private apiUrl: string = '';
  private apiHost: string = '';
  private apiKey: string | undefined;
  
  constructor() {
    // Use the Job Posting Feed API that you're subscribed to
    this.apiUrl = config.rapidapi.apiUrl ?? 'https://job-posting-feed-api.p.rapidapi.com/active-ats-meili';
    this.apiHost = config.rapidapi.options?.host || 'job-posting-feed-api.p.rapidapi.com';
    this.apiKey = config.rapidapi.apiKey;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }

  async fetchJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      // Try a different API endpoint approach - some RapidAPI endpoints prefer different formats
      // This implementation tries the jsearch API which is known to be more reliable
      const queryParams = new URLSearchParams();
      
      // Create simplified search query that focuses on remote jobs
      let query = 'remote';
      if (params.query) {
        // Clean the query to remove any special characters that might cause issues
        const cleanQuery = params.query.replace(/[^\w\s]/gi, '');
        query = `${cleanQuery} remote`;
      }
      
      // Add basic parameters for the search - using job posting feed API format
      queryParams.append('q', query); // Search query
      queryParams.append('page', (params.page || 1).toString());
      queryParams.append('limit', (params.limit || 10).toString()); 
      queryParams.append('remote', 'true'); // Filter for remote jobs
      
      // Set the API URL to the Job Posting Feed API that you're subscribed to
      const apiUrl = 'https://job-posting-feed-api.p.rapidapi.com/active-ats-meili';
      
      // Make the request with the updated parameters and headers
      console.log(`Fetching jobs from RapidAPI: ${apiUrl}?${queryParams.toString()}`);
      console.log(`Using RapidAPI host: job-posting-feed-api.p.rapidapi.com`);
      
      // Don't print the actual API key, but log if it exists
      console.log(`RapidAPI key configured: ${this.apiKey ? 'YES' : 'NO'}`);
      
      const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': 'job-posting-feed-api.p.rapidapi.com',
          'Content-Type': 'application/json',
          'User-Agent': 'NomadWorks/1.0 (development@nomadworks.com)'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`RapidAPI error response: ${errorText}`);
        throw new Error(`RapidAPI request failed with status ${response.status}`);
      }

      // Parse the JSON data - format differs between APIs
      const responseText = await response.text();
      console.log(`RapidAPI raw response: ${responseText}`);
      const responseData = JSON.parse(responseText) as JSearchResponse | RapidApiResponse;
      
      // Check the response format and adapt accordingly
      // JSearch API uses a different format than what we initially expected
      let jobs: JobWithRelations[] = [];
      let totalCount = 0;
      
      // Handle JSearch API format
      if (responseData.data) {
        console.log(`Retrieved ${responseData.data.length || 0} jobs from JSearch API`);
        
        // Map the job data to our expected format
        const mappedJobs = responseData.data.map((item: any) => ({
          job_id: item.job_id || `jsearch-${Math.random().toString(36).substring(2, 15)}`,
          employer_name: item.employer_name || 'Unknown Company',
          employer_logo: item.employer_logo || null,
          employer_website: item.employer_website || null,
          job_title: item.job_title || 'Remote Position',
          job_description: item.job_description || 'No description provided',
          job_city: item.job_city || null,
          job_country: item.job_country || 'Remote',
          job_employment_type: item.job_employment_type || 'FULLTIME',
          job_apply_link: item.job_apply_link || '#',
          job_posted_at_timestamp: item.job_posted_at_timestamp || Date.now() / 1000,
          job_min_salary: item.job_min_salary || null,
          job_max_salary: item.job_max_salary || null,
          job_is_remote: item.job_is_remote !== undefined ? item.job_is_remote : true
        }));
        
        jobs = await Promise.all(mappedJobs.map(job => this.transformJob(job)));
        totalCount = responseData.data.length;
      } 
      // Original API format fallback
      else if (responseData.results) {
        console.log(`Retrieved ${responseData.results.length || 0} jobs from RapidAPI`);
        jobs = await Promise.all((responseData.results || []).map(job => this.transformJob(job)));
        totalCount = responseData.count || responseData.results.length;
      }
      
      return {
        jobs,
        totalCount,
        pageCount: Math.ceil(totalCount / (params.limit || 10)),
        currentPage: params.page || 1,
      };
    } catch (error) {
      console.error('Error fetching jobs from RapidAPI:', error);
      return {
        jobs: [],
        totalCount: 0,
        pageCount: 0,
        currentPage: params.page || 1,
        error: 'Failed to fetch jobs from RapidAPI'
      };
    }
  }

  async getJobDetails(id: string): Promise<JobWithRelations | null> {
    try {
      // For Job Posting Feed API
      const jobId = id.replace('rapidapi:', '');
      const queryParams = new URLSearchParams();
      queryParams.append('ids', jobId);
      
      const apiUrl = 'https://job-posting-feed-api.p.rapidapi.com/active-ats-meili-by-id';
      
      const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': 'job-posting-feed-api.p.rapidapi.com',
          'Content-Type': 'application/json',
          'User-Agent': 'NomadWorks/1.0 (development@nomadworks.com)'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`RapidAPI job details error response: ${errorText}`);
        throw new Error(`RapidAPI request failed with status ${response.status}`);
      }

      const responseText = await response.text();
      console.log(`RapidAPI job details raw response: ${responseText}`);
      const responseData = JSON.parse(responseText) as JSearchResponse;
      
      // Format is different for the job details endpoint
      if (responseData.data && responseData.data.length > 0) {
        const jobData = responseData.data[0] as any;
        
        // Map to our expected format
        const mappedJob = {
          job_id: jobData.job_id || id,
          employer_name: jobData.employer_name || 'Unknown Company',
          employer_logo: jobData.employer_logo || null,
          employer_website: jobData.employer_website || null,
          job_title: jobData.job_title || 'Remote Position',
          job_description: jobData.job_description || 'No description provided',
          job_city: jobData.job_city || null,
          job_country: jobData.job_country || 'Remote',
          job_employment_type: jobData.job_employment_type || 'FULLTIME',
          job_apply_link: jobData.job_apply_link || '#',
          job_posted_at_timestamp: jobData.job_posted_at_timestamp || Date.now() / 1000,
          job_min_salary: jobData.job_min_salary || null,
          job_max_salary: jobData.job_max_salary || null,
          job_is_remote: jobData.job_is_remote !== undefined ? jobData.job_is_remote : true
        };
        
        return this.transformJob(mappedJob);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching job details from RapidAPI:', error);
      return null;
    }
  }

  private async transformJob(job: RapidApiJob): Promise<JobWithRelations> {
    // Create or get company
    const company = await storage.createCompany({
      name: job.employer_name,
      logo: job.employer_logo || null,
      website: job.employer_website || null
    });

    // Determine category based on job title/description
    const category = await this.determineCategory(job.job_title, job.job_description);

    // Create or get location
    const location = await storage.createLocation({
      name: job.job_country || 'Worldwide',
      slug: this.slugify(job.job_country || 'worldwide'),
      region: this.determineRegion(job.job_country)
    });

    // Extract salary information
    const salaryMin = job.job_min_salary || null;
    const salaryMax = job.job_max_salary || null;

    // Create a new job record
    const newJob = await storage.createJob({
      title: job.job_title,
      description: job.job_description,
      companyId: company.id,
      categoryId: category.id,
      locationId: location.id,
      type: this.getJobType(job.job_employment_type),
      slug: this.slugify(job.job_title),
      salaryMin,
      salaryMax,
      featured: false,
      postedAt: job.job_posted_at_timestamp ? new Date(job.job_posted_at_timestamp * 1000) : new Date(),
      timezone: null,
      experienceLevel: this.extractExperienceLevel(job.job_title, job.job_description)
    }, (await this.extractSkills(job.job_description)).map(skill => skill.id));

    // Combine with relationships and source-specific fields
    return {
      ...newJob,
      company,
      category,
      location,
      skills: await this.extractSkills(job.job_description),
      source: 'rapidapi',
      externalId: job.job_id,
      applyUrl: job.job_apply_link
    };
  }

  private async determineCategory(title: string, description: string): Promise<Category> {
    // Simple keyword matching for now, could be enhanced with AI/ML
    const titleAndDesc = (title + ' ' + description).toLowerCase();
    
    // Check against common job categories
    if (titleAndDesc.match(/\b(developer|engineer|programming|software|web|fullstack|backend|frontend)\b/)) {
      return storage.createCategory({ name: 'Development', slug: 'development' });
    }
    if (titleAndDesc.match(/\b(design|ui|ux|graphic|creative)\b/)) {
      return storage.createCategory({ name: 'Design', slug: 'design' });
    }
    if (titleAndDesc.match(/\b(marketing|seo|content|social media|growth)\b/)) {
      return storage.createCategory({ name: 'Marketing', slug: 'marketing' });
    }
    if (titleAndDesc.match(/\b(support|customer|service|help desk)\b/)) {
      return storage.createCategory({ name: 'Customer Support', slug: 'customer-support' });
    }
    if (titleAndDesc.match(/\b(sales|business|account|revenue)\b/)) {
      return storage.createCategory({ name: 'Sales', slug: 'sales' });
    }
    if (titleAndDesc.match(/\b(writing|content|copywriting|editor)\b/)) {
      return storage.createCategory({ name: 'Writing', slug: 'writing' });
    }
    
    // Default category for unmatched jobs
    return storage.createCategory({ name: 'Other', slug: 'other' });
  }

  private determineRegion(country?: string): string | null {
    if (!country) return null;
    
    // Simple region mapping, could be enhanced
    const regions: Record<string, string[]> = {
      'North America': ['USA', 'United States', 'Canada'],
      'Europe': ['UK', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands'],
      'Asia': ['China', 'Japan', 'India', 'Singapore', 'Hong Kong'],
      'Oceania': ['Australia', 'New Zealand'],
      'South America': ['Brazil', 'Argentina', 'Chile', 'Colombia'],
      'Africa': ['South Africa', 'Nigeria', 'Kenya', 'Egypt']
    };

    for (const [region, countries] of Object.entries(regions)) {
      if (countries.some(c => country.includes(c))) {
        return region;
      }
    }

    return null;
  }

  private getJobType(type?: string): string {
    if (!type) return 'full-time';

    type = type.toLowerCase();
    if (type.includes('full')) return 'full-time';
    if (type.includes('part')) return 'part-time';
    if (type.includes('contract')) return 'contract';
    if (type.includes('freelance')) return 'freelance';
    if (type.includes('intern')) return 'internship';

    return 'full-time';
  }

  private extractExperienceLevel(title: string, description: string): string {
    const text = (title + ' ' + description).toLowerCase();
    
    if (text.match(/\b(senior|sr\.?|lead|principal|architect)\b/)) return 'senior';
    if (text.match(/\b(mid|intermediate|junior)\b/)) return 'mid';
    if (text.match(/\b(junior|jr\.?|entry|graduate|intern)\b/)) return 'entry';
    
    return 'mid'; // Default to mid-level
  }

  private async extractSkills(description: string): Promise<Skill[]> {
    const skills: string[] = [];
    
    // Common programming languages and frameworks
    const techSkills = [
      'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'PHP',
      'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Rails',
      'AWS', 'Docker', 'Kubernetes', 'Git'
    ];

    // Check for skills in description
    for (const skill of techSkills) {
      if (description.toLowerCase().includes(skill.toLowerCase())) {
        skills.push(skill);
      }
    }

    // Create skill records and return
    return Promise.all(
      skills.map(name => storage.createSkill({ name }))
    );
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  private mapCategoryToRapidApi(category: string): string | null {
    const mapping: Record<string, string> = {
      'development': 'engineering',
      'design': 'design',
      'marketing': 'marketing',
      'customer-support': 'customer-service',
      'sales': 'sales',
      'finance': 'finance',
      'human-resources': 'hr',
      'product': 'product',
      'management': 'management',
      'writing': 'writing',
      'data': 'data'
    };

    return mapping[category] || null;
  }
  
  private mapJobTypeToRapidApi(type: string): string | null {
    const mapping: Record<string, string> = {
      'full-time': 'fulltime',
      'part-time': 'parttime',
      'contract': 'contract',
      'freelance': 'freelance',
      'internship': 'internship'
    };

    return mapping[type] || null;
  }
}

export const rapidApiProvider = new RapidApiProvider();