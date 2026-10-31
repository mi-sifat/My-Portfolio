"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopAndProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }

      setVisible(currentScroll > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  // SVG circular progress calculation
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-40 transition-all duration-300 animate-in fade-in zoom-in-75">
      <button
        onClick={scrollToTop}
        className="relative grid h-11 w-11 place-items-center rounded-full bg-white/90 dark:bg-canvas-charcoal/90 backdrop-blur-md text-foreground shadow-lg border border-neutral-200/80 dark:border-neutral-700 hover:scale-110 active:scale-95 transition-all group"
        aria-label="Scroll back to top"
        title="Scroll back to top"
      >
        {/* Progress Ring */}
        <svg className="absolute inset-0 h-11 w-11 -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            className="text-neutral-200 dark:text-neutral-800"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-accent-ember transition-all duration-150"
          />
        </svg>

        <ArrowUp className="h-4 w-4 relative z-10 text-foreground group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}

