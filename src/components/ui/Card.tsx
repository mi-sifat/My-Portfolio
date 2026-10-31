import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "bordered";
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "glass",
  hoverEffect = true,
  children,
  ...props
}) => {
  const variants = {
    glass: "glass-card",
    solid: "bg-white dark:bg-canvas-charcoal border border-neutral-200/70 dark:border-neutral-800",
    bordered: "border border-neutral-300/80 dark:border-neutral-800 bg-transparent",
  };

  return (
    <div
      className={cn(
        "rounded-3xl p-6 sm:p-8 transition-all duration-300",
        variants[variant],
        hoverEffect && "hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

