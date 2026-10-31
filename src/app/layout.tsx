import type { Metadata } from "next";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { JsonLd } from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://majharulislamsifat.com"),
  title: {
    default: "Majharul Islam Sifat — Junior Software Engineer & Content Creator",
    template: "%s | Majharul Islam Sifat",
  },
  description:
    "Official portfolio of Majharul Islam Sifat: Junior Software Engineer at Archgig, CST Diploma student, MERN developer, and digital content creator based in Dhaka, Bangladesh.",
  keywords: [
    "Majharul Islam Sifat",
    "Junior Software Engineer",
    "Archgig",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer Bangladesh",
    "Content Creator",
    "Food Blogger Dhaka",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Majharul Islam Sifat", url: "https://majharulislamsifat.com" }],
  creator: "Majharul Islam Sifat",
  openGraph: {
    title: "Majharul Islam Sifat — Junior Software Engineer & Content Creator",
    description:
      "Explore software engineering projects, verified skills, YouTube food/travel vlogs, and client services by Majharul Islam Sifat.",
    url: "https://majharulislamsifat.com",
    siteName: "Majharul Islam Sifat Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/personal/profile-portrait.png",
        width: 800,
        height: 1000,
        alt: "Majharul Islam Sifat - Professional Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Majharul Islam Sifat — Developer & Creator",
    description: "Junior Software Engineer at Archgig, MERN developer, and digital content creator.",
    images: ["/assets/personal/profile-portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-peach-200 selection:text-canvas-dark">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
