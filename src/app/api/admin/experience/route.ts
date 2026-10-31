import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const experiences = await db.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, experiences });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { organization, role, type, startDate, endDate, isCurrent, description, responsibilities, technologies, order } = body;

    const computedDuration = `${startDate || "2024"} – ${isCurrent ? "Present" : (endDate || "Present")}`;

    const newExp = await db.experience.create({
      data: {
        organization,
        role,
        type: type || "PROFESSIONAL",
        duration: computedDuration,
        startDate: startDate || null,
        endDate: isCurrent ? null : endDate,
        isCurrent: Boolean(isCurrent),
        description: description || "",
        responsibilities: JSON.stringify(Array.isArray(responsibilities) ? responsibilities : (responsibilities || "").split("\n").filter(Boolean)),
        technologies: JSON.stringify(Array.isArray(technologies) ? technologies : (technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean)),
        order: Number(order) || 0,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, experience: newExp }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, organization, role, type, startDate, endDate, isCurrent, description, responsibilities, technologies, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const computedDuration = `${startDate || "2024"} – ${isCurrent ? "Present" : (endDate || "Present")}`;

    const updated = await db.experience.update({
      where: { id },
      data: {
        organization,
        role,
        type,
        duration: computedDuration,
        startDate: startDate || null,
        endDate: isCurrent ? null : endDate,
        isCurrent: Boolean(isCurrent),
        description,
        responsibilities: JSON.stringify(Array.isArray(responsibilities) ? responsibilities : (responsibilities || "").split("\n").filter(Boolean)),
        technologies: JSON.stringify(Array.isArray(technologies) ? technologies : (technologies || "").split(",").map((s: string) => s.trim()).filter(Boolean)),
        order: Number(order),
      },
    });

    return NextResponse.json({ success: true, experience: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update experience" }, { status: 500 });
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

    await db.experience.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete experience" }, { status: 500 });
  }
}

