"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Content", href: "/youtube" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const LiquidGlassNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-6 pointer-events-none">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Primary Navigation"
          className={cn(
            "glass-island pointer-events-auto relative flex items-center justify-between rounded-full px-4 py-2 sm:px-6 transition-all duration-500",
            isScrolled ? "shadow-lg bg-opacity-90" : "bg-opacity-75"
          )}
        >
          {/* Brand Logo / Monogram (Left) */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:ring-2 rounded-full z-10"
            aria-label="Home"
          >
            <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-canvas-dark text-white dark:bg-white dark:text-neutral-900 font-display text-xs font-bold transition-transform duration-300 group-hover:scale-105 shrink-0">
              MIS
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-foreground lg:inline-block">
              Majharul Islam Sifat
            </span>
          </Link>

          {/* Centered Bold Name on Mobile/Tablet */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden pointer-events-none text-center">
            <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-foreground whitespace-nowrap">
              Majharul Islam Sifat
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                      isActive
                        ? "bg-canvas-dark text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Call to Action & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-peach-100 hover:bg-peach-200 border border-peach-200/70 text-canvas-dark px-4 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105"
            >
              Let&apos;s Connect
              <ArrowUpRight className="h-3.5 w-3.5 text-accent-ember" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-8 w-8 place-items-center rounded-full text-foreground hover:bg-neutral-200/50 lg:hidden focus-visible:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="glass-card pointer-events-auto mt-2 rounded-3xl p-5 lg:hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <ul className="grid gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-canvas-dark text-white dark:bg-white dark:text-neutral-900"
                          : "text-foreground/70 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-neutral-200/50 dark:border-neutral-800">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-canvas-dark text-white text-xs font-semibold"
                >
                  Let&apos;s Connect
                  <ArrowUpRight className="h-3.5 w-3.5 text-accent-ember" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

