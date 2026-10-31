import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const media = await db.mediaItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, media });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch media" }, { status: 500 });
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
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const item = await db.mediaItem.findUnique({ where: { id } });
    if (!item) {
      return NextResponse.json({ success: false, message: "Media item not found" }, { status: 404 });
    }

    // If file is stored in public/uploads, delete from disk
    if (item.url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", item.url);
      try {
        await fs.unlink(filePath);
      } catch {
        // File may already be deleted from disk
      }
    }

    await db.mediaItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Media deleted successfully" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete media item" }, { status: 500 });
  }
}

