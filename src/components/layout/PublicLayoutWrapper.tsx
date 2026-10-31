"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { LiquidGlassNavbar } from "@/components/layout/LiquidGlassNavbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopAndProgress } from "@/components/shared/ScrollToTopAndProgress";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // In Admin CMS, do not render public navbar, footer, or pt-24 padding
    return <>{children}</>;
  }

  return (
    <>
      <LiquidGlassNavbar />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
      <ScrollToTopAndProgress />
    </>
  );
}

