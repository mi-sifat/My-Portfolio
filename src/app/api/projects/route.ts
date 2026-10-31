import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";
    const category = searchParams.get("category");

    const where: { isPublished: boolean; isFeatured?: boolean; category?: string } = {
      isPublished: true,
    };
    if (featuredOnly) {
      where.isFeatured = true;
    }
    if (category && category !== "All") {
      where.category = category;
    }

    const rawProjects = await db.project.findMany({
      where,
      include: { coverImage: true },
      orderBy: { order: "asc" },
    });

    const projects = rawProjects.map((p) => {
      let techs: string[] = [];
      let feats: string[] = [];
      let gallery: string[] = [];
      try {
        techs = typeof p.technologies === "string" ? JSON.parse(p.technologies) : p.technologies;
      } catch {
        techs = [];
      }
      try {
        feats = typeof p.features === "string" ? JSON.parse(p.features) : p.features;
      } catch {
        feats = [];
      }
      try {
        gallery = typeof p.galleryUrls === "string" ? JSON.parse(p.galleryUrls) : p.galleryUrls;
      } catch {
        gallery = [];
      }

      return {
        ...p,
        coverImageUrl: p.coverImageUrl || p.coverImage?.url || null,
        technologies: techs,
        features: feats,
        galleryUrls: gallery,
      };
    });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Public projects fetch error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch projects" }, { status: 500 });
  }
}

