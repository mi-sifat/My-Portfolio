import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await db.siteSetting.findFirst();
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const existing = await db.siteSetting.findFirst();

    if (!existing) {
      return NextResponse.json({ success: false, message: "Settings not found" }, { status: 404 });
    }

    const updated = await db.siteSetting.update({
      where: { id: existing.id },
      data: {
        siteName: body.siteName || existing.siteName,
        metaTitle: body.metaTitle || existing.metaTitle,
        metaDesc: body.metaDesc || existing.metaDesc,
        keywords: body.keywords || existing.keywords,
        footerText: body.footerText || existing.footerText,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 });
  }
}

