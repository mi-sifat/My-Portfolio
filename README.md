# Majharul Islam Sifat — Personal Brand & Developer Portfolio Platform

> **Official Personal Brand, Developer Portfolio, Content Creator Platform, and Dynamic Admin CMS** built for **Majharul Islam Sifat** (Junior Software Engineer at Archgig, CST 8th Semester Diploma Student, MERN Developer, and Digital Content Creator).

---

## 🌟 Key Highlights & Architecture

- **Next.js 14.2 LTS App Router**: Modern React Server Components & Client Components architecture with zero breaking changes.
- **Warm Glassmorphism UI**: Bespoke warm luxury aesthetic (`#FBF9F5` warm beige, `#0C0C0F` obsidian, `#FFE9E2` peach, `#E25822` ember) with dark/light mode toggle.
- **Dynamic Prisma ORM & Relational DB**: 14 structured database models with zero-configuration SQLite for local development and 100% PostgreSQL production compatibility.
- **Edge Middleware Authentication**: Secure JWT cookies + `bcryptjs` password hashing protecting all `/admin/*` management routes.
- **Complete Admin CMS (CRUD)**: Full Create, Read, Update, and Delete operations for Projects, Skills, Experiences, Education, YouTube Videos, Services, Products, Achievements, and Inquiries.
- **Centralized Media Asset Library**: Drag-and-drop image uploader, automated dimensions and size calculation via `sharp`, and instant URL copy tools.
- **Enterprise Production Hardening**: Strict HTTP security headers, in-memory rate limiting against DDoS and form spam, dynamic XML sitemap, `robots.txt`, and Google JSON-LD structured data.
- **Strict Photographic Identity Preservation**: Original master photos in `img/` are guaranteed read-only and preserved permanently.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14.2.24 (App Router) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS 3.4 + Custom Glassmorphism System |
| **Icons** | Lucide React |
| **Database ORM** | Prisma ORM 5.22.0 LTS |
| **Local Database** | SQLite (`prisma/dev.db`) |
| **Production Database** | PostgreSQL (Ready via `.env` connection string) |
| **Image Processing** | Sharp 0.35 |
| **Security & Auth** | Jose (Edge JWT) + Bcryptjs + Zod Validation |

---

## 🧭 Public & Admin Route Sitemap

### Public Showcase Pages
- **Homepage (`/`)**: Hero section, bio preview, quick stats, and multi-module navigation previews.
- **About (`/about`)**: Personal background, journey, engineering philosophy, and hobbies.
- **Projects (`/projects`)**: Interactive software showcase with real-time tech search and category filter.
- **Skills (`/skills`)**: Technical engineering & creative stack with category switch tabs.
- **Education (`/education`)**: CST Diploma and secondary school qualifications.
- **Experience (`/experience`)**: Junior Software Engineer role at Archgig and learning attachments.
- **YouTube Creator (`/youtube`)**: Verified channel showreel with inline cinematic video player modal.
- **Services (`/services`)**: Full-stack web development and consultation offerings.
- **Products (`/products`)**: Developer starter kits and digital template showcase.
- **Achievements (`/achievements`)**: Certifications, awards, and honors.
- **Contact (`/contact`)**: Direct form submission saving to database + one-click WhatsApp/email channels.
- **SEO Routes**: `/sitemap.xml` and `/robots.txt`.

