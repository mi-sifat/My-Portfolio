import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawServices = await db.service.findMany({
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

      const resolvedCoverUrl = s.coverImageUrl || s.coverImage?.url || null;

      return {
        ...s,
        coverImageUrl: resolvedCoverUrl,
        features: feats,
        deliverables: delivs,
        galleryUrls: gallery,
      };
    });

    return NextResponse.json({ success: true, services });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      category,
      icon,
      shortDesc,
      fullDesc,
      pricing,
      deliveryTime,
      features,
      deliverables,
      coverImageUrl,
      coverImageId,
      galleryUrls,
      isFeatured,
      isPublished,
      order,
    } = body;

    const featArr = Array.isArray(features)
      ? features
      : (features || "").split("\n").map((s: string) => s.trim()).filter(Boolean);
    const delivArr = Array.isArray(deliverables)
      ? deliverables
      : (deliverables || "").split("\n").map((s: string) => s.trim()).filter(Boolean);
    const galleryArr = Array.isArray(galleryUrls)
      ? galleryUrls
      : (galleryUrls || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    let finalSlug = (slug || title).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "");
    const existing = await db.service.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newSrv = await db.service.create({
      data: {
        title,
        slug: finalSlug,
        category: category || "Web Development",
        icon: icon || "Layers",
        shortDesc,
        fullDesc: fullDesc || shortDesc,
        pricing: pricing || "Custom Scope",
        deliveryTime: deliveryTime || "1-2 Weeks",
        features: JSON.stringify(featArr),
        deliverables: JSON.stringify(delivArr),
        coverImageUrl: coverImageUrl || null,
        coverImageId: coverImageId || null,
        galleryUrls: JSON.stringify(galleryArr),
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, service: newSrv }, { status: 201 });
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Failed to create service";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Service ID is required" }, { status: 400 });
    }

    if (data.features !== undefined) {
      const arr = Array.isArray(data.features)
        ? data.features
        : data.features.split("\n").map((s: string) => s.trim()).filter(Boolean);
      data.features = JSON.stringify(arr);
    }
    if (data.deliverables !== undefined) {
      const arr = Array.isArray(data.deliverables)
        ? data.deliverables
        : data.deliverables.split("\n").map((s: string) => s.trim()).filter(Boolean);
      data.deliverables = JSON.stringify(arr);
    }
    if (data.galleryUrls !== undefined) {
      const arr = Array.isArray(data.galleryUrls)
        ? data.galleryUrls
        : data.galleryUrls.split(",").map((s: string) => s.trim()).filter(Boolean);
      data.galleryUrls = JSON.stringify(arr);
    }
    if (data.order !== undefined) {
      data.order = Number(data.order);
    }
    if (data.isFeatured !== undefined) {
      data.isFeatured = Boolean(data.isFeatured);
    }
    if (data.isPublished !== undefined) {
      data.isPublished = Boolean(data.isPublished);
    }

    delete data.coverImage;

    const updated = await db.service.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Failed to update service";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete service" }, { status: 500 });
  }
}
