export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: "Development" | "Creative" | "Tools";
  level: "Beginner" | "Intermediate" | "Proficient" | "Learning";
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Software Development" | "E-commerce" | "Android" | "IoT";
  shortDesc: string;
  technologies: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  versionOrStatus: string;
  isFeatured: boolean;
  coverImage: string;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  category: string;
  thumbnailUrl: string;
  isFeatured: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  features: string[];
  deliverables: string[];
  estimatedDelivery?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: string;
  status: "Coming Soon" | "In Development" | "Planned";
  features: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  category: string;
  statusLabel: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  department?: string;
  board?: string;
  gpa?: string;
  duration: string;
  statusBadge: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  type: "Professional" | "Learning & Training";
  duration: string;
  isCurrent: boolean;
  description: string;
  technologies: string[];
}

export const PROFILE_DATA = {
  fullName: "Majharul Islam Sifat",
  tagline: "Junior Software Engineer · Web Developer · Content Creator",
  email: "majharulislamsifat93@gmail.com",
  whatsapp: "+8801638090793",
  location: "Dhaka, Bangladesh",
  heroPortrait: "/assets/personal/profile-portrait.png",
  aboutPortrait: "/assets/personal/about-portrait.png",
  workingPortrait: "/assets/personal/working-portrait.png",
  creatorPortrait: "/assets/personal/creator-portrait.png",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/mi-sifat", icon: "github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/majharulislamsifat93/", icon: "linkedin" },
    { platform: "YouTube", url: "https://www.youtube.com/channel/UCD8FOEQ-yTH19DMjZkwSCLw", icon: "youtube" },
    { platform: "Facebook", url: "https://www.facebook.com/majharulislamsifat93", icon: "facebook" },
    { platform: "Instagram", url: "https://www.instagram.com/majharul_islam_sifat/", icon: "instagram" },
    { platform: "TikTok", url: "https://www.tiktok.com/@majharul_9t3", icon: "tiktok" },
  ],
};

