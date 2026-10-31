import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "pill";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-canvas-dark text-white hover:bg-neutral-800 shadow-md hover:shadow-lg dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
      secondary:
        "bg-peach-100 text-canvas-dark hover:bg-peach-200 border border-peach-200/60 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
      glass:
        "glass-island text-foreground hover:bg-white/80 hover:border-white shadow-sm hover:shadow",
      outline:
        "border border-neutral-300 bg-transparent hover:bg-neutral-100/50 text-foreground dark:border-neutral-700 dark:hover:bg-neutral-800",
      ghost: "hover:bg-neutral-200/50 text-foreground dark:hover:bg-neutral-800",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-full gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-full gap-2",
      lg: "text-base px-7 py-3 rounded-full gap-2.5",
      pill: "text-xs uppercase tracking-wider px-3.5 py-1 rounded-full font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

