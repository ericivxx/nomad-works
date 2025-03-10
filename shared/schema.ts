import { pgTable, text, serial, integer, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table (keeping this for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
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
};
