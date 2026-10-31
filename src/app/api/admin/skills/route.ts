import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const skills = await db.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, skills });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, level, order, isPublished } = body;

    if (!name) {
      return NextResponse.json({ success: false, message: "Skill name is required" }, { status: 400 });
    }

    const newSkill = await db.skill.create({
      data: {
        name,
        category: category || "DEVELOPMENT",
        level: level || "Proficient",
        order: Number(order) || 0,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
    });

    return NextResponse.json({ success: true, skill: newSkill }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create skill" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, category, level, order, isPublished } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Skill ID is required" }, { status: 400 });
    }

    const updated = await db.skill.update({
      where: { id },
      data: {
        name,
        category,
        level,
        order: Number(order),
        isPublished: Boolean(isPublished),
      },
    });

    return NextResponse.json({ success: true, skill: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update skill" }, { status: 500 });
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
      return NextResponse.json({ success: false, message: "Skill ID is required" }, { status: 400 });
    }

    await db.skill.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete skill" }, { status: 500 });
  }
}

