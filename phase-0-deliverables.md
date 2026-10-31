# 📋 Phase 0 (Revised): Project Inspection, Comparative Design Analysis, Architecture & Technical Specifications

**Project:** Personal Brand Website, Developer Portfolio & Dynamic Admin CMS  
**Owner:** Majharul Islam Sifat  
**Date:** October 31, 2026  
**Status:** REVISED & COMPREHENSIVE (Awaiting Explicit Client Review & Approval before Phase 1)

---

## 1. Deep Inspection of Existing Design References

We performed direct structural and visual inspections of both provided live references:
- **Reference 1:** `https://pixel-perfect-replay-40783.lovable.app/#home`
- **Reference 2:** `https://sifat-signature-space.base44.app/`

### 1.1 Comparative Design & UX Breakdown

| Dimension | Reference 1: Lovable (`pixel-perfect-replay`) | Reference 2: Base44 (`sifat-signature-space`) | **Our Project Strategy (Synthesized & Elevated)** |
|---|---|---|---|
| **Layout & Architecture** | Single-page scroll-snap style with hash links (`#home`, `#about`, `#skills`, `#journey`, `#projects`, `#marketplace`). | True multi-page navigation (`/about`, `/projects`, `/skills`, `/content`, `/services`, etc.) with comprehensive footer directory. | **Hybrid Editorial Multi-Page:** A rich homepage featuring bite-sized interactive teasers leading into dedicated full-content pages (`/projects/[slug]`, `/services/[slug]`, `/about`, etc.). |
| **Typography System** | `Syne` (heavy bold display) + `Instrument Serif` (editorial italic accents) + `Manrope` (clean body text). | `Instrument Serif` (editorial headings) + `Inter` (readable UI body) + `JetBrains Mono` (technical metadata tags). | **Refined Editorial Sans + Serif:** `Plus Jakarta Sans` or `Syne` for powerful hero display titles, `Instrument Serif` for refined Italian-cut editorial emphasis, paired with `Inter` / `Geist` for body and `JetBrains Mono` for tech pills. |
| **Color Harmony** | Deep ink backgrounds (`#0B0B0F`), glowing ember accents (`#FF5722`), peach highlights (`#FFD8CC`), and dark frosted glass. | Warm beige / off-white base (`#F9F6F0`), high-contrast charcoal text (`#1A1A1E`), subtle blush accents, and white translucent glass (`bg-white/45`). | **Sophisticated Light/Dark Contrast:** Primarily warm beige/off-white surfaces with deep obsidian dark contrast sections (Hero, Featured Work, and Footer) without blinding neon or washed-out grays. |
| **Navigation Experience** | Centered floating pill navbar with active category pill highlight and CTA button ("Let's talk"). | Floating pill navbar with glass blur (`backdrop-blur-md`), brand monogram circle ("MI"), and responsive mobile drawer. | **Original Liquid Glass Island:** Floating rounded pill with backdrop blur (`blur-xl`), subtle specular edge highlight (`border-white/20`), active route indicator, quick WhatsApp/Contact CTA, and responsive drawer on mobile. |
| **Visual Assets & Media** | Uses a cutout portrait (`portrait_cutout.png`) layered over large typography with floating stat pills. | High-resolution embedded YouTube thumbnails (`hqdefault.jpg`), clean project cards with badge tags. | **Layered Studio Composition:** Preserves your authentic portrait cutout layered between oversized background typography and floating live status tags (*"Junior Software Engineer"*, *"Dhaka, BD"*). |
| **Animations & Transitions** | CSS entrance reveals with staggered delays (`reveal`, `transition-delay: 100ms`). | Subtle hover transforms (`hover:-translate-y-0.5`), responsive modal drawers, and smooth transitions. | **Framer Motion + CSS Hardware Acceleration:** Gentle parallax in hero, subtle card hover elevations, smooth accordion tabs, and respectful `prefers-reduced-motion` compliance. |
| **Responsive Behavior** | Collapses into a clean floating hamburger icon with full-screen mobile menu. | Skip-to-content accessibility link, clean stacked cards, mobile-friendly touch targets. | **Mobile-First Ergonomics:** Natural vertical scrolling (no rigid snap entrapment on touch screens), touch-friendly pill buttons, and responsive grid layouts (1 col mobile, 2 col tablet, 3-4 col desktop). |

---

## 2. Technology Stack & Version Compatibility Verification

