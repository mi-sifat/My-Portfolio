import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const education = await db.education.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, education });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { institution, degree, department, board, gpa, duration, description, order } = body;

    const newEdu = await db.education.create({
      data: {
        institution,
        degree,
        department: department || null,
        board: board || null,
        gpa: gpa || null,
        duration,
        description: description || null,
        order: Number(order) || 0,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, education: newEdu }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create education" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, institution, degree, department, board, gpa, duration, description, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const updated = await db.education.update({
      where: { id },
      data: {
        institution,
        degree,
        department,
        board,
        gpa,
        duration,
        description,
        order: Number(order),
      },
    });

    return NextResponse.json({ success: true, education: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update education" }, { status: 500 });
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

    await db.education.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Education deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete education" }, { status: 500 });
  }
}

