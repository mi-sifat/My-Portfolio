import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const achievements = await db.achievement.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, achievements });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, organization, issueDate, category, description, order } = body;

    const newAch = await db.achievement.create({
      data: {
        title,
        organization,
        issueDate: issueDate || null,
        category: category || "Certificate",
        description: description || null,
        order: Number(order) || 0,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, achievement: newAch }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create achievement" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, organization, issueDate, category, description, order } = body;

    const updated = await db.achievement.update({
      where: { id },
      data: {
        title,
        organization,
        issueDate,
        category,
        description,
        order: Number(order),
      },
    });

    return NextResponse.json({ success: true, achievement: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update achievement" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await db.achievement.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Achievement deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete achievement" }, { status: 500 });
  }
}

