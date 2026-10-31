import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signSessionToken, COOKIE_NAME } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "localhost";
    if (isRateLimited(`login:${ip}`, 5, 60000)) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Please wait 1 minute before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email and password" },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Look up user in database
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Sign session token
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Record audit log
    try {
      await db.auditLog.create({
        data: {
          action: "ADMIN_LOGIN",
          entity: "User",
          entityId: user.id,
          userId: user.id,
          metadata: JSON.stringify({ ip: request.headers.get("x-forwarded-for") || "localhost" }),
        },
      });
    } catch {
      // Non-fatal if audit logging encounters a glitch
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login authentication error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error occurred" },
      { status: 500 }
    );
  }
}

