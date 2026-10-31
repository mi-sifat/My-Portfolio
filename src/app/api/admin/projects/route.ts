import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawProjects = await db.project.findMany({
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

      const resolvedCoverUrl = p.coverImageUrl || p.coverImage?.url || null;

      return {
        ...p,
        coverImageUrl: resolvedCoverUrl,
        technologies: techs,
        features: feats,
        galleryUrls: gallery,
      };
    });

    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch projects" }, { status: 500 });
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
      shortDesc,
      fullDesc,
      technologies,
      features,
      status,
      liveDemoUrl,
      githubUrl,
      coverImageUrl,
      coverImageId,
      galleryUrls,
      isFeatured,
      isPublished,
      order,
    } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, message: "Title and slug are required" }, { status: 400 });
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : (technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean);
    const featArray = Array.isArray(features)
      ? features
      : (features || "").split("\n").map((s: string) => s.trim()).filter(Boolean);
    const galleryArray = Array.isArray(galleryUrls)
      ? galleryUrls
      : (galleryUrls || "").split(",").map((s: string) => s.trim()).filter(Boolean);

    // Ensure unique slug
    let finalSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "");
    const existing = await db.project.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newProject = await db.project.create({
      data: {
        title,
        slug: finalSlug,
        category: category || "Web Development",
        shortDesc: shortDesc || "",
        fullDesc: fullDesc || shortDesc || "",
        technologies: JSON.stringify(techArray),
        features: JSON.stringify(featArray),
        coverImageUrl: coverImageUrl || null,
        coverImageId: coverImageId || null,
        galleryUrls: JSON.stringify(galleryArray),
        status: status || "Completed",
        liveDemoUrl: liveDemoUrl || null,
        githubUrl: githubUrl || null,
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Failed to create project";
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
      return NextResponse.json({ success: false, message: "Project ID is required" }, { status: 400 });
    }

    if (data.technologies !== undefined) {
      const arr = Array.isArray(data.technologies)
        ? data.technologies
        : data.technologies.split(",").map((s: string) => s.trim()).filter(Boolean);
      data.technologies = JSON.stringify(arr);
    }
    if (data.features !== undefined) {
      const arr = Array.isArray(data.features)
        ? data.features
        : data.features.split("\n").map((s: string) => s.trim()).filter(Boolean);
      data.features = JSON.stringify(arr);
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

    // Clean up coverImage relation if needed
    delete data.coverImage;

    const updated = await db.project.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Failed to update project";
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
    if (!id) {
      return NextResponse.json({ success: false, message: "Project ID is required" }, { status: 400 });
    }

    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete project" }, { status: 500 });
  }
}
