import { pgTable, text, serial, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for storing user data
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  username: text("username").notNull(),
  fullName: text("full_name"),
  gender: text("gender"),
  location: text("location"),
  bio: text("bio"),
  savedSearches: text("saved_searches").array(),
  savedJobs: text("saved_jobs").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastLogin: timestamp("last_login"),
  role: text("role").default("user").notNull(), // 'user', 'admin', etc.
  isVerified: boolean("is_verified").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  username: true,
  fullName: true,
  gender: true,
  location: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Companies
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  website: text("website"),
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  name: true,
  logo: true,
  website: true,
});

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

// Job categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Locations
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  region: text("region"),
});

export const insertLocationSchema = createInsertSchema(locations).pick({
  name: true,
  slug: true,
  region: true,
});

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

// Skills
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Jobs
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  companyId: integer("company_id").notNull(),
  categoryId: integer("category_id").notNull(),
  locationId: integer("location_id").notNull(),
  type: text("type").notNull(), // "full-time", "part-time", "contract", "freelance"
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  featured: boolean("featured").default(false),
  postedAt: timestamp("posted_at").notNull().defaultNow(),
  timezone: text("timezone"),
  experienceLevel: text("experience_level"), // "entry", "mid", "senior"
}, (table) => {
  return {
    categoryIdx: index("category_idx").on(table.categoryId),
    locationIdx: index("location_idx").on(table.locationId),
    companyIdx: index("company_idx").on(table.companyId),
  };
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

// Job skills (many-to-many relationship)
export const jobSkills = pgTable("job_skills", {
  jobId: integer("job_id").notNull(),
  skillId: integer("skill_id").notNull(),
}, (table) => {
  return {
    jobIdx: index("job_idx").on(table.jobId),
    skillIdx: index("skill_idx").on(table.skillId),
  };
});

export const insertJobSkillSchema = createInsertSchema(jobSkills);

export type InsertJobSkill = z.infer<typeof insertJobSkillSchema>;
export type JobSkill = typeof jobSkills.$inferSelect;

// Extended job type for frontend with relationships resolved
export type JobWithRelations = Job & {
  company: Company;
  category: Category;
  location: Location;
  skills: Skill[];
  // Optional fields for job provider sources
  source?: string;
  externalId?: string;
  applyUrl?: string;
};

// Authentication schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  fullName: z.string().optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
});

export const checkEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type LoginCredentials = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type CheckEmailRequest = z.infer<typeof checkEmailSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type ResetPasswordRequestData = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

// Blog & Affiliate schemas
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  categoryId: integer("category_id").references(() => categories.id),
  authorId: integer("author_id").references(() => users.id).notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  featured: boolean("featured").default(false),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
});

export const affiliateLinks = pgTable("affiliate_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  affiliateUrl: text("affiliate_url").notNull(),
  productImage: text("product_image"),
  productPrice: text("product_price"),
  platform: text("platform").notNull(), // e.g., "amazon", "nordvpn", etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogPostAffiliateLinks = pgTable("blog_post_affiliate_links", {
  id: serial("id").primaryKey(), 
  blogPostId: integer("blog_post_id").references(() => blogPosts.id).notNull(),
  affiliateLinkId: integer("affiliate_link_id").references(() => affiliateLinks.id).notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
});

export const insertAffiliateLinkSchema = createInsertSchema(affiliateLinks).omit({
  id: true,
});

export const insertBlogPostAffiliateLinkSchema = createInsertSchema(blogPostAffiliateLinks).omit({
  id: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertAffiliateLink = z.infer<typeof insertAffiliateLinkSchema>;
export type AffiliateLink = typeof affiliateLinks.$inferSelect;

export type InsertBlogPostAffiliateLink = z.infer<typeof insertBlogPostAffiliateLinkSchema>;
export type BlogPostAffiliateLink = typeof blogPostAffiliateLinks.$inferSelect;

export type BlogPostWithRelations = BlogPost & {
  category?: Category;
  author: User;
  affiliateLinks?: AffiliateLink[];
};