We explicitly verified the current stable ecosystem via npm registry:
- **Next.js:** Version `14.2.x` (LTS) or `15.x` with React 19.
  - **Selected Production Target:** **Next.js 14.2.35 (App Router with TypeScript)**.
  - **Reasoning:** Maximum stability, mature production ecosystem with Prisma ORM, Framer Motion, and Tailwind CSS without experimental breaking changes in React Server Components or SSR streaming.
- **Language & Runtime:** TypeScript 5.x on Node.js `v24.20.0`.
- **Styling & Design System:** Tailwind CSS v3.4 + Tailwind Animate + CSS Custom Properties.
- **UI Primitives:** Lucide React (feather-light, accessible vector icons).
- **ORM & Data Layer:** Prisma ORM `v5.x / v6.x` + Zod Schema Validation.
- **Database Engine:**
  - **Local Development:** SQLite (instant local sandbox with zero external friction).
  - **Production:** PostgreSQL (hosted on Supabase or Neon DB with connection pooling).
- **Authentication:** Custom Auth using HTTP-Only signed session cookies, JWT, and bcrypt.

---

## 3. Strict Defense-in-Depth Security Architecture

Authentication and authorization **will NOT rely solely on Middleware**. A 3-layer security perimeter will be enforced:

```
[ Incoming Request / Form Action ]
               │
               ▼
   LAYER 1: Edge Middleware
   - Validates session JWT in HTTP-Only cookie.
   - Redirects unauthenticated traffic away from `/admin/*` routes to `/admin/login`.
               │
               ▼
   LAYER 2: Server Action & API Route Guard (`requireAdminAuth()`)
   - Re-extracts and cryptographically verifies the session token inside the server context.
   - Verifies the user's role (`ADMIN`) in the database.
   - Rejects unauthorized invocations immediately with HTTP 401/403.
               │
               ▼
   LAYER 3: Zod Schema Validation & Data Sanitization
   - Every input field (text, URLs, status enums) is validated against strict Zod schemas before reaching Prisma.
   - Prevents SQL injection, parameter tampering, and XSS payload persistence.
```

### Server Action Security Pattern
```typescript
// Example: src/actions/project-actions.ts
export async function createProjectAction(rawInput: unknown) {
  // 1. Authorization check inside the action itself
  const session = await getAuthenticatedAdminSession();
  if (!session || session.role !== "ADMIN") {
    throw new Error("Unauthorized: Administrative privilege required.");
  }

  // 2. Strict Input validation
  const validatedData = ProjectInputSchema.parse(rawInput);

  // 3. Database operation
  return await db.project.create({ data: validatedData });
}
```

---

## 4. Production-Grade Media Storage Strategy

Local filesystem storage (`public/uploads/`) is **ephemeral on serverless hosts like Vercel** (any redeployment or container recycle deletes locally written files).

### Media Architecture Plan:
1. **Primary Production Storage: Supabase Storage / Cloudinary API**
   - Direct integration via a modular Media Service adapter (`src/lib/storage.ts`).
   - Stores uploaded project covers, video thumbnails, and certificate scans in persistent cloud object storage with global CDN delivery and automatic WebP/AVIF compression.
2. **Local Development Fallback:**
   - During offline local work, an interface allows writing to a local staging folder, but the app code interacts solely with the abstract `StorageService` interface:
   ```typescript
   export interface StorageProvider {
     upload(file: Buffer, fileName: string, mimeType: string): Promise<string>; // returns persistent URL
     delete(fileUrl: string): Promise<boolean>;
   }
   ```
3. **Protection of Authentic Photos:**
   - The original files in `img/` (`Professional profile .png`, `full body.png`, `Working.png`, `content creating.png`) are permanently read-only and preserved in source control.
   - The Admin Media Library will reference them cleanly without mutating the raw master copies.

---

## 5. Comprehensive Relational Prisma Schema

The schema includes explicit relational models, compound indexes, role-based access, media tracking, and draft/publish workflows:

```prisma
datasource db {
  provider = "sqlite" // Seamlessly swapped to "postgresql" for production
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. Admin Authentication & Role Management
model User {
  id           String      @id @default(cuid())
  email        String      @unique
  passwordHash String
  name         String
  role         String      @default("ADMIN") // "ADMIN" | "EDITOR"
  isActive     Boolean     @default(true)
  lastLoginAt  DateTime?
  mediaUploads MediaItem[]
  auditLogs    AuditLog[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

// 2. Personal Profile & Brand Settings
model Profile {
  id             String      @id @default("primary")
  fullName       String      @default("Majharul Islam Sifat")
  tagline        String
  shortBio       String
  aboutIntro     String
  aboutStory     String
  email          String
  whatsapp       String
  location       String
  heroImageId    String?
  heroImage      MediaItem?  @relation("HeroImage", fields: [heroImageId], references: [id])
  aboutImageId   String?
  aboutImage     MediaItem?  @relation("AboutImage", fields: [aboutImageId], references: [id])
  resumeUrl      String?
  socialLinks    Json        // [{ platform: "GitHub", url: "...", icon: "github", enabled: true }]
  updatedAt      DateTime    @updatedAt
}

// 3. Centralized Media Library Tracking
model MediaItem {
  id           String      @id @default(cuid())
  fileName     String
  storageKey   String      @unique
  url          String
  mimeType     String
  sizeBytes    Int
  width        Int?
  height       Int?
  altText      String?
  uploadedById String?
  uploadedBy   User?       @relation(fields: [uploadedById], references: [id], onDelete: SetNull)
  
  // Relations to content
  heroProfiles Profile[]   @relation("HeroImage")
  aboutProfiles Profile[]  @relation("AboutImage")
  projectCovers Project[]  @relation("ProjectCover")
  serviceCovers Service[]  @relation("ServiceCover")
  productCovers Product[]  @relation("ProductCover")
  achievements  Achievement[] @relation("AchievementCert")

  createdAt    DateTime    @default(now())

  @@index([mimeType])
  @@index([createdAt])
}

// 4. Skills & Proficiencies
model Skill {
  id          String   @id @default(cuid())
  name        String
  category    String   // "DEVELOPMENT" | "CREATIVE" | "TOOLS"
  level       String   // "Beginner" | "Intermediate" | "Proficient" | "Learning"
  order       Int      @default(0)
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category, isPublished])
}

// 5. Education History
model Education {
  id          String   @id @default(cuid())
  institution String
  degree      String
  department  String?
  board       String?
  gpa         String?
  duration    String
  description String?
  certificateUrl String?
  order       Int      @default(0)
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([order, isPublished])
}

// 6. Experience & Training History
model Experience {
  id               String   @id @default(cuid())
  organization     String
  role             String
  type             String   // "PROFESSIONAL" | "LEARNING_TRAINING"
  startDate        String
  endDate          String?
  isCurrent        Boolean  @default(false)
  description      String
  responsibilities Json     // string[]
  technologies     Json     // string[]
  externalUrl      String?
  order            Int      @default(0)
  isPublished      Boolean  @default(true)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([type, isPublished])
}

// 7. Projects Showcase
model Project {
  id            String     @id @default(cuid())
  slug          String     @unique
  title         String
  category      String     // "Web Development" | "E-commerce" | "Software Development" | "Android" | "IoT"
  shortDesc     String
  fullDesc      String
  technologies  Json       // string[]
  features      Json       // string[]
  myRole        String?
  status        String     // "Completed" | "In Progress" | "v1.1.2"
  liveDemoUrl   String?
  githubUrl     String?
  coverImageId  String?
  coverImage    MediaItem? @relation("ProjectCover", fields: [coverImageId], references: [id], onDelete: SetNull)
  galleryUrls   Json       // string[]
  isFeatured    Boolean    @default(false)
  isPublished   Boolean    @default(true) // Draft/Publish workflow
  order         Int        @default(0)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt

  @@index([slug])
  @@index([category, isPublished])
  @@index([isFeatured, isPublished])
}

// 8. YouTube & Creative Content
model Video {
  id          String   @id @default(cuid())
  title       String
  videoUrl    String
  youtubeId   String
  category    String   // "Food Blogging" | "Travel Vlogging" | "Resort Reviews" | "Tour & Travel"
  thumbnailUrl String
  description String?
  isFeatured  Boolean  @default(false)
  isPublished Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category, isPublished])
  @@index([isFeatured])
}

// 9. Services
model Service {
  id           String     @id @default(cuid())
  slug         String     @unique
  title        String
  shortDesc    String
  fullDesc     String
  features     Json       // string[]
  deliverables Json       // string[]
  pricing      String?
  deliveryTime String?
  coverImageId String?
  coverImage   MediaItem? @relation("ServiceCover", fields: [coverImageId], references: [id], onDelete: SetNull)
  order        Int        @default(0)
  isPublished  Boolean    @default(true)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  @@index([slug, isPublished])
}

// 10. Digital Products Marketplace
model Product {
  id           String     @id @default(cuid())
  slug         String     @unique
  name         String
  shortDesc    String
  fullDesc     String
  category     String
  status       String     // "Coming Soon" | "In Development" | "Planned"
  price        String?
  demoUrl      String?
  coverImageId String?
  coverImage   MediaItem? @relation("ProductCover", fields: [coverImageId], references: [id], onDelete: SetNull)
  galleryUrls  Json       // string[]
  features     Json       // string[]
  isFeatured   Boolean    @default(false)
  isPublished  Boolean    @default(true)
  order        Int        @default(0)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  @@index([slug, isPublished])
}

// 11. Achievements & Certificates
model Achievement {
  id             String     @id @default(cuid())
  title          String
  organization   String
  issueDate      String?
  category       String     // "Certificate" | "Award" | "Training"
  description    String?
  certificateId  String?
  certificate    MediaItem? @relation("AchievementCert", fields: [certificateId], references: [id], onDelete: SetNull)
  verifyUrl      String?
  order          Int        @default(0)
  isPublished    Boolean    @default(true)
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt

  @@index([category, isPublished])
}

// 12. Contact Inquiries & Notifications
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([isRead, createdAt])
}

// 13. Audit Log for Security & Admin Activity
model AuditLog {
  id        String   @id @default(cuid())
  action    String   // "CREATE_PROJECT" | "UPDATE_PROFILE" | "DELETE_MEDIA"
  entity    String   // "Project" | "Skill" | "Profile"
  entityId  String?
  userId    String?
  user      User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  metadata  Json?
  timestamp DateTime @default(now())

  @@index([timestamp])
}

// 14. Global Site Settings & SEO
model SiteSetting {
  id         String   @id @default("global")
  siteName   String   @default("Majharul Islam Sifat | Portfolio & Personal Brand")
  metaTitle  String
  metaDesc   String
  keywords   String
  ogImage    String?
  footerText String
  updatedAt  DateTime @updatedAt
}
```

---

## 6. SQLite-to-PostgreSQL Seamless Migration Strategy

To avoid breaking changes between rapid local development and high-performance cloud deployment, we establish a clean migration pipeline:

1. **Standard Prisma Schema Design:**
   - All models use standard Prisma scalar types and `Json` fields that are 100% compatible between SQLite and PostgreSQL.
   - Primary keys use standard CUID strings (`@default(cuid())`), eliminating auto-increment sequence discrepancies.
2. **Provider Switch Procedure:**
   - Local `.env`: `DATABASE_URL="file:./dev.db"` with `provider = "sqlite"` in `prisma/schema.prisma`.
   - Production `.env`: `DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"` with `provider = "postgresql"`.
3. **Data Portability via Idempotent Seed Script:**
   - A deterministic seed script (`prisma/seed.ts`) populates all verified baseline records (Profile, Archgig experience, CST Diploma, Voice-to-Text project, Men's Outfit, 4 YouTube videos).
   - Running `npx prisma db push && npx prisma db seed` on any new PostgreSQL database instantly recreates the complete verified dataset without manual data re-entry.

---

## 7. Strict Photographic & Identity Preservation Policy

1. **Immutable Master Copies:**
   - All 4 files inside `img/`:
     - `Professional profile .png`
     - `full body.png`
     - `Working.png`
     - `content creating.png`
   - will remain untouched in their original state. They will never be overwritten, modified in-place, or deleted.
2. **Identity Integrity Guarantee:**
   - No AI face swapping, facial restructuring, skin color alterations, or synthetic portraits will ever be used.
   - For web delivery, only non-destructive derived assets (such as optimized `.webp` copies with responsive widths) will be placed in `public/assets/personal/`.

---

## 8. Summary of Revisions & Deliverables Checklist

- [x] **Inspection of References:** Analyzed Lovable (`pixel-perfect-replay`) and Base44 (`sifat-signature-space`) for layout, typography, navigation, and color balance.
- [x] **Verified Tech Stack:** Selected Next.js 14.2 LTS (App Router), TypeScript, Tailwind CSS, and Prisma ORM for rock-solid stability and zero breaking changes.
- [x] **3-Tier Security Perimeter:** Edge middleware + internal Server Action authorization + Zod input validation on every mutation.
- [x] **Production Storage Architecture:** Cloudinary / Supabase Storage adapter interface designed to prevent data loss on serverless hosts.
- [x] **Enhanced Prisma Schema:** Added Media tracking, Audit logs, Draft/Publish indexes, and explicit relations.
- [x] **SQLite-to-PostgreSQL Pipeline:** Documented schema compatibility and automated seed migration.
- [x] **Photographic Asset Protection:** Strict read-only policy for `img/` master files confirmed.

---

### 🛑 Checkpoint & Approval Request
Development remains paused per workflow rules. Please review this updated **Phase 0** report. 

**Do you approve this revised Phase 0 specification so we may begin Phase 1 (Design System & UI Foundation)?**