export const SKILLS_DATA: SkillItem[] = [
  { id: "1", name: "JavaScript", category: "Development", level: "Proficient" },
  { id: "2", name: "PHP", category: "Development", level: "Intermediate" },
  { id: "3", name: "MySQL", category: "Development", level: "Intermediate" },
  { id: "4", name: "WordPress", category: "Development", level: "Intermediate" },
  { id: "5", name: "HTML & CSS", category: "Development", level: "Proficient" },
  { id: "6", name: "Git & GitHub", category: "Development", level: "Intermediate" },
  { id: "7", name: "MERN Stack", category: "Development", level: "Learning" },
  { id: "8", name: "Video Editing", category: "Creative", level: "Proficient" },
  { id: "9", name: "Thumbnail Design", category: "Creative", level: "Proficient" },
  { id: "10", name: "Adobe Photoshop", category: "Creative", level: "Intermediate" },
  { id: "11", name: "CapCut", category: "Creative", level: "Proficient" },
  { id: "12", name: "Adobe Premiere Pro", category: "Creative", level: "Intermediate" },
  { id: "13", name: "Adobe After Effects", category: "Creative", level: "Beginner" },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    institution: "Diploma in Engineering Institute",
    degree: "Diploma in Engineering",
    department: "Computer Science & Technology (CST)",
    duration: "Currently enrolled",
    statusBadge: "8th Semester (Ongoing)",
    description: "Deepening fundamental software engineering, database management, web systems, and mobile application engineering.",
  },
  {
    id: "edu-2",
    institution: "বঙ্গবন্ধু বিদ্যানিকেতন",
    degree: "Secondary School Certificate (SSC)",
    department: "Science Group",
    board: "Dhaka Board",
    gpa: "GPA 4.17",
    duration: "Completed",
    statusBadge: "Completed (GPA 4.17)",
    description: "Completed secondary education in Science with a solid academic foundation in mathematics and general sciences.",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    organization: "Archgig",
    role: "Junior Software Engineer",
    type: "Professional",
    duration: "Current Position",
    isCurrent: true,
    description: "Developing modern web applications and software solutions, collaborating on feature implementations, and expanding enterprise web development skills.",
    technologies: ["Web Development", "JavaScript", "Software Architecture"],
  },
  {
    id: "exp-2",
    organization: "Men's Outfit",
    role: "E-commerce & Digital Operations",
    type: "Professional",
    duration: "E-commerce Experience",
    isCurrent: false,
    description: "Assisted in digital catalog management, online order operations, and e-commerce platform workflows for men's fashion retail.",
    technologies: ["E-commerce", "Operations", "Product Catalog"],
  },
  {
    id: "exp-3",
    organization: "Genuity Systems IT",
    role: "IT & Systems Training Program",
    type: "Learning & Training",
    duration: "Technical Training",
    isCurrent: false,
    description: "Enrolled in structured software development and practical systems training to build strong engineering discipline.",
    technologies: ["Software Training", "Systems Architecture", "Applied IT"],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    slug: "voice-to-text",
    title: "Voice-to-Text Software",
    category: "Software Development",
    shortDesc: "A bilingual Windows speech-to-text transcription application supporting Bangla and English with real-time recognition.",
    technologies: ["Windows App", "Speech API", "Bangla & English NLP"],
    liveDemoUrl: "https://vtotext-indol.vercel.app/",
    versionOrStatus: "v1.1.2 Production",
    isFeatured: true,
    coverImage: "/assets/personal/working-portrait.png",
  },
  {
    id: "proj-2",
    slug: "mens-outfit",
    title: "Men's Outfit E-commerce",
    category: "E-commerce",
    shortDesc: "A complete modern e-commerce platform for men's fashion apparel featuring product filters, cart, and responsive storefront.",
    technologies: ["Next.js", "Tailwind CSS", "JavaScript", "E-commerce"],
    liveDemoUrl: "https://men-s-outfit.vercel.app/",
    githubUrl: "https://github.com/mi-sifat/Men-s-Outfit",
    versionOrStatus: "Live Storefront",
    isFeatured: true,
    coverImage: "/assets/personal/profile-portrait.png",
  },
  {
    id: "proj-3",
    slug: "smart-expense-tracker",
    title: "Smart Expense Tracker",
    category: "Android",
    shortDesc: "Native Android finance management application engineered with clean MVVM architecture and offline-first Room database.",
    technologies: ["Kotlin", "Room Database", "MVVM", "Android SDK"],
    versionOrStatus: "In Development",
    isFeatured: true,
    coverImage: "/assets/personal/working-portrait.png",
  },
  {
    id: "proj-4",
    slug: "student-notes-app",
    title: "Student Notes App",
    category: "Android",
    shortDesc: "Lightweight offline Android note-taking utility designed for academic study routines with categorized notebooks.",
    technologies: ["Kotlin", "Room DB", "XML Layouts"],
    versionOrStatus: "Offline Android App",
    isFeatured: false,
    coverImage: "/assets/personal/working-portrait.png",
  },
  {
    id: "proj-5",
    slug: "iot-smart-room",
    title: "IoT Multi-Room Automation",
    category: "IoT",
    shortDesc: "Microcontroller automation concept controlling electrical appliances over Wi-Fi with Blynk telemetry and multi-relay switching.",
    technologies: ["ESP32", "Relay Module", "Blynk IoT"],
    versionOrStatus: "Hardware Prototype",
    isFeatured: false,
    coverImage: "/assets/personal/working-portrait.png",
  },
];

