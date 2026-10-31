"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  GraduationCap,
  Briefcase,
  Video,
  Layers,
  ShoppingBag,
  Award,
  Mail,
  User,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Profile & Bio", href: "/admin/profile", icon: User },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Skills", href: "/admin/skills", icon: Cpu },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "YouTube Videos", href: "/admin/youtube", icon: Video },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Products", href: "/admin/products", icon: ShoppingBag },
  { name: "Achievements", href: "/admin/achievements", icon: Award },
  { name: "Inquiries", href: "/admin/messages", icon: Mail },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, render clean layout without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to sign out of the Admin CMS?")) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-50/60 dark:bg-canvas-dark text-foreground flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-white/80 dark:bg-canvas-charcoal/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-accent-ember text-white font-display font-extrabold flex items-center justify-center text-xs">
            MIS
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none">CMS Portal</p>
            <p className="text-[10px] font-mono text-foreground/50">Admin Workspace</p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-warm-100 dark:bg-neutral-800 text-foreground"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Navigation (Sticky on desktop, independent scroll) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 dark:bg-canvas-charcoal/95 backdrop-blur-xl border-r border-neutral-200/80 dark:border-neutral-800/80 flex flex-col transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 md:h-screen md:shrink-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-neutral-200/70 dark:border-neutral-800/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-accent-ember text-white font-display font-extrabold flex items-center justify-center text-xs shadow-md shadow-accent-ember/25">
              MIS
            </div>
            <div>
              <p className="font-display text-sm font-bold leading-none">Admin CMS</p>
              <p className="text-[10px] font-mono text-foreground/50 mt-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Database
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-foreground/60 hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-accent-ember text-white shadow-md shadow-accent-ember/20 font-semibold"
                    : "text-foreground/70 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-foreground/50"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Card & Logout Bottom Area */}
        <div className="p-4 border-t border-neutral-200/70 dark:border-neutral-800/70 space-y-2.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-foreground/70 hover:text-foreground hover:bg-warm-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-accent-ember" />
              View Live Website
            </span>
            <span className="text-[10px] font-mono text-foreground/40">New Tab</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/50 dark:bg-canvas-charcoal/50 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground/50">
              Admin Workspace
            </span>
            <span className="text-foreground/30">/</span>
            <span className="text-xs font-medium text-foreground">
              {NAV_ITEMS.find((item) =>
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
              )?.name || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-warm-100 dark:bg-neutral-800 hover:bg-warm-200 dark:hover:bg-neutral-700 transition-colors text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5 text-accent-ember" />
              <span>Preview Live Site</span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-neutral-200 dark:border-neutral-800">
              <div className="h-7 w-7 rounded-full bg-peach-200 dark:bg-peach-900/40 text-accent-ember flex items-center justify-center font-display text-xs font-bold">
                S
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold leading-none text-foreground">
                  Majharul Islam Sifat
                </p>
                <p className="text-[10px] text-foreground/50 leading-tight">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
