import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  PROFILE_DATA,
  SKILLS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  YOUTUBE_VIDEOS,
  SERVICES_DATA,
  PRODUCTS_DATA,
  ACHIEVEMENTS_DATA,
} from "../src/lib/portfolioData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seed with verified records...");

  // 1. Seed Admin User
  // IMPORTANT: Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file before running seed
  const adminEmail = process.env.ADMIN_EMAIL;
  const rawPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !rawPassword) {
    throw new Error(
      "❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.\n" +
      "   Copy .env.example to .env and fill in your credentials.\n" +
      "   Never hardcode credentials in source code."
    );
  }

  const passwordHash = await bcrypt.hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      email: adminEmail,
      name: "Majharul Islam Sifat",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });
  console.log("✅ Admin User seeded:", adminEmail);

  // 2. Seed Profile
  await prisma.profile.upsert({
    where: { id: "primary" },
    update: {
      fullName: PROFILE_DATA.fullName,
      tagline: PROFILE_DATA.tagline,
      shortBio: "An 8th Semester CST Diploma student, MERN developer, and content creator dedicated to building dependable web platforms and engaging visual stories.",
      aboutIntro: "Driven by curiosity, grounded in continuous practical learning.",
      aboutStory: "My path into Computer Science and Technology began with guidance and encouragement from my cousin, Al Masum Bhai. Starting out with video creation, thumbnail design, and visual aesthetics, I discovered the power of crafting digital media. During my Diploma in Engineering studies, programming opened up an entirely new horizon.",
      email: PROFILE_DATA.email,
      whatsapp: PROFILE_DATA.whatsapp,
      location: PROFILE_DATA.location,
      socialLinks: JSON.stringify(PROFILE_DATA.socialLinks),
    },
    create: {
      id: "primary",
      fullName: PROFILE_DATA.fullName,
      tagline: PROFILE_DATA.tagline,
      shortBio: "An 8th Semester CST Diploma student, MERN developer, and content creator dedicated to building dependable web platforms and engaging visual stories.",
      aboutIntro: "Driven by curiosity, grounded in continuous practical learning.",
      aboutStory: "My path into Computer Science and Technology began with guidance and encouragement from my cousin, Al Masum Bhai. Starting out with video creation, thumbnail design, and visual aesthetics, I discovered the power of crafting digital media. During my Diploma in Engineering studies, programming opened up an entirely new horizon.",
      email: PROFILE_DATA.email,
      whatsapp: PROFILE_DATA.whatsapp,
      location: PROFILE_DATA.location,
      socialLinks: JSON.stringify(PROFILE_DATA.socialLinks),
    },
  });
  console.log("✅ Profile seeded.");

  // 3. Seed Skills
  for (let i = 0; i < SKILLS_DATA.length; i++) {
    const s = SKILLS_DATA[i];
    await prisma.skill.upsert({
      where: { id: s.id },
      update: {
        name: s.name,
        category: s.category.toUpperCase(),
        level: s.level,
        order: i,
        isPublished: true,
      },
      create: {
        id: s.id,
        name: s.name,
        category: s.category.toUpperCase(),
        level: s.level,
        order: i,
        isPublished: true,
      },
    });
  }
  console.log("✅ Skills seeded:", SKILLS_DATA.length);

  // 4. Seed Education
  for (let i = 0; i < EDUCATION_DATA.length; i++) {
    const edu = EDUCATION_DATA[i];
    await prisma.education.upsert({
      where: { id: edu.id },
      update: {
        institution: edu.institution,
        degree: edu.degree,
        department: edu.department,
        board: edu.board,
        gpa: edu.gpa,
        duration: edu.duration,
        statusBadge: edu.statusBadge,
        description: edu.description,
        order: i,
        isPublished: true,
      },
      create: {
        id: edu.id,
        institution: edu.institution,
        degree: edu.degree,
        department: edu.department,
        board: edu.board,
        gpa: edu.gpa,
        duration: edu.duration,
        statusBadge: edu.statusBadge,
        description: edu.description,
        order: i,
        isPublished: true,
      },
    });
  }
  console.log("✅ Education seeded:", EDUCATION_DATA.length);

  // 5. Seed Experience
  for (let i = 0; i < EXPERIENCE_DATA.length; i++) {
    const exp = EXPERIENCE_DATA[i];
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {
        organization: exp.organization,
        role: exp.role,
        type: exp.type === "Professional" ? "PROFESSIONAL" : "LEARNING_TRAINING",
        duration: exp.duration,
        isCurrent: exp.isCurrent,
        description: exp.description,
        responsibilities: JSON.stringify([]),
        technologies: JSON.stringify(exp.technologies),
        order: i,
        isPublished: true,
      },
      create: {
        id: exp.id,
        organization: exp.organization,
        role: exp.role,
        type: exp.type === "Professional" ? "PROFESSIONAL" : "LEARNING_TRAINING",
        duration: exp.duration,
        isCurrent: exp.isCurrent,
        description: exp.description,
        responsibilities: JSON.stringify([]),
        technologies: JSON.stringify(exp.technologies),
        order: i,
        isPublished: true,
      },
    });
  }
  console.log("✅ Experience seeded:", EXPERIENCE_DATA.length);

  // 6. Seed Projects
  for (let i = 0; i < PROJECTS_DATA.length; i++) {
    const p = PROJECTS_DATA[i];
    await prisma.project.upsert({
      where: { id: p.id },
      update: {
        slug: p.slug,
        title: p.title,
        category: p.category,
        shortDesc: p.shortDesc,
        fullDesc: p.shortDesc,
        technologies: JSON.stringify(p.technologies),
        features: JSON.stringify([]),
        status: p.versionOrStatus,
        liveDemoUrl: p.liveDemoUrl,
        githubUrl: p.githubUrl,
        galleryUrls: JSON.stringify([]),
        isFeatured: p.isFeatured,
        isPublished: true,
        order: i,
      },
      create: {
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        shortDesc: p.shortDesc,
        fullDesc: p.shortDesc,
        technologies: JSON.stringify(p.technologies),
        features: JSON.stringify([]),
        status: p.versionOrStatus,
        liveDemoUrl: p.liveDemoUrl,
        githubUrl: p.githubUrl,
        galleryUrls: JSON.stringify([]),
        isFeatured: p.isFeatured,
        isPublished: true,
        order: i,
      },
    });
  }
  console.log("✅ Projects seeded:", PROJECTS_DATA.length);

  // 7. Seed YouTube Videos
  for (let i = 0; i < YOUTUBE_VIDEOS.length; i++) {
    const v = YOUTUBE_VIDEOS[i];
    await prisma.video.upsert({
      where: { id: v.id },
      update: {
        title: v.title,
        videoUrl: v.youtubeUrl,
        youtubeId: v.youtubeId,
        category: v.category,
        thumbnailUrl: v.thumbnailUrl,
        isFeatured: v.isFeatured,
        isPublished: true,
        order: i,
      },
      create: {
        id: v.id,
        title: v.title,
        videoUrl: v.youtubeUrl,
        youtubeId: v.youtubeId,
        category: v.category,
        thumbnailUrl: v.thumbnailUrl,
        isFeatured: v.isFeatured,
        isPublished: true,
        order: i,
      },
    });
  }
  console.log("✅ YouTube Videos seeded:", YOUTUBE_VIDEOS.length);

  // 8. Seed Services
  for (let i = 0; i < SERVICES_DATA.length; i++) {
    const s = SERVICES_DATA[i];
    await prisma.service.upsert({
      where: { id: s.id },
      update: {
        slug: s.slug,
        title: s.title,
        shortDesc: s.shortDesc,
        fullDesc: s.shortDesc,
        features: JSON.stringify(s.features),
        deliverables: JSON.stringify(s.deliverables),
        deliveryTime: s.estimatedDelivery,
        order: i,
        isPublished: true,
      },
      create: {
        id: s.id,
        slug: s.slug,
        title: s.title,
        shortDesc: s.shortDesc,
        fullDesc: s.shortDesc,
        features: JSON.stringify(s.features),
        deliverables: JSON.stringify(s.deliverables),
        deliveryTime: s.estimatedDelivery,
        order: i,
        isPublished: true,
      },
    });
  }
  console.log("✅ Services seeded:", SERVICES_DATA.length);

  // 9. Seed Digital Products
  for (let i = 0; i < PRODUCTS_DATA.length; i++) {
    const prod = PRODUCTS_DATA[i];
    await prisma.product.upsert({
      where: { id: prod.id },
      update: {
        slug: prod.slug,
        name: prod.name,
        shortDesc: prod.shortDesc,
        fullDesc: prod.shortDesc,
        category: prod.category,
        status: prod.status,
        features: JSON.stringify(prod.features),
        galleryUrls: JSON.stringify([]),
        order: i,
        isPublished: true,
      },
      create: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        shortDesc: prod.shortDesc,
        fullDesc: prod.shortDesc,
        category: prod.category,
        status: prod.status,
        features: JSON.stringify(prod.features),
        galleryUrls: JSON.stringify([]),
        order: i,
        isPublished: true,
      },
    });
  }
  console.log("✅ Products seeded:", PRODUCTS_DATA.length);

  // 10. Seed Achievements
  for (let i = 0; i < ACHIEVEMENTS_DATA.length; i++) {
    const ach = ACHIEVEMENTS_DATA[i];
    await prisma.achievement.upsert({
      where: { id: ach.id },
      update: {
        title: ach.title,
        organization: ach.organization,
        category: ach.category,
        statusLabel: ach.statusLabel,
        description: ach.description,
        order: i,
        isPublished: true,
      },
      create: {
        id: ach.id,
        title: ach.title,
        organization: ach.organization,
        category: ach.category,
        statusLabel: ach.statusLabel,
        description: ach.description,
        order: i,
        isPublished: true,
      },
    });
  }
  console.log("✅ Achievements seeded:", ACHIEVEMENTS_DATA.length);

  // 11. Seed Site Setting
  await prisma.siteSetting.upsert({
    where: { id: "global" },
    update: {
      siteName: "Majharul Islam Sifat | Portfolio & Personal Brand",
      metaTitle: "Majharul Islam Sifat — Junior Software Engineer & Content Creator",
      metaDesc: "Official portfolio of Majharul Islam Sifat: Junior Software Engineer at Archgig, CST Diploma student, MERN developer, and digital content creator.",
      keywords: "Majharul Islam Sifat, Software Engineer, Archgig, CST Diploma, MERN Stack, Next.js, Developer, Bangladesh",
      footerText: "© 2026 Majharul Islam Sifat. All rights reserved.",
    },
    create: {
      id: "global",
      siteName: "Majharul Islam Sifat | Portfolio & Personal Brand",
      metaTitle: "Majharul Islam Sifat — Junior Software Engineer & Content Creator",
      metaDesc: "Official portfolio of Majharul Islam Sifat: Junior Software Engineer at Archgig, CST Diploma student, MERN developer, and digital content creator.",
      keywords: "Majharul Islam Sifat, Software Engineer, Archgig, CST Diploma, MERN Stack, Next.js, Developer, Bangladesh",
      footerText: "© 2026 Majharul Islam Sifat. All rights reserved.",
    },
  });
  console.log("✅ Global Site Settings seeded.");

  console.log("🎉 Database Seed Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