export const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Featured Travel & Food Vlog — Comprehensive Tour Experience",
    youtubeUrl: "https://www.youtube.com/watch?v=2XFI0fdDGn4&t=1139s",
    youtubeId: "2XFI0fdDGn4",
    category: "Travel & Tour",
    thumbnailUrl: "https://i.ytimg.com/vi/2XFI0fdDGn4/hqdefault.jpg",
    isFeatured: true,
  },
  {
    id: "vid-2",
    title: "Culinary Exploration & Local Food Review",
    youtubeUrl: "https://youtu.be/Pxw_dvUuY-o",
    youtubeId: "Pxw_dvUuY-o",
    category: "Food Blogging",
    thumbnailUrl: "https://i.ytimg.com/vi/Pxw_dvUuY-o/hqdefault.jpg",
    isFeatured: true,
  },
  {
    id: "vid-3",
    title: "Resort Exploration & Scenic Tour Vlogging",
    youtubeUrl: "https://youtu.be/L3LAwg9wMqk",
    youtubeId: "L3LAwg9wMqk",
    category: "Resort Reviews",
    thumbnailUrl: "https://i.ytimg.com/vi/L3LAwg9wMqk/hqdefault.jpg",
    isFeatured: true,
  },
  {
    id: "vid-4",
    title: "Destination Highlights & Travel Lifestyle Diary",
    youtubeUrl: "https://youtu.be/cnj8xRubzxw",
    youtubeId: "cnj8xRubzxw",
    category: "Tour & Lifestyle",
    thumbnailUrl: "https://i.ytimg.com/vi/cnj8xRubzxw/hqdefault.jpg",
    isFeatured: true,
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-1",
    slug: "website-development",
    title: "Full-Stack Website Development",
    shortDesc: "Custom web development tailored for businesses and personal brands, built with modern JavaScript frameworks.",
    features: ["Responsive Mobile-First UI", "Fast Loading Architecture", "SEO & OpenGraph Integration", "CMS-Ready Setup"],
    deliverables: ["Full Source Code", "Deployment on Vercel/Cloud", "Admin Guide"],
    estimatedDelivery: "7 - 14 Days",
  },
  {
    id: "srv-2",
    slug: "ecommerce-development",
    title: "E-commerce Website Development",
    shortDesc: "Complete online storefronts designed for smooth catalog browsing, cart management, and WhatsApp ordering.",
    features: ["Product Showcase & Filters", "Direct WhatsApp Purchase Link", "Speed Optimization", "Social Sharing"],
    deliverables: ["Ready-to-sell Web Store", "Product Upload Setup", "Mobile Preview"],
    estimatedDelivery: "10 - 20 Days",
  },
  {
    id: "srv-3",
    slug: "video-editing",
    title: "Video Editing & Content Creation",
    shortDesc: "Polished video editing for YouTube, travel vlogs, food reviews, and short-form TikTok/Reels content.",
    features: ["Color Correction & Grading", "Dynamic Subtitles & Cuts", "Sound Design & Music Sync", "High-Def Export"],
    deliverables: ["Full HD / 4K MP4 Exports", "Thumbnails & Titles"],
    estimatedDelivery: "2 - 4 Days",
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "prod-1",
    slug: "voice-to-text-pro",
    name: "Voice-to-Text Windows Pro Tool",
    shortDesc: "Enhanced Windows utility for fast real-time Bangla voice dictation and instant clipboard copy.",
    category: "Desktop Software",
    status: "In Development",
    features: ["Offline Voice Models", "Bangla & English Transcripts", "Export to TXT & Word"],
  },
  {
    id: "prod-2",
    slug: "creator-thumbnail-pack",
    name: "Travel & Food Thumbnail Template Kit",
    shortDesc: "Photoshop & Canva template bundle tailored for food reviewers and travel vloggers seeking high CTR.",
    category: "Design Templates",
    status: "Planned",
    features: ["High-Contrast Typography", "Editable Layers", "Color Presets"],
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "ach-1",
    title: "SSC Science Excellence Award",
    organization: "বঙ্গবন্ধু বিদ্যানিকেতন · Dhaka Board",
    category: "Academic",
    statusLabel: "Verified Credential",
    description: "Earned GPA 4.17 in the Secondary School Certificate examination in the Science group.",
  },
  {
    id: "ach-2",
    title: "Speech-to-Text v1.1.2 Production Release",
    organization: "Independent Software Initiative",
    category: "Software Milestone",
    statusLabel: "Live Production Release",
    description: "Successfully architected and deployed a functional bilingual speech recognition application for Windows.",
  },
  {
    id: "ach-3",
    title: "Diploma in Engineering CST — 8th Semester Candidate",
    organization: "Technical Education Board",
    category: "Engineering Progression",
    statusLabel: "Final Stage Candidate",
    description: "Advanced into the 8th semester of CST Diploma engineering with practical focus on software systems.",
  },
];

