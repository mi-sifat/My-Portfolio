import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await db.profile.findFirst();
    return NextResponse.json({ success: true, profile });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const existing = await db.profile.findFirst();

    if (!existing) {
      return NextResponse.json({ success: false, message: "No profile found to update" }, { status: 404 });
    }

    const updated = await db.profile.update({
      where: { id: existing.id },
      data: {
        fullName: body.fullName || existing.fullName,
        tagline: body.tagline || existing.tagline,
        shortBio: body.shortBio || existing.shortBio,
        aboutIntro: body.aboutIntro || existing.aboutIntro,
        aboutStory: body.aboutStory || existing.aboutStory,
        email: body.email || existing.email,
        whatsapp: body.whatsapp || existing.whatsapp,
        location: body.location || existing.location,
        resumeUrl: body.resumeUrl !== undefined ? body.resumeUrl : existing.resumeUrl,
      },
    });

    return NextResponse.json({ success: true, profile: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 });
  }
}