### Admin CMS Control Center (`/admin`)
- **Overview (`/admin`)**: Real-time database metrics, recent inquiries, system infrastructure status.
- **Login (`/admin/login`)**: Edge-guarded administrator login screen with show/hide password toggle.
- **Projects Manager (`/admin/projects`)**: Add, edit, draft/publish, and delete software projects.
- **Skills Inventory (`/admin/skills`)**: Categorized skills management with proficiency level ratings.
- **Profile & Bio (`/admin/profile`)**: Live personal titles, narrative, WhatsApp, and resume link updates.
- **YouTube Manager (`/admin/youtube`)**: Add video logs with automatic YouTube ID detection.
- **Experience (`/admin/experience`)**: Professional roles, attachments, and responsibilities manager.
- **Education (`/admin/education`)**: Academic degrees and institutions.
- **Services & Products (`/admin/services`, `/admin/products`)**: Pricing, offerings, and digital goods.
- **Inquiries Center (`/admin/messages`)**: Read, mark as read/unread, inspect, and delete messages.
- **Media Library (`/admin/media`)**: Drag-and-drop file uploader, dimensions inspector, and URL copier.
- **Settings (`/admin/settings`)**: Global platform SEO title, meta descriptions, and footer copyright.

---

## 🔐 Admin Authentication Credentials

For initial local inspection and testing:

- **Admin Email:** `majharulislamsifat93@gmail.com`
- **Default Password:** `SifatSecurePassword2026!`
- **Login URL:** `http://localhost:3000/admin/login`

> **Note:** To change the administrator password, run `npx tsx` to hash a new password using `bcryptjs` and update the `passwordHash` column in the `User` table, or set `ADMIN_PASSWORD` in your production environment variables prior to seeding.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.18 or higher (tested on Node.js v20 & v24)
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone or navigate to the repository
cd "my portfolio"

# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sifat-super-secret-admin-jwt-key-2026-production-ready"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Database Setup & Seeding
```bash
# Push Prisma schema to generate dev.db and client
npx prisma db push

# Seed verified baseline data (Admin account, profile, projects, skills, videos)
npx tsx prisma/seed.ts
```

### 5. Start Development Server
```bash
# Listen on all interfaces (enables LAN mobile preview)
npm run dev -- -H 0.0.0.0
```
- Open `http://localhost:3000` in your web browser.
- Open `http://<your-lan-ip>:3000` on your mobile phone connected to the same Wi-Fi.

---

## 🌐 Production Deployment Guide

### Deploying to Vercel (Recommended)

1. Push your repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio & admin cms v1.0"
   git remote add origin https://github.com/mi-sifat/<repo-name>.git
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Set the following **Environment Variables** in Vercel Project Settings:
   - `DATABASE_URL`: Your PostgreSQL connection string (from Supabase, Neon, or Railway):
     ```
     postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require
     ```
   - `JWT_SECRET`: A strong random 64-character secret.
   - `NEXT_PUBLIC_SITE_URL`: `https://majharulislamsifat.com` (or your Vercel URL).
4. Update `prisma/schema.prisma` datasource provider for PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Run database migration on production:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
6. Deploy! Vercel will automatically build the 47 static and dynamic routes.

---

## 🛡️ SQLite-to-PostgreSQL Migration Guide

The database schema has been intentionally designed with scalar types compatible across SQLite and PostgreSQL:

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
   to:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. In your `.env` or cloud dashboard, point `DATABASE_URL` to your PostgreSQL database.
3. Run:
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```
4. All verified baseline records will be populated automatically with identical relations and security settings.

---

## 👤 Developer & Content Creator Information

- **Name:** Majharul Islam Sifat
- **Role:** Junior Software Engineer at Archgig
- **Education:** 8th Semester Diploma in Computer Science & Technology (BTEB)
- **Email:** `majharulislamsifat93@gmail.com`
- **WhatsApp:** `+8801638090793`
- **Location:** Dhaka, Bangladesh
- **GitHub:** [github.com/mi-sifat](https://github.com/mi-sifat)
- **LinkedIn:** [linkedin.com/in/majharulislamsifat93](https://www.linkedin.com/in/majharulislamsifat93/)
- **YouTube:** [youtube.com/@majharulislamsifat](https://www.youtube.com/channel/UCD8FOEQ-yTH19DMjZkwSCLw)

---

© 2026 Majharul Islam Sifat. All Rights Reserved. Built with Next.js 14, Tailwind CSS, Prisma ORM, and Antigravity.
