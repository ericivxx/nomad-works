import fetch from 'node-fetch';
import { JobProvider, JobProviderResponse, JobSearchParams } from './types';
import { JobWithRelations, Category, Skill } from '@shared/schema';
import { storage } from '../../storage';
import config from './config';

interface RapidApiJob {
  job_id: string;
  employer_name: string;
  employer_logo?: string | null;
  employer_website?: string | null;
  job_title: string;
  job_description: string;
  job_city?: string | null;
  job_country?: string | null;
  job_employment_type?: string | null;
  job_apply_link: string;
  job_posted_at_timestamp?: number | null;
  job_min_salary?: number | null;
  job_max_salary?: number | null;
  job_is_remote?: boolean | null;
}

interface RapidApiResponse {
  results: RapidApiJob[];
  count: number;
  data?: never; // This helps TypeScript discriminate between RapidApiResponse and JSearchResponse
}

// Job Posting Feed API response format
interface JobPostingFeedResponse {
  hits: any[];
  query: string;
  processingTimeMs: number;
  limit: number;
  offset: number;
  estimatedTotalHits: number;
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
    // Use the Active Jobs DB API
    this.apiUrl = config.rapidapi.apiUrl ?? 'https://active-jobs-db.p.rapidapi.com/active-ats-in';
    this.apiHost = config.rapidapi.options?.host || 'active-jobs-db.p.rapidapi.com';
    this.apiKey = config.rapidapi.apiKey;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }

  async fetchJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      // Using the JSearch API format from RapidAPI
      const queryParams = new URLSearchParams();
      
      // Create search query based on parameters
      let query = 'remote';
      if (params.query) {
        // Clean the query to remove any special characters
        const cleanQuery = params.query.replace(/[^\w\s]/gi, '');
        query = `${cleanQuery} remote`;
      }
      
      // Add basic parameters for search using JSearch API format
      queryParams.append('query', query);
      queryParams.append('page', (params.page || 1).toString());
      queryParams.append('num_pages', '1');
      
      if (params.location) {
        queryParams.append('location', params.location);
      }
      
      if (params.type) {
        const mappedType = this.mapJobTypeToRapidApi(params.type);
        if (mappedType) {
          queryParams.append('employment_types', mappedType);
        }
      }
      
      if (params.category) {
        const mappedCategory = this.mapCategoryToRapidApi(params.category);
        if (mappedCategory) {
          queryParams.append('job_categories', mappedCategory);
        }
      }
      
      // Set the API URL to the JSearch API
      const apiUrl = this.apiUrl;
      
      // Make the request with the updated parameters and headers
      console.log(`Fetching jobs from JSearch API: ${apiUrl}?${queryParams.toString()}`);
      console.log(`Using RapidAPI host: ${this.apiHost}`);
      
      // Don't print the actual API key, but log if it exists
      console.log(`RapidAPI key configured: ${this.apiKey ? 'YES' : 'NO'}`);
      
      const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': this.apiHost,
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
      console.log(`RapidAPI raw response: ${responseText.substring(0, 500)}...`); // Log only part of it to avoid large logs
      const responseData = JSON.parse(responseText) as JSearchResponse | RapidApiResponse | JobPostingFeedResponse;
      
      // Check the response format and adapt accordingly
      let jobs: JobWithRelations[] = [];
      let totalCount = 0;
      
      // Handle Active Jobs DB API format (new API)
      if (Array.isArray(responseData)) {
        console.log(`Retrieved ${responseData.length || 0} jobs from Active Jobs DB API`);
        
        const mappedJobs = responseData.map((item: any) => {
          const job_id = item.id || `active-${Math.random().toString(36).substring(2, 15)}`;
          const employer_name = item.company_name || 'Unknown Company';
          const location = item.location || 'Remote';
            
          return {
            job_id,
            employer_name,
            employer_logo: item.company_logo || null,
            employer_website: item.company_url || null,
            job_title: item.title || 'Remote Position',
            job_description: item.description || item.title || 'No description provided',
            job_city: null,
            job_country: location,
            job_employment_type: item.job_type || 'FULLTIME',
            job_apply_link: item.apply_url || '#',
            job_posted_at_timestamp: item.date_posted ? new Date(item.date_posted).getTime() / 1000 : Date.now() / 1000,
            job_min_salary: null,
            job_max_salary: null,
            job_is_remote: item.is_remote || true
          };
        });
        
        console.log(`Mapped ${mappedJobs.length} jobs from Active Jobs DB API`);
        jobs = await Promise.all(mappedJobs.map(job => this.transformJob(job)));
        totalCount = responseData.length || 0;
      }
      // Handle Job Posting Feed API format (fallback)
      else if (responseData.hits) {
        console.log(`Retrieved ${responseData.hits.length || 0} jobs from Job Posting Feed API`);
        
        const mappedJobs = (responseData.hits || []).map((item: any) => {
          const job_id = `jobfeed-${Math.random().toString(36).substring(2, 15)}`;
          const employer_name = item.company_name || 'Unknown Company';
          const locations = Array.isArray(item.locations_derived) && item.locations_derived.length > 0 
            ? item.locations_derived[0] 
            : 'Remote';
            
          // Extract country from locations if possible
          const country = typeof locations === 'string' && locations.includes(', ') 
            ? locations.split(', ').pop() 
            : locations;
            
          return {
            job_id,
            employer_name,
            employer_logo: null,
            employer_website: null,
            job_title: item.title || 'Remote Position',
            job_description: item.description || item.title || 'No description provided',
            job_city: null,
            job_country: country,
            job_employment_type: 'FULLTIME',
            job_apply_link: item.url || '#',
            job_posted_at_timestamp: item.date_posted ? new Date(item.date_posted).getTime() / 1000 : Date.now() / 1000,
            job_min_salary: null,
            job_max_salary: null,
            job_is_remote: true
          };
        });
        
        jobs = await Promise.all(mappedJobs.map(job => this.transformJob(job)));
        totalCount = responseData.estimatedTotalHits || responseData.hits.length;
      }
      // Handle JSearch API format (fallback)
      else if (responseData.data) {
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
      // Using the JSearch API format for job details
      const jobId = id.replace('rapidapi:', '');
      const queryParams = new URLSearchParams();
      
      // JSearch uses a different endpoint for job details
      // Set the API URL to the JSearch job details API
      const apiUrl = 'https://jsearch.p.rapidapi.com/job-details';
      queryParams.append('job_id', jobId);
      
      const response = await fetch(`${apiUrl}?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
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
      console.log(`RapidAPI job details raw response: ${responseText.substring(0, 500)}...`);
      const responseData = JSON.parse(responseText);
      
      // Format is different for the job details endpoint based on API
      
      // Handle Job Posting Feed API format
      if (responseData.hits && responseData.hits.length > 0) {
        const jobData = responseData.hits[0];
        
        const employer_name = jobData.company_name || 'Unknown Company';
        const locations = Array.isArray(jobData.locations_derived) && jobData.locations_derived.length > 0 
          ? jobData.locations_derived[0] 
          : 'Remote';
          
        // Extract country from locations if possible
        const country = typeof locations === 'string' && locations.includes(', ') 
          ? locations.split(', ').pop() 
          : locations;
          
        // Map to our expected format
        const mappedJob = {
          job_id: id.replace('rapidapi:', ''),
          employer_name,
          employer_logo: null,
          employer_website: null,
          job_title: jobData.title || 'Remote Position',
          job_description: jobData.description || jobData.title || 'No description provided',
          job_city: null,
          job_country: country,
          job_employment_type: 'FULLTIME',
          job_apply_link: jobData.url || '#',
          job_posted_at_timestamp: jobData.date_posted ? new Date(jobData.date_posted).getTime() / 1000 : Date.now() / 1000,
          job_min_salary: null,
          job_max_salary: null,
          job_is_remote: true
        };
        
        return this.transformJob(mappedJob);
      }
      // Handle JSearch API format
      else if (responseData.data && responseData.data.length > 0) {
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