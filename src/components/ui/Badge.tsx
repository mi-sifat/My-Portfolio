import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "peach" | "ember" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  children,
  ...props
}) => {
  const variants = {
    neutral:
      "bg-neutral-100 text-neutral-800 border border-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700",
    peach:
      "bg-peach-100 text-peach-500 border border-peach-200 dark:bg-peach-500/10 dark:text-peach-300 dark:border-peach-500/20",
    ember:
      "bg-accent-ember/10 text-accent-ember border border-accent-ember/20",
    outline:
      "border border-neutral-300/80 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

