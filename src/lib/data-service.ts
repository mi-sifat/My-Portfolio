import { db } from "@/lib/db";
import {
  PROFILE_DATA,
  SKILLS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  PROJECTS_DATA,
  YOUTUBE_VIDEOS,
  SERVICES_DATA,
  PRODUCTS_DATA,
  ACHIEVEMENTS_DATA,
} from "@/lib/portfolioData";

export async function getProfile() {
  try {
    const profile = await db.profile.findFirst({
      include: { heroImage: true, aboutImage: true },
    });
    return profile || PROFILE_DATA;
  } catch (error) {
    console.warn("Falling back to static profile data:", error);
    return PROFILE_DATA;
  }
}

export async function getSkills() {
  try {
    const skills = await db.skill.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return skills.length > 0 ? skills : SKILLS_DATA;
  } catch {
    return SKILLS_DATA;
  }
}

export async function getExperience() {
  try {
    const experiences = await db.experience.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return experiences.length > 0 ? experiences : EXPERIENCE_DATA;
  } catch {
    return EXPERIENCE_DATA;
  }
}

export async function getEducation() {
  try {
    const education = await db.education.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return education.length > 0 ? education : EDUCATION_DATA;
  } catch {
    return EDUCATION_DATA;
  }
}

export async function getProjects() {
  try {
    const projects = await db.project.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return projects.length > 0 ? projects : PROJECTS_DATA;
  } catch {
    return PROJECTS_DATA;
  }
}

export async function getVideos() {
  try {
    const videos = await db.video.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return videos.length > 0 ? videos : YOUTUBE_VIDEOS;
  } catch {
    return YOUTUBE_VIDEOS;
  }
}

export async function getServices() {
  try {
    const services = await db.service.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return services.length > 0 ? services : SERVICES_DATA;
  } catch {
    return SERVICES_DATA;
  }
}

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return products.length > 0 ? products : PRODUCTS_DATA;
  } catch {
    return PRODUCTS_DATA;
  }
}

export async function getAchievements() {
  try {
    const achievements = await db.achievement.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
    return achievements.length > 0 ? achievements : ACHIEVEMENTS_DATA;
  } catch {
    return ACHIEVEMENTS_DATA;
  }
}

