import { 
  Job, JobWithRelations, Company, Category, Location, Skill, 
  InsertJob, InsertCompany, InsertCategory, InsertLocation, InsertSkill, 
  User, InsertUser, RegisterData,
  BlogPost, InsertBlogPost, BlogPostWithRelations,
  AffiliateLink, InsertAffiliateLink, BlogPostAffiliateLink, InsertBlogPostAffiliateLink,
  jobs, companies, categories, locations, skills, jobSkills, users,
  blogPosts, affiliateLinks, blogPostAffiliateLinks
} from "@shared/schema";
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export interface IStorage {
  // Jobs
  getAllJobs(): Promise<JobWithRelations[]>;
  getJobById(id: number): Promise<JobWithRelations | undefined>;
  getJobBySlug(slug: string): Promise<JobWithRelations | undefined>;
  getJobsByCategory(categorySlug: string): Promise<JobWithRelations[]>;
  getJobsByLocation(locationSlug: string): Promise<JobWithRelations[]>;
  getJobsBySearch(query: string): Promise<JobWithRelations[]>;
  createJob(job: InsertJob, skillIds: number[]): Promise<Job>;
  
  // Companies
  getAllCompanies(): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Locations
  getAllLocations(): Promise<Location[]>;
  getLocationBySlug(slug: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  
  // Skills
  getAllSkills(): Promise<Skill[]>;
  getSkillById(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Stats
  getJobCount(): Promise<number>;
  getCategoryCount(): Promise<number>;
  getLocationCount(): Promise<number>;
  
  // Authentication
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  checkEmailExists(email: string): Promise<boolean>;
  createUser(userData: RegisterData): Promise<User>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;
  updateUserLastLogin(userId: number): Promise<void>;
  saveUserJob(userId: number, jobSlug: string): Promise<User | null>;
  unsaveUserJob(userId: number, jobSlug: string): Promise<User | null>;
  
  // Password Management
  changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean>;
  createPasswordResetToken(email: string): Promise<string | null>;
  validatePasswordResetToken(token: string): Promise<number | null>;
  resetPassword(userId: number, newPassword: string): Promise<boolean>;
  
  // Blog Posts
  getAllBlogPosts(): Promise<BlogPostWithRelations[]>;
  getFeaturedBlogPosts(limit?: number): Promise<BlogPostWithRelations[]>;
  getBlogPostsByCategory(categorySlug: string): Promise<BlogPostWithRelations[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPostWithRelations | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  getBlogPostCount(): Promise<number>;
  
  // Affiliate Links
  getAllAffiliateLinks(): Promise<AffiliateLink[]>;
  getAffiliateLinkById(id: number): Promise<AffiliateLink | undefined>;
  createAffiliateLink(affiliateLink: InsertAffiliateLink): Promise<AffiliateLink>;
  updateAffiliateLink(id: number, affiliateLink: Partial<InsertAffiliateLink>): Promise<AffiliateLink | undefined>;
  deleteAffiliateLink(id: number): Promise<boolean>;
  getAffiliateLinksByBlogPost(blogPostId: number): Promise<AffiliateLink[]>;
  addAffiliateLinkToBlogPost(blogPostId: number, affiliateLinkId: number): Promise<boolean>;
  removeAffiliateLinkFromBlogPost(blogPostId: number, affiliateLinkId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private jobsData: Map<number, Job>;
  private companiesData: Map<number, Company>;
  private categoriesData: Map<number, Category>;
  private locationsData: Map<number, Location>;
  private skillsData: Map<number, Skill>;
  private jobSkillsData: Map<string, number[]>;
  private usersData: Map<number, User>;
  private blogPostsData: Map<number, BlogPost>;
  private affiliateLinksData: Map<number, AffiliateLink>;
  private blogPostAffiliateLinksData: Map<string, number[]>;
  
  private currentJobId = 1;
  private currentCompanyId = 1;
  private currentCategoryId = 1;
  private currentLocationId = 1;
  private currentSkillId = 1;
  private currentUserId = 1;
  private currentBlogPostId = 1;
  private currentAffiliateLinkId = 1;
  private currentBlogPostAffiliateLinkId = 1;
  
  // File to persist user data
  private readonly USER_DATA_FILE = 'user_data.json';
  private readonly COUNTER_DATA_FILE = 'counter_data.json';
  
  constructor() {
    this.jobsData = new Map();
    this.companiesData = new Map();
    this.categoriesData = new Map();
    this.locationsData = new Map();
    this.skillsData = new Map();
    this.jobSkillsData = new Map();
    this.usersData = new Map();
    this.blogPostsData = new Map();
    this.affiliateLinksData = new Map();
    this.blogPostAffiliateLinksData = new Map();
    
    this.currentJobId = 1;
    this.currentCompanyId = 1;
    this.currentCategoryId = 1;
    this.currentLocationId = 1;
    this.currentSkillId = 1;
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    this.currentAffiliateLinkId = 1;
    this.currentBlogPostAffiliateLinkId = 1;
    
    // Load persisted data if available
    this.loadPersistedData();
    
    // Initialize with seed data
    this.seedData();
    
    // Initialize blog posts and affiliate links with provided affiliate data
    this.seedBlogData();
  }
  
  // Load data from files if they exist
  private loadPersistedData() {
    try {
      // Load user data
      if (fs.existsSync(this.USER_DATA_FILE)) {
        const userData = JSON.parse(fs.readFileSync(this.USER_DATA_FILE, 'utf8'));
        
        // Convert dates from strings back to Date objects
        userData.forEach((user: any) => {
          user.createdAt = new Date(user.createdAt);
          user.lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
          this.usersData.set(user.id, user);
          
          // Log more details about each user
          console.log(`Loaded user: ${user.id} (${user.email}) with saved jobs: ${user.savedJobs ? user.savedJobs.length : 0}`);
        });
        
        console.log(`Loaded ${userData.length} users from persistent storage`);
      } else {
        console.log('No user data file found, starting with empty users');
      }
      
      // Load counter data
      if (fs.existsSync(this.COUNTER_DATA_FILE)) {
        const counterData = JSON.parse(fs.readFileSync(this.COUNTER_DATA_FILE, 'utf8'));
        
        if (counterData.currentUserId) {
          this.currentUserId = counterData.currentUserId;
          console.log(`Loaded counter data: currentUserId = ${this.currentUserId}`);
        }
      } else {
        console.log('No counter data file found, using default counter values');
      }
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }
  }
  
  // Save user data to file
  private saveUserData() {
    try {
      const userData = Array.from(this.usersData.values());
      fs.writeFileSync(this.USER_DATA_FILE, JSON.stringify(userData, null, 2));
      console.log(`Saved ${userData.length} users to file. User IDs: ${userData.map(u => u.id).join(', ')}`);
      
      // Log saved jobs info if available
      userData.forEach(user => {
        if (user.savedJobs && user.savedJobs.length > 0) {
          console.log(`User ${user.id} (${user.email}) has ${user.savedJobs.length} saved jobs: ${user.savedJobs.join(', ')}`);
        }
      });
      
      // Save counter data
      const counterData = {
        currentUserId: this.currentUserId
      };
      fs.writeFileSync(this.COUNTER_DATA_FILE, JSON.stringify(counterData, null, 2));
      console.log(`Saved counter data: currentUserId = ${this.currentUserId}`);
      
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }
  
  async getAllJobs(): Promise<JobWithRelations[]> {
    const allJobs: JobWithRelations[] = [];
    
    for (const job of this.jobsData.values()) {
      const jobWithRelations = this.buildJobWithRelations(job);
      if (jobWithRelations) {
        allJobs.push(jobWithRelations);
      }
    }
    
    return allJobs.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }
  
  async getJobById(id: number): Promise<JobWithRelations | undefined> {
    const job = this.jobsData.get(id);
    if (!job) return undefined;
    
    return this.buildJobWithRelations(job);
  }
  
  async getJobBySlug(slug: string): Promise<JobWithRelations | undefined> {
    for (const job of this.jobsData.values()) {
      if (job.slug === slug) {
        return this.buildJobWithRelations(job);
      }
    }
    return undefined;
  }
  
  async getJobsByCategory(categorySlug: string): Promise<JobWithRelations[]> {
    let categoryId: number | undefined;
    
    for (const category of this.categoriesData.values()) {
      if (category.slug === categorySlug) {
        categoryId = category.id;
        break;
      }
    }
    
    if (!categoryId) return [];
    
    const categoryJobs: JobWithRelations[] = [];
    
    for (const job of this.jobsData.values()) {
      if (job.categoryId === categoryId) {
        const jobWithRelations = this.buildJobWithRelations(job);
        if (jobWithRelations) {
          categoryJobs.push(jobWithRelations);
        }
      }
    }
    
    return categoryJobs.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }
  
  async getJobsByLocation(locationSlug: string): Promise<JobWithRelations[]> {
    let locationId: number | undefined;
    
    for (const location of this.locationsData.values()) {
      if (location.slug === locationSlug) {
        locationId = location.id;
        break;
      }
    }
    
    if (!locationId) return [];
    
    const locationJobs: JobWithRelations[] = [];
    
    for (const job of this.jobsData.values()) {
      if (job.locationId === locationId) {
        const jobWithRelations = this.buildJobWithRelations(job);
        if (jobWithRelations) {
          locationJobs.push(jobWithRelations);
        }
      }
    }
    
    return locationJobs.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }
  
  async getJobsBySearch(query: string): Promise<JobWithRelations[]> {
    if (!query) return this.getAllJobs();
    
    const lowerQuery = query.toLowerCase();
    const searchResults: JobWithRelations[] = [];
    
    for (const job of this.jobsData.values()) {
      if (
        job.title.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery)
      ) {
        const jobWithRelations = this.buildJobWithRelations(job);
        if (jobWithRelations) {
          searchResults.push(jobWithRelations);
        }
      }
    }
    
    return searchResults.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });
  }
  
  async createJob(job: InsertJob, skillIds: number[]): Promise<Job> {
    const id = this.currentJobId++;
    const newJob: Job = { id, ...job };
    
    this.jobsData.set(id, newJob);
    
    // Associate skills with the job
    this.jobSkillsData.set(`job-${id}`, skillIds);
    
    return newJob;
  }
  
  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companiesData.values());
  }
  
  async getCompanyById(id: number): Promise<Company | undefined> {
    return this.companiesData.get(id);
  }
  
  async createCompany(company: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const newCompany: Company = { id, ...company };
    
    this.companiesData.set(id, newCompany);
    
    return newCompany;
  }
  
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categoriesData.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    for (const category of this.categoriesData.values()) {
      if (category.slug === slug) {
        return category;
      }
    }
    return undefined;
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const newCategory: Category = { id, ...category };
    
    this.categoriesData.set(id, newCategory);
    
    return newCategory;
  }
  
  async getAllLocations(): Promise<Location[]> {
    return Array.from(this.locationsData.values());
  }
  
  async getLocationBySlug(slug: string): Promise<Location | undefined> {
    for (const location of this.locationsData.values()) {
      if (location.slug === slug) {
        return location;
      }
    }
    return undefined;
  }
  
  async createLocation(location: InsertLocation): Promise<Location> {
    const id = this.currentLocationId++;
    const newLocation: Location = { id, ...location };
    
    this.locationsData.set(id, newLocation);
    
    return newLocation;
  }
  
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skillsData.values());
  }
  
  async getSkillById(id: number): Promise<Skill | undefined> {
    return this.skillsData.get(id);
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const newSkill: Skill = { id, ...skill };
    
    this.skillsData.set(id, newSkill);
    
    return newSkill;
  }
  
  async getJobCount(): Promise<number> {
    return this.jobsData.size;
  }
  
  async getCategoryCount(): Promise<number> {
    return this.categoriesData.size;
  }
  
  async getLocationCount(): Promise<number> {
    return this.locationsData.size;
  }
  
  // Authentication methods
  async getUserById(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    for (const user of this.usersData.values()) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return undefined;
  }
  
  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return !!user;
  }
  
  async createUser(userData: RegisterData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const id = this.currentUserId++;
    const newUser: User = {
      id,
      email: userData.email,
      password: hashedPassword,
      username: userData.username || userData.email.split('@')[0],
      fullName: userData.fullName || null,
      gender: userData.gender || null,
      location: userData.location || null,
      savedJobs: [],
      savedSearches: [],
      bio: null,
      role: 'user', // Default role is 'user'
      isVerified: false,
      lastLogin: new Date(),
      createdAt: new Date()
    };
    
    this.usersData.set(id, newUser);
    this.saveUserData(); // Save to file after user creation
    return newUser;
  }
  
  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        console.log('User not found:', email);
        return null;
      }
      
      // Verify password using bcrypt
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        console.log('Invalid password for:', email);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }
  
  async updateUserLastLogin(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (user) {
      user.lastLogin = new Date();
      this.usersData.set(userId, user);
      this.saveUserData(); // Save to file after updating last login
    }
  }
  
  async saveUserJob(userId: number, jobSlug: string): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;
    
    // Initialize savedJobs array if it doesn't exist
    if (!user.savedJobs) {
      user.savedJobs = [];
    }
    
    // Only add the job if it's not already saved
    if (!user.savedJobs.includes(jobSlug)) {
      user.savedJobs.push(jobSlug);
      this.usersData.set(userId, user);
      this.saveUserData(); // Save to file after adding saved job
    }
    
    return user;
  }
  
  async unsaveUserJob(userId: number, jobSlug: string): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user || !user.savedJobs) return null;
    
    // Filter out the job slug
    user.savedJobs = user.savedJobs.filter(slug => slug !== jobSlug);
    this.usersData.set(userId, user);
    this.saveUserData(); // Save to file after removing saved job
    
    return user;
  }
  
  // Password Management
  
  // Token storage for password reset (Would use a database table in a real app)
  private passwordResetTokens: Map<string, { userId: number, expiresAt: Date }> = new Map();
  
  // Change user password
  async changePassword(userId: number, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        console.log('User not found when changing password:', userId);
        return false;
      }

      // Verify current password
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) {
        console.log('Invalid current password for user:', userId);
        return false;
      }

      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      this.usersData.set(userId, user);
      this.saveUserData(); // Save to file after password change
      
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  }

  // Create a password reset token
  async createPasswordResetToken(email: string): Promise<string | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        console.log('User not found when creating reset token:', email);
        return null;
      }

      // Generate a random token
      const token = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
      
      // Token expires in 1 hour
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      // Store the token
      this.passwordResetTokens.set(token, {
        userId: user.id,
        expiresAt
      });

      return token;
    } catch (error) {
      console.error('Error creating password reset token:', error);
      return null;
    }
  }

  // Validate a password reset token
  async validatePasswordResetToken(token: string): Promise<number | null> {
    const tokenData = this.passwordResetTokens.get(token);
    
    if (!tokenData) {
      console.log('Reset token not found:', token);
      return null;
    }

    // Check if token has expired
    if (new Date() > tokenData.expiresAt) {
      console.log('Reset token expired:', token);
      this.passwordResetTokens.delete(token);
      return null;
    }

    return tokenData.userId;
  }

  // Reset password using a reset token
  async resetPassword(userId: number, newPassword: string): Promise<boolean> {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        console.log('User not found when resetting password:', userId);
        return false;
      }

      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      this.usersData.set(userId, user);
      this.saveUserData(); // Save to file after password reset

      // Remove any tokens associated with this user
      for (const [token, data] of this.passwordResetTokens.entries()) {
        if (data.userId === userId) {
          this.passwordResetTokens.delete(token);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  }
  
  private buildJobWithRelations(job: Job): JobWithRelations | undefined {
    const company = this.companiesData.get(job.companyId);
    const category = this.categoriesData.get(job.categoryId);
    const location = this.locationsData.get(job.locationId);
    
    if (!company || !category || !location) {
      return undefined;
    }
    
    const skillIds = this.jobSkillsData.get(`job-${job.id}`) || [];
    const jobSkills: Skill[] = [];
    
    for (const skillId of skillIds) {
      const skill = this.skillsData.get(skillId);
      if (skill) {
        jobSkills.push(skill);
      }
    }
    
    return {
      ...job,
      company,
      category,
      location,
      skills: jobSkills,
    };
  }
  
  // Blog Posts Methods
  async getAllBlogPosts(): Promise<BlogPostWithRelations[]> {
    const allBlogPosts: BlogPostWithRelations[] = [];
    
    for (const blogPost of this.blogPostsData.values()) {
      const blogPostWithRelations = await this.buildBlogPostWithRelations(blogPost);
      if (blogPostWithRelations) {
        allBlogPosts.push(blogPostWithRelations);
      }
    }
    
    return allBlogPosts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }
  
  async getFeaturedBlogPosts(limit = 3): Promise<BlogPostWithRelations[]> {
    const featuredPosts = (await this.getAllBlogPosts())
      .filter(post => post.featured)
      .slice(0, limit);
      
    return featuredPosts;
  }
  
  async getBlogPostsByCategory(categorySlug: string): Promise<BlogPostWithRelations[]> {
    let categoryId: number | undefined;
    
    for (const category of this.categoriesData.values()) {
      if (category.slug === categorySlug) {
        categoryId = category.id;
        break;
      }
    }
    
    if (!categoryId) return [];
    
    const categoryPosts: BlogPostWithRelations[] = [];
    
    for (const blogPost of this.blogPostsData.values()) {
      if (blogPost.categoryId === categoryId) {
        const blogPostWithRelations = await this.buildBlogPostWithRelations(blogPost);
        if (blogPostWithRelations) {
          categoryPosts.push(blogPostWithRelations);
        }
      }
    }
    
    return categoryPosts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPostWithRelations | undefined> {
    for (const blogPost of this.blogPostsData.values()) {
      if (blogPost.slug === slug) {
        return this.buildBlogPostWithRelations(blogPost);
      }
    }
    return undefined;
  }
  
  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const newBlogPost: BlogPost = { id, ...blogPost };
    
    this.blogPostsData.set(id, newBlogPost);
    
    return newBlogPost;
  }
  
  async updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existingBlogPost = this.blogPostsData.get(id);
    if (!existingBlogPost) return undefined;
    
    const updatedBlogPost: BlogPost = { 
      ...existingBlogPost,
      ...blogPost,
      updatedAt: new Date()
    };
    
    this.blogPostsData.set(id, updatedBlogPost);
    
    return updatedBlogPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPostsData.delete(id);
  }
  
  async getBlogPostCount(): Promise<number> {
    return this.blogPostsData.size;
  }
  
  // Affiliate Links Methods
  async getAllAffiliateLinks(): Promise<AffiliateLink[]> {
    return Array.from(this.affiliateLinksData.values());
  }
  
  async getAffiliateLinkById(id: number): Promise<AffiliateLink | undefined> {
    return this.affiliateLinksData.get(id);
  }
  
  async createAffiliateLink(affiliateLink: InsertAffiliateLink): Promise<AffiliateLink> {
    const id = this.currentAffiliateLinkId++;
    const newAffiliateLink: AffiliateLink = { id, ...affiliateLink };
    
    this.affiliateLinksData.set(id, newAffiliateLink);
    
    return newAffiliateLink;
  }
  
  async updateAffiliateLink(id: number, affiliateLink: Partial<InsertAffiliateLink>): Promise<AffiliateLink | undefined> {
    const existingAffiliateLink = this.affiliateLinksData.get(id);
    if (!existingAffiliateLink) return undefined;
    
    const updatedAffiliateLink: AffiliateLink = { 
      ...existingAffiliateLink,
      ...affiliateLink,
      updatedAt: new Date()
    };
    
    this.affiliateLinksData.set(id, updatedAffiliateLink);
    
    return updatedAffiliateLink;
  }
  
  async deleteAffiliateLink(id: number): Promise<boolean> {
    return this.affiliateLinksData.delete(id);
  }
  
  async getAffiliateLinksByBlogPost(blogPostId: number): Promise<AffiliateLink[]> {
    const affiliateLinkIds = this.blogPostAffiliateLinksData.get(`blog-${blogPostId}`) || [];
    
    const affiliateLinks: AffiliateLink[] = [];
    for (const affiliateLinkId of affiliateLinkIds) {
      const affiliateLink = this.affiliateLinksData.get(affiliateLinkId);
      if (affiliateLink) {
        affiliateLinks.push(affiliateLink);
      }
    }
    
    return affiliateLinks;
  }
  
  async addAffiliateLinkToBlogPost(blogPostId: number, affiliateLinkId: number): Promise<boolean> {
    const blogPost = this.blogPostsData.get(blogPostId);
    const affiliateLink = this.affiliateLinksData.get(affiliateLinkId);
    
    if (!blogPost || !affiliateLink) return false;
    
    const key = `blog-${blogPostId}`;
    const affiliateLinkIds = this.blogPostAffiliateLinksData.get(key) || [];
    
    if (!affiliateLinkIds.includes(affiliateLinkId)) {
      affiliateLinkIds.push(affiliateLinkId);
      this.blogPostAffiliateLinksData.set(key, affiliateLinkIds);
    }
    
    return true;
  }
  
  async removeAffiliateLinkFromBlogPost(blogPostId: number, affiliateLinkId: number): Promise<boolean> {
    const key = `blog-${blogPostId}`;
    const affiliateLinkIds = this.blogPostAffiliateLinksData.get(key);
    
    if (!affiliateLinkIds) return false;
    
    const updatedIds = affiliateLinkIds.filter(id => id !== affiliateLinkId);
    this.blogPostAffiliateLinksData.set(key, updatedIds);
    
    return true;
  }
  
  // Helper method to build a BlogPostWithRelations object
  private async buildBlogPostWithRelations(blogPost: BlogPost): Promise<BlogPostWithRelations | undefined> {
    const category = blogPost.categoryId ? this.categoriesData.get(blogPost.categoryId) : undefined;
    const author = this.usersData.get(blogPost.authorId);
    
    if (!author) return undefined;
    
    const affiliateLinks = await this.getAffiliateLinksByBlogPost(blogPost.id);
    
    return {
      ...blogPost,
      category,
      author,
      affiliateLinks
    };
  }
  
  // Seed blog posts and affiliate links with initial data
  private seedBlogData() {
    // Create affiliate links
    const laptopStand = this.createAffiliateLinkImpl({
      title: "Laptop Stand",
      description: "Ergonomic portable laptop stand for digital nomads",
      affiliateUrl: "https://amzn.to/41NOHQx",
      productImage: "https://m.media-amazon.com/images/I/71Jz-qQEHIL._AC_SL1500_.jpg",
      productPrice: "$25.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const tripleMonitor = this.createAffiliateLinkImpl({
      title: "Triple Monitor Setup",
      description: "Ultimate productivity with triple monitor mount",
      affiliateUrl: "https://amzn.to/4kV0Fka",
      productImage: "https://m.media-amazon.com/images/I/61QLCXwdQqL._AC_SL1500_.jpg",
      productPrice: "$89.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const portableMonitor = this.createAffiliateLinkImpl({
      title: "Single Portable Monitor",
      description: "Travel-friendly 15.6\" portable monitor",
      affiliateUrl: "https://amzn.to/4kOCTWP",
      productImage: "https://m.media-amazon.com/images/I/71V2xD9pQ+L._AC_SL1500_.jpg",
      productPrice: "$119.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const powerBank = this.createAffiliateLinkImpl({
      title: "Power Bank (20,000mAh+)",
      description: "High-capacity power bank for all your devices",
      affiliateUrl: "https://amzn.to/4kQLIPW",
      productImage: "https://m.media-amazon.com/images/I/71UkCzCQgcL._AC_SL1500_.jpg",
      productPrice: "$39.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const travelAdapter = this.createAffiliateLinkImpl({
      title: "Global Travel Adapter",
      description: "All-in-one travel adapter for worldwide use",
      affiliateUrl: "https://amzn.to/4bPEE21",
      productImage: "https://m.media-amazon.com/images/I/61EgbXoJ-4L._AC_SL1500_.jpg",
      productPrice: "$22.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const airpods = this.createAffiliateLinkImpl({
      title: "AirPods (Noise-Canceling)",
      description: "Premium wireless earbuds with noise cancellation",
      affiliateUrl: "https://amzn.to/4iw5LBJ",
      productImage: "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
      productPrice: "$199.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const overEarHeadphones = this.createAffiliateLinkImpl({
      title: "Over-Ear Headphones",
      description: "Comfortable over-ear headphones with noise isolation",
      affiliateUrl: "https://amzn.to/4hDTry3",
      productImage: "https://m.media-amazon.com/images/I/616+L67uUBL._AC_SL1500_.jpg",
      productPrice: "$59.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const webcam = this.createAffiliateLinkImpl({
      title: "Webcam with Privacy Shutter",
      description: "HD webcam with privacy shutter for secure remote work",
      affiliateUrl: "https://amzn.to/4iSXQOE",
      productImage: "https://m.media-amazon.com/images/I/61OQP2+yqML._AC_SL1500_.jpg",
      productPrice: "$49.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const budgetLaptop = this.createAffiliateLinkImpl({
      title: "Lightweight Laptop under $1K",
      description: "Budget-friendly laptop for digital nomads",
      affiliateUrl: "https://amzn.to/4hJdb3q",
      productImage: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg", 
      productPrice: "$699.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const macbookAir = this.createAffiliateLinkImpl({
      title: "MacBook Air 13\"",
      description: "Ultra-lightweight MacBook Air for maximum portability",
      affiliateUrl: "https://amzn.to/4iUMKIZ",
      productImage: "https://m.media-amazon.com/images/I/71S4sIPFvBL._AC_SL1500_.jpg",
      productPrice: "$999.99",
      platform: "amazon",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Create a blog post
    const mobileOfficePost = this.createBlogPostImpl({
      title: "The Ultimate Digital Nomad Mobile Office Setup",
      slug: "ultimate-digital-nomad-mobile-office-setup",
      excerpt: "Build the perfect mobile workstation for your digital nomad lifestyle with our essential gear checklist - from laptops and monitors to noise-canceling headphones and power accessories.",
      content: `
# The Ultimate Digital Nomad Mobile Office Setup

As remote work continues to rise in popularity, more professionals are embracing the digital nomad lifestyle, working from anywhere in the world. But to be truly productive on the go, you need a reliable mobile office setup. Whether you're working from a café in Bali, a co-working space in Lisbon, or your Airbnb in Mexico City, having the right gear makes all the difference.

## Essential Gear for Your Mobile Office

### 1. Lightweight, Powerful Laptop

The foundation of any mobile office is a quality laptop. You need something powerful enough to handle your workload but light enough to carry comfortably.

**Budget-Friendly Option:** If you're looking for a [lightweight laptop under $1,000](https://amzn.to/4hJdb3q), there are many Windows and Chromebook options that offer excellent performance without breaking the bank.

**Premium Option:** The [MacBook Air 13"](https://amzn.to/4iUMKIZ) remains a favorite among digital nomads for its perfect balance of performance, battery life (up to 18 hours!), and incredibly thin and light design.

### 2. Ergonomic Workspace Accessories

Working hunched over a laptop for hours leads to neck and back pain. Improve your posture with these essentials:

- **Portable Laptop Stand:** A [foldable laptop stand](https://amzn.to/41NOHQx) elevates your screen to eye level, improving your posture instantly. Look for one that's lightweight and compact when folded.

- **External Monitor Setup:** For maximum productivity, consider a [portable monitor](https://amzn.to/4kOCTWP) that can easily slip into your backpack. If you have a dedicated workspace, a [triple monitor setup](https://amzn.to/4kV0Fka) can transform your productivity.

### 3. Audio Equipment for Calls and Focus

Clear communication and the ability to focus in noisy environments are crucial for remote workers:

- **Noise-Canceling Earbuds:** [AirPods Pro](https://amzn.to/4iw5LBJ) offer excellent noise cancellation in a tiny package, perfect for travelers.

- **Over-Ear Headphones:** For longer work sessions, [comfortable over-ear headphones](https://amzn.to/4hDTry3) provide better comfort and typically longer battery life.

### 4. Power Solutions

Never run out of battery with these power essentials:

- **High-Capacity Power Bank:** A [20,000+ mAh power bank](https://amzn.to/4kQLIPW) can recharge your laptop and phone multiple times.

- **Global Travel Adapter:** A [universal travel adapter](https://amzn.to/4bPEE21) ensures you can plug in anywhere in the world.

### 5. Video Conferencing Gear

Make the right impression on video calls:

- **HD Webcam:** Many laptops have poor built-in cameras. A [separate webcam with privacy shutter](https://amzn.to/4iSXQOE) offers better video quality and security.

## Software Essentials

Hardware is only part of the equation. These software tools complete your digital nomad toolkit:

- **Notion:** The ultimate all-in-one workspace for notes, tasks, and project management
- **Loom:** Record and share screen recordings easily with this video messaging tool

## Final Thoughts

Building your mobile office doesn't happen overnight. Start with the essentials—a good laptop, ergonomic stand, and reliable headphones—then add components as your budget allows and as you learn what works best for your specific work style.

Remember that the perfect setup varies depending on your profession and personal preferences. A graphic designer might prioritize a high-quality external monitor, while a content writer might invest more in comfortable peripherals for long typing sessions.

What's your essential piece of mobile office equipment? Let us know in the comments!
      `,
      coverImage: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?q=80&w=1000&auto=format&fit=crop",
      categoryId: 1, // Development category
      authorId: 1, // First user
      publishedAt: new Date(),
      updatedAt: new Date(),
      featured: true,
      metaTitle: "Ultimate Digital Nomad Mobile Office Setup | Essential Gear Guide",
      metaDescription: "Create your perfect mobile workstation with our digital nomad gear guide. From laptops to portable monitors, we cover everything you need for productive remote work.",
    });
    
    // Associate affiliate links with the blog post
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, laptopStand.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, tripleMonitor.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, portableMonitor.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, powerBank.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, travelAdapter.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, airpods.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, overEarHeadphones.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, webcam.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, budgetLaptop.id);
    this.addAffiliateLinkToBlogPostImpl(mobileOfficePost.id, macbookAir.id);
  }
  
  // Internal sync implementation of affiliate link creation
  private createAffiliateLinkImpl(affiliateLink: InsertAffiliateLink): AffiliateLink {
    const id = this.currentAffiliateLinkId++;
    const newAffiliateLink: AffiliateLink = { id, ...affiliateLink };
    
    this.affiliateLinksData.set(id, newAffiliateLink);
    
    return newAffiliateLink;
  }
  
  // Internal sync implementation of blog post creation
  private createBlogPostImpl(blogPost: InsertBlogPost): BlogPost {
    const id = this.currentBlogPostId++;
    const newBlogPost: BlogPost = { id, ...blogPost };
    
    this.blogPostsData.set(id, newBlogPost);
    
    return newBlogPost;
  }
  
  // Internal sync implementation of associating affiliate link with blog post
  private addAffiliateLinkToBlogPostImpl(blogPostId: number, affiliateLinkId: number): boolean {
    const key = `blog-${blogPostId}`;
    const affiliateLinkIds = this.blogPostAffiliateLinksData.get(key) || [];
    
    if (!affiliateLinkIds.includes(affiliateLinkId)) {
      affiliateLinkIds.push(affiliateLinkId);
      this.blogPostAffiliateLinksData.set(key, affiliateLinkIds);
    }
    
    return true;
  }
  
  private seedData() {
    // Seed categories
    const developmentCategory = this.seedCategory("Development", "development");
    const designCategory = this.seedCategory("Design", "design");
    const marketingCategory = this.seedCategory("Marketing", "marketing");
    const customerSupportCategory = this.seedCategory("Customer Support", "customer-support");
    const salesCategory = this.seedCategory("Sales", "sales");
    const financeCategory = this.seedCategory("Finance", "finance");
    const humanResourcesCategory = this.seedCategory("Human Resources", "human-resources");
    const productCategory = this.seedCategory("Product", "product");
    const managementCategory = this.seedCategory("Management", "management");
    const writingCategory = this.seedCategory("Writing", "writing");
    const dataCategory = this.seedCategory("Data", "data");
    
    // Seed locations
    const worldwideLocation = this.seedLocation("Worldwide", "worldwide", "Global");
    const usLocation = this.seedLocation("US Time Zones", "us-time-zones", "Americas");
    const euLocation = this.seedLocation("EU Time Zones", "eu-time-zones", "Europe");
    const apacLocation = this.seedLocation("APAC Time Zones", "apac-time-zones", "Asia");
    
    // Seed companies
    const techCorpCompany = this.seedCompany("TechCorp Solutions", "https://example.com/logo1.svg", "https://techcorp.com");
    const designHubCompany = this.seedCompany("DesignHub", "https://example.com/logo2.svg", "https://designhub.com");
    const growthGeniusCompany = this.seedCompany("GrowthGenius", "https://example.com/logo3.svg", "https://growthgenius.com");
    const remoteHelpCompany = this.seedCompany("RemoteHelp", "https://example.com/logo4.svg", "https://remotehelp.com");
    const worldStackCompany = this.seedCompany("WorldStack", "https://example.com/logo5.svg", "https://worldstack.com");
    
    // Seed skills
    const reactSkill = this.seedSkill("React");
    const typescriptSkill = this.seedSkill("TypeScript");
    const cssSkill = this.seedSkill("CSS");
    const reduxSkill = this.seedSkill("Redux");
    const figmaSkill = this.seedSkill("Figma");
    const uiDesignSkill = this.seedSkill("UI Design");
    const prototypingSkill = this.seedSkill("Prototyping");
    const userResearchSkill = this.seedSkill("User Research");
    const seoSkill = this.seedSkill("SEO");
    const contentStrategySkill = this.seedSkill("Content Strategy");
    const socialMediaSkill = this.seedSkill("Social Media");
    const emailMarketingSkill = this.seedSkill("Email Marketing");
    const customerServiceSkill = this.seedSkill("Customer Service");
    const communicationSkill = this.seedSkill("Communication");
    const problemSolvingSkill = this.seedSkill("Problem Solving");
    const zendeskSkill = this.seedSkill("Zendesk");
    const pythonSkill = this.seedSkill("Python");
    const djangoSkill = this.seedSkill("Django");
    const awsSkill = this.seedSkill("AWS");
    const postgresqlSkill = this.seedSkill("PostgreSQL");
    
    // Seed jobs
    const job1 = this.seedJob({
      title: "Remote Frontend Developer",
      slug: "remote-frontend-developer",
      description: "We are looking for a skilled Frontend Developer proficient in React.js to join our remote team. You'll work on exciting projects and collaborate with a global team of experts to deliver outstanding user experiences.",
      companyId: techCorpCompany.id,
      categoryId: developmentCategory.id,
      locationId: usLocation.id,
      type: "full-time",
      salaryMin: 90000,
      salaryMax: 120000,
      featured: true,
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      timezone: "UTC -4 to -10",
      experienceLevel: "mid"
    }, [reactSkill.id, typescriptSkill.id, cssSkill.id, reduxSkill.id]);
    
    const job2 = this.seedJob({
      title: "Senior UX/UI Designer",
      slug: "senior-ux-ui-designer",
      description: "Join our creative team as a Senior UX/UI Designer to create beautiful, intuitive interfaces for our clients. You'll collaborate with product managers and developers to deliver high-quality designs.",
      companyId: designHubCompany.id,
      categoryId: designCategory.id,
      locationId: euLocation.id,
      type: "full-time",
      salaryMin: 65000,
      salaryMax: 85000,
      featured: false,
      postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      timezone: "UTC -1 to +3",
      experienceLevel: "senior"
    }, [figmaSkill.id, uiDesignSkill.id, prototypingSkill.id, userResearchSkill.id]);
    
    const job3 = this.seedJob({
      title: "Content Marketing Manager",
      slug: "content-marketing-manager",
      description: "We're searching for a Content Marketing Manager to develop and execute our content strategy. You'll oversee our blog, social media channels, and email campaigns to drive growth.",
      companyId: growthGeniusCompany.id,
      categoryId: marketingCategory.id,
      locationId: worldwideLocation.id,
      type: "full-time",
      salaryMin: 70000,
      salaryMax: 90000,
      featured: false,
      postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      timezone: "Flexible",
      experienceLevel: "mid"
    }, [seoSkill.id, contentStrategySkill.id, socialMediaSkill.id, emailMarketingSkill.id]);
    
    const job4 = this.seedJob({
      title: "Customer Support Specialist",
      slug: "customer-support-specialist",
      description: "Join our dedicated support team to help our customers with product-related inquiries. You'll provide exceptional customer service via chat, email, and occasional calls.",
      companyId: remoteHelpCompany.id,
      categoryId: customerSupportCategory.id,
      locationId: apacLocation.id,
      type: "part-time",
      salaryMin: 25 * 2080, // hourly rate * full-time hours per year
      salaryMax: 30 * 2080,
      featured: false,
      postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      timezone: "UTC +5 to +12",
      experienceLevel: "entry"
    }, [customerServiceSkill.id, communicationSkill.id, problemSolvingSkill.id, zendeskSkill.id]);
    
    const job5 = this.seedJob({
      title: "Backend Developer (Python)",
      slug: "backend-developer-python",
      description: "Looking for a skilled Python developer to join our backend team. You'll work on our cloud infrastructure, APIs, and help scale our platforms to serve millions of users worldwide.",
      companyId: worldStackCompany.id,
      categoryId: developmentCategory.id,
      locationId: worldwideLocation.id,
      type: "full-time",
      salaryMin: 100000,
      salaryMax: 130000,
      featured: true,
      postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      timezone: "Flexible",
      experienceLevel: "senior"
    }, [pythonSkill.id, djangoSkill.id, awsSkill.id, postgresqlSkill.id]);
    
    // Add job for Writing category
    const contentCreationSkill = this.seedSkill("Content Creation");
    const copywritingSkill = this.seedSkill("Copywriting");
    const editingSkill = this.seedSkill("Editing");
    const seoWritingSkill = this.seedSkill("SEO Writing");
    
    const job6 = this.seedJob({
      title: "Content Writer (Remote)",
      slug: "content-writer-remote",
      description: "We're looking for a talented Content Writer to create engaging, SEO-optimized content for our blog, website, and marketing materials. You'll work with our marketing team to develop a content strategy that drives organic traffic and conversions.",
      companyId: growthGeniusCompany.id,
      categoryId: writingCategory.id,
      locationId: worldwideLocation.id,
      type: "full-time",
      salaryMin: 65000,
      salaryMax: 85000,
      featured: false,
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      timezone: "Flexible",
      experienceLevel: "mid"
    }, [contentCreationSkill.id, copywritingSkill.id, editingSkill.id, seoWritingSkill.id]);
    
    // Add job for Management category
    const leadershipSkill = this.seedSkill("Leadership");
    const teamManagementSkill = this.seedSkill("Team Management");
    const strategySkill = this.seedSkill("Strategy");
    const projectManagementSkill = this.seedSkill("Project Management");
    
    const job7 = this.seedJob({
      title: "Remote Team Lead",
      slug: "remote-team-lead",
      description: "We're seeking an experienced Team Lead to manage our distributed engineering team. You'll coordinate project deliverables, mentor team members, and ensure we meet our technical objectives while maintaining code quality.",
      companyId: techCorpCompany.id,
      categoryId: managementCategory.id,
      locationId: usLocation.id,
      type: "full-time",
      salaryMin: 110000,
      salaryMax: 140000,
      featured: true,
      postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      timezone: "UTC -8 to -4",
      experienceLevel: "senior"
    }, [leadershipSkill.id, teamManagementSkill.id, strategySkill.id, projectManagementSkill.id]);
  }
  
  private seedCategory(name: string, slug: string): Category {
    const id = this.currentCategoryId++;
    const category: Category = { id, name, slug };
    this.categoriesData.set(id, category);
    return category;
  }
  
  private seedLocation(name: string, slug: string, region: string): Location {
    const id = this.currentLocationId++;
    const location: Location = { id, name, slug, region };
    this.locationsData.set(id, location);
    return location;
  }
  
  private seedCompany(name: string, logo: string, website: string): Company {
    const id = this.currentCompanyId++;
    const company: Company = { id, name, logo, website };
    this.companiesData.set(id, company);
    return company;
  }
  
  private seedSkill(name: string): Skill {
    const id = this.currentSkillId++;
    const skill: Skill = { id, name };
    this.skillsData.set(id, skill);
    return skill;
  }
  
  private seedJob(job: Omit<Job, "id">, skillIds: number[]): Job {
    const id = this.currentJobId++;
    const newJob: Job = { id, ...job };
    this.jobsData.set(id, newJob);
    this.jobSkillsData.set(`job-${id}`, skillIds);
    return newJob;
  }
}

export const storage = new MemStorage();
