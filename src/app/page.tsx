import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { HomeSectionPreviews, HomeProject, HomeService } from "@/components/home/HomeSectionPreviews";
import { db } from "@/lib/db";
import { PROJECTS_DATA, SERVICES_DATA } from "@/lib/portfolioData";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let projects: HomeProject[] = [];
  let services: HomeService[] = [];

  try {
    // 1. Fetch featured published projects from DB
    let rawProjects = await db.project.findMany({
      where: { isPublished: true, isFeatured: true },
      include: { coverImage: true },
      orderBy: { order: "asc" },
    });

    if (rawProjects.length === 0) {
      // Fallback to top 3 published projects if none marked featured
      rawProjects = await db.project.findMany({
        where: { isPublished: true },
        include: { coverImage: true },
        orderBy: { order: "asc" },
        take: 3,
      });
    }

    if (rawProjects.length > 0) {
      projects = rawProjects.map((p) => {
        let techs: string[] = [];
        try {
          techs = typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies;
        } catch {
          techs = [];
        }
        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          shortDesc: p.shortDesc,
          technologies: techs,
          status: p.status,
          liveDemoUrl: p.liveDemoUrl,
          githubUrl: p.githubUrl,
          coverImageUrl: p.coverImageUrl || p.coverImage?.url || null,
        };
      });
    }

    // 2. Fetch published services from DB
    const rawServices = await db.service.findMany({
      where: { isPublished: true },
      include: { coverImage: true },
      orderBy: { order: "asc" },
      take: 3,
    });

    if (rawServices.length > 0) {
      services = rawServices.map((s) => {
        let feats: string[] = [];
        try {
          feats = typeof s.features === "string" ? JSON.parse(s.features) : s.features;
        } catch {
          feats = [];
        }
        return {
          id: s.id,
          slug: s.slug,
          title: s.title,
          category: s.category || "Service Offering",
          shortDesc: s.shortDesc,
          pricing: s.pricing,
          deliveryTime: s.deliveryTime,
          features: feats,
          coverImageUrl: s.coverImageUrl || s.coverImage?.url || null,
        };
      });
    }
  } catch (err) {
    console.error("Home page DB query error:", err);
  }

  // Resilient fallback to static data if database is temporarily unavailable
  if (projects.length === 0) {
    projects = PROJECTS_DATA.slice(0, 3).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      shortDesc: p.shortDesc,
      technologies: p.technologies,
      status: p.versionOrStatus,
      liveDemoUrl: p.liveDemoUrl || null,
      githubUrl: p.githubUrl || null,
      coverImageUrl: null,
    }));
  }

  if (services.length === 0) {
    services = SERVICES_DATA.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      category: "Service Offering",
      shortDesc: s.shortDesc,
      pricing: "Custom Scope",
      deliveryTime: s.estimatedDelivery || null,
      features: s.features,
      coverImageUrl: null,
    }));
  }

  return (
    <div className="space-y-32 pb-24">
      {/* 1. HERO SECTION WITH PARALLAX & ENTRANCE */}
      <HeroSection />

      {/* 2. ABOUT ME PREVIEW WITH SCROLL REVEAL */}
      <AboutPreview />

      {/* 3. MODULAR PREVIEWS (LIVE DATABASE PROJECTS & SERVICES WITH BANNERS) */}
      <HomeSectionPreviews projects={projects} services={services} />
    </div>
  );
}
