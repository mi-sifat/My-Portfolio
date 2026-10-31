import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only PNG, JPEG, WEBP, GIF, and SVG images are supported." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File exceeds 15MB size limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Read image dimensions via Sharp
    let width: number | null = null;
    let height: number | null = null;

    if (file.type !== "image/svg+xml") {
      try {
        const metadata = await sharp(buffer).metadata();
        width = metadata.width || null;
        height = metadata.height || null;
      } catch {
        // SVG or unparseable metadata fallback
      }
    }

    // Generate safe unique filename
    const ext = path.extname(file.name) || ".png";
    const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9]/g, "-");
    const uniqueKey = `${Date.now()}-${baseName}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    const fullPath = path.join(uploadDir, uniqueKey);
    await fs.writeFile(fullPath, buffer);

    const publicUrl = `/uploads/${uniqueKey}`;

    // Record in database
    const mediaItem = await db.mediaItem.create({
      data: {
        fileName: file.name,
        storageKey: uniqueKey,
        url: publicUrl,
        mimeType: file.type,
        sizeBytes: file.size,
        width,
        height,
        altText: altText || file.name,
        uploadedById: session.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        media: mediaItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process image upload" },
      { status: 500 }
    );
  }
}

