import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const videos = await db.video.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, videos });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch videos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, videoUrl, youtubeId, category, thumbnailUrl, description, isFeatured, order } = body;

    if (!title || !youtubeId) {
      return NextResponse.json({ success: false, message: "Title and YouTube ID are required" }, { status: 400 });
    }

    const newVideo = await db.video.create({
      data: {
        title,
        videoUrl: videoUrl || `https://www.youtube.com/watch?v=${youtubeId}`,
        youtubeId,
        category: category || "Food & Tour Vlogs",
        thumbnailUrl: thumbnailUrl || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80`,
        description: description || "",
        isFeatured: Boolean(isFeatured),
        order: Number(order) || 0,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, video: newVideo }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create video" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, videoUrl, youtubeId, category, thumbnailUrl, description, isFeatured, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Video ID is required" }, { status: 400 });
    }

    const updated = await db.video.update({
      where: { id },
      data: {
        title,
        videoUrl,
        youtubeId,
        category,
        thumbnailUrl,
        description,
        isFeatured: Boolean(isFeatured),
        order: Number(order),
      },
    });

    return NextResponse.json({ success: true, video: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update video" }, { status: 500 });
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
      return NextResponse.json({ success: false, message: "Video ID is required" }, { status: 400 });
    }

    await db.video.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete video" }, { status: 500 });
  }
}

