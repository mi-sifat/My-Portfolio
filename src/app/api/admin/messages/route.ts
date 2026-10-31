import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, messages });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, isRead } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: { isRead: Boolean(isRead) },
    });

    return NextResponse.json({ success: true, message: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update message" }, { status: 500 });
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

    await db.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete message" }, { status: 500 });
  }
}
