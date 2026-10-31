import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSession } from "@/lib/auth";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await db.product.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, products });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, slug, shortDesc, fullDesc, category, status, price, demoUrl, order } = body;

    const newPrd = await db.product.create({
      data: {
        name,
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        shortDesc,
        fullDesc: fullDesc || shortDesc,
        category: category || "Digital Template",
        status: status || "Coming Soon",
        price: price || null,
        demoUrl: demoUrl || null,
        features: JSON.stringify([]),
        galleryUrls: JSON.stringify([]),
        order: Number(order) || 0,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, product: newPrd }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, slug, shortDesc, fullDesc, category, status, price, demoUrl, order } = body;

    const updated = await db.product.update({
      where: { id },
      data: {
        name,
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        shortDesc,
        fullDesc,
        category,
        status,
        price,
        demoUrl,
        order: Number(order),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    await db.product.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 });
  }
}

