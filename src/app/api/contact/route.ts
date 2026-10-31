import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "localhost";
    if (isRateLimited(`contact:${ip}`, 5, 60000)) {
      return NextResponse.json(
        { success: false, message: "Too many messages sent. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const validatedData = contactFormSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validatedData.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validatedData.data;

    // Save to Database
    const savedMessage = await db.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        isRead: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you, Sifat has received your message! We will get back to you shortly.",
        id: savedMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit message. Please try again later or reach out directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}

