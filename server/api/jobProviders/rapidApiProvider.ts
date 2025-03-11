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
}

export class RapidApiProvider implements JobProvider {
  name = 'rapidapi';
  private apiUrl: string = '';
  private apiHost: string = '';
  private apiKey: string | undefined;
  
  constructor() {
    this.apiUrl = config.rapidapi.apiUrl ?? 'https://job-posting-feed-api.p.rapidapi.com/active-ats-meili';
    this.apiHost = config.rapidapi.options?.host || 'job-posting-feed-api.p.rapidapi.com';
    this.apiKey = config.rapidapi.apiKey;
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }

  async fetchJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      
      // Set basic parameters
      queryParams.append('title_search', 'false');
      queryParams.append('description_type', 'html');
      
      // Add specific search parameters
      if (params.query) queryParams.append('q', params.query);
      if (params.page) queryParams.append('page', params.page.toString());
      
      // Only remote jobs
      queryParams.append('remote', 'true');
      
      // Add category filter if specified
      if (params.category) {
        const category = this.mapCategoryToRapidApi(params.category);
        if (category) queryParams.append('category', category);
      }
      
      // Add location filter if specified
      if (params.location && params.location !== 'worldwide') {
        queryParams.append('location', params.location);
      }

      // Add employment type if specified
      if (params.type) {
        const type = this.mapJobTypeToRapidApi(params.type);
        if (type) queryParams.append('type', type);
      }

      // Make the API request
      console.log(`Fetching jobs from RapidAPI: ${this.apiUrl}?${queryParams.toString()}`);
      const response = await fetch(`${this.apiUrl}?${queryParams.toString()}`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey!,
          'X-RapidAPI-Host': this.apiHost
        }
      });

      if (!response.ok) {
        throw new Error(`RapidAPI request failed with status ${response.status}`);
      }

      const data = await response.json() as RapidApiResponse;
      console.log(`Retrieved ${data.results?.length || 0} jobs from RapidAPI`);

      // Transform jobs to our format
      const jobs = await Promise.all((data.results || []).map(job => this.transformJob(job)));

      return {
        jobs,
        totalCount: data.count || 0,
        pageCount: Math.ceil((data.count || 0) / 10), // Assuming 10 jobs per page
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
      const response = await fetch(`${this.apiUrl}?id=${id}`, {
        headers: {
          'X-RapidAPI-Key': this.apiKey!,
          'X-RapidAPI-Host': this.apiHost
        }
      });

      if (!response.ok) {
        throw new Error(`RapidAPI request failed with status ${response.status}`);
      }

      const data = await response.json() as RapidApiResponse;
      if (!data.results || data.results.length === 0) return null;

      return this.transformJob(data.results[0]);
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