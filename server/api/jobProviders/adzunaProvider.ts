import { JobProvider, JobSearchParams, JobProviderResponse, JobWithRelations } from './types';
import fetch from 'node-fetch';

interface AdzunaJob {
  id: string;
  title: string;
  description: string;
  company: { display_name: string };
  location: { display_name: string, area: string[] };
  salary_min?: number;
  salary_max?: number;
  contract_time?: string;
  contract_type?: string;
  created: string;
  category: { label: string, tag: string };
  redirect_url: string;
  adref?: string;
}

interface AdzunaResponse {
  results: AdzunaJob[];
  count: number;
}

export class AdzunaProvider implements JobProvider {
  name = 'adzuna';
  private apiUrl = 'https://api.adzuna.com/v1/api/jobs';
  private appId = process.env.ADZUNA_APP_ID;
  private apiKey = process.env.ADZUNA_API_KEY;
  private country = 'gb'; // Default to UK, but we can make this configurable

  async isAvailable(): Promise<boolean> {
    if (!this.appId || !this.apiKey) {
      console.error('Adzuna API credentials not configured');
      return false;
    }

    try {
      const response = await fetch(
        \`\${this.apiUrl}/\${this.country}/search/1?app_id=\${this.appId}&app_key=\${this.apiKey}&results_per_page=1\`
      );
      return response.status === 200;
    } catch (error) {
      console.error('Error checking Adzuna API availability:', error);
      return false;
    }
  }

  async fetchJobs(params: JobSearchParams): Promise<JobProviderResponse> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        app_id: this.appId!,
        app_key: this.apiKey!,
        results_per_page: (params.limit || 10).toString(),
        page: (params.page || 1).toString(),
        what_phrase: 'remote', // Always include 'remote' in search
      });

      // Add search query if provided
      if (params.query) {
        queryParams.append('what', params.query);
      }

      // Add category filter
      if (params.category) {
        const category = this.mapCategoryToAdzuna(params.category);
        if (category) {
          queryParams.append('category', category);
        }
      }

      // Add location filter
      if (params.location && params.location !== 'worldwide') {
        queryParams.append('where', params.location);
      }

      // Add contract type filter
      if (params.type) {
        const contractType = this.mapJobTypeToAdzuna(params.type);
        if (contractType) {
          queryParams.append('contract_type', contractType);
        }
      }

      const response = await fetch(
        \`\${this.apiUrl}/\${this.country}/search/1?\${queryParams.toString()}\`
      );

      if (!response.ok) {
        throw new Error(\`Adzuna API error: \${response.status} \${response.statusText}\`);
      }

      const data = await response.json() as AdzunaResponse;
      
      // Transform jobs to our format
      const jobs = data.results.map(job => this.transformJob(job));

      return {
        jobs,
        totalCount: data.count,
        pageCount: Math.ceil(data.count / (params.limit || 10)),
        currentPage: params.page || 1
      };
    } catch (error) {
      console.error('Error fetching jobs from Adzuna:', error);
      return {
        jobs: [],
        totalCount: 0,
        pageCount: 0,
        currentPage: params.page || 1,
        error: 'Failed to fetch jobs from Adzuna'
      };
    }
  }

  private transformJob(job: AdzunaJob): JobWithRelations {
    // Extract category information
    const categoryInfo = this.getCategoryFromAdzuna(job.category.label);

    // Create slug from title
    const slug = job.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Extract experience level from title/description
    const experienceLevel = this.getExperienceLevel(job.title, job.description);

    // Extract skills from description
    const skills = this.extractSkills(job.description);

    return {
      id: \`adzuna:\${job.id}\`,
      slug,
      title: job.title,
      description: job.description,
      companyId: 0, // Placeholder
      categoryId: 0, // Placeholder
      locationId: 0, // Placeholder
      type: this.getJobType(job.contract_time, job.contract_type),
      salaryMin: job.salary_min || null,
      salaryMax: job.salary_max || null,
      featured: false,
      postedAt: new Date(job.created),
      timezone: null,
      experienceLevel,
      source: 'adzuna',
      externalId: job.id,
      applyUrl: job.redirect_url,

      // Required relations
      company: {
        id: 0,
        name: job.company.display_name,
        logo: null,
        website: null
      },
      category: {
        id: 0,
        name: categoryInfo.name,
        slug: categoryInfo.slug
      },
      location: {
        id: 0,
        name: job.location.display_name,
        slug: job.location.display_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        region: job.location.area[0] || null
      },
      skills
    };
  }

  private getJobType(contractTime?: string, contractType?: string): string {
    if (contractTime === 'part_time') return 'part-time';
    if (contractType === 'contract' || contractType === 'temporary') return 'contract';
    if (contractType === 'permanent') return 'full-time';
    return 'full-time'; // default
  }

  private getExperienceLevel(title: string, description: string): string {
    const text = \`\${title} \${description}\`.toLowerCase();
    
    if (text.includes('senior') || text.includes('lead') || text.includes('principal')) {
      return 'senior';
    }
    if (text.includes('junior') || text.includes('entry') || text.includes('graduate')) {
      return 'entry';
    }
    return 'mid';
  }

  private extractSkills(description: string): { id: number; name: string; }[] {
    const commonSkills = [
      'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'aws',
      'docker', 'kubernetes', 'sql', 'nosql', 'mongodb', 'typescript', 'git',
      'css', 'html', 'php', 'ruby', 'c++', 'c#', '.net', 'scala', 'golang',
      'agile', 'scrum', 'jira', 'photoshop', 'illustrator', 'figma', 'sketch'
    ];

    const foundSkills = commonSkills.filter(skill => 
      new RegExp(\`\\\\b\${skill}\\\\b\`, 'i').test(description)
    );

    return foundSkills.map((skill, index) => ({
      id: index,
      name: skill
    }));
  }

  private mapCategoryToAdzuna(category: string): string | null {
    const categoryMap: Record<string, string> = {
      'development': 'it-jobs',
      'design': 'design-jobs',
      'marketing': 'marketing-jobs',
      'customer-service': 'customer-services-jobs',
      'sales': 'sales-jobs',
      'management': 'manager-jobs',
      'finance': 'finance-jobs',
      'human-resources': 'hr-jobs',
      'product': 'consulting-jobs'
    };

    return categoryMap[category.toLowerCase()] || null;
  }

  private mapJobTypeToAdzuna(type: string): string | null {
    const typeMap: Record<string, string> = {
      'full-time': 'permanent',
      'part-time': 'part_time',
      'contract': 'contract',
      'freelance': 'contract'
    };

    return typeMap[type.toLowerCase()] || null;
  }

  private getCategoryFromAdzuna(adzunaCategory: string): { name: string; slug: string; } {
    const categoryMap: Record<string, string> = {
      'IT Jobs': 'Development',
      'Design Jobs': 'Design',
      'Marketing Jobs': 'Marketing',
      'Customer Services Jobs': 'Customer Service',
      'Sales Jobs': 'Sales',
      'Consulting Jobs': 'Product',
      'Finance Jobs': 'Finance',
      'HR Jobs': 'Human Resources'
    };

    const name = categoryMap[adzunaCategory] || 'Other';
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return { name, slug };
  }
}

// Create and export a singleton instance
export const adzunaProvider = new AdzunaProvider();