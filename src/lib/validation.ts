import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Admin authentication validation schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Project validation schema
export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(2, "Category is required"),
  shortDesc: z.string().min(10, "Short description is required"),
  fullDesc: z.string().min(20, "Full description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology required"),
  features: z.array(z.string()).min(1, "At least one feature required"),
  myRole: z.string().optional(),
  status: z.string().default("Completed"),
  liveDemoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

// Skill validation schema
export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(["DEVELOPMENT", "CREATIVE", "TOOLS"]),
  level: z.string().min(1, "Level is required"),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// Experience validation schema
export const experienceSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  role: z.string().min(1, "Role is required"),
  type: z.enum(["PROFESSIONAL", "LEARNING_TRAINING"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(10, "Description is required"),
  responsibilities: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  externalUrl: z.string().url().optional().or(z.literal("")),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// Education validation schema
export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  department: z.string().optional().nullable(),
  board: z.string().optional().nullable(),
  gpa: z.string().optional().nullable(),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// Video validation schema
export const videoSchema = z.object({
  title: z.string().min(2, "Title is required"),
  videoUrl: z.string().url("Must be a valid URL"),
  youtubeId: z.string().min(5, "YouTube ID is required"),
  category: z.string().min(1, "Category is required"),
  thumbnailUrl: z.string().min(1, "Thumbnail URL is required"),
  description: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

// Service validation schema
export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDesc: z.string().min(10, "Short description is required"),
  fullDesc: z.string().min(20, "Full description is required"),
  features: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  pricing: z.string().optional().nullable(),
  deliveryTime: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// Product validation schema
export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().default("Coming Soon"),
  shortDesc: z.string().min(10, "Short description is required"),
  fullDesc: z.string().min(20, "Full description is required"),
  price: z.string().optional().nullable(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  galleryUrls: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

