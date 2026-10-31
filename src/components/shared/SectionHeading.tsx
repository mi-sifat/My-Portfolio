import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  italicWord,
  subtitle,
  align = "center",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-peach-100 text-canvas-dark border border-peach-200/80 dark:bg-peach-500/10 dark:text-peach-300 dark:border-peach-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-ember animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
        {title}{" "}
        {italicWord && (
          <span className="font-serif italic font-normal text-peach-500 dark:text-peach-400">
            {italicWord}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-foreground/60 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};

