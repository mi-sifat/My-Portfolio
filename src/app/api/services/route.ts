import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rawServices = await db.service.findMany({
      where: { isPublished: true },
      include: { coverImage: true },
      orderBy: { order: "asc" },
    });

    const services = rawServices.map((s) => {
      let feats: string[] = [];
      let delivs: string[] = [];
      let gallery: string[] = [];
      try {
        feats = typeof s.features === "string" ? JSON.parse(s.features) : s.features;
      } catch {
        feats = [];
      }
      try {
        delivs = typeof s.deliverables === "string" ? JSON.parse(s.deliverables) : s.deliverables;
      } catch {
        delivs = [];
      }
      try {
        gallery = typeof s.galleryUrls === "string" ? JSON.parse(s.galleryUrls) : s.galleryUrls;
      } catch {
        gallery = [];
      }

      return {
        ...s,
        coverImageUrl: s.coverImageUrl || s.coverImage?.url || null,
        features: feats,
        deliverables: delivs,
        galleryUrls: gallery,
      };
    });

    return NextResponse.json({ success: true, services });
  } catch (error) {
    console.error("Public services fetch error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch services" }, { status: 500 });
  }
}

