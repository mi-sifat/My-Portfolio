"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export type AnimationVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = "slide-up",
  delay = 0,
  duration = 0.55,
  className = "",
  distance = 28,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (variant) {
      case "fade":
        return { opacity: 0 };
      case "slide-up":
        return { opacity: 0, y: distance };
      case "slide-down":
        return { opacity: 0, y: -distance };
      case "slide-left":
        return { opacity: 0, x: distance };
      case "slide-right":
        return { opacity: 0, x: -distance };
      case "scale-up":
        return { opacity: 0, scale: 0.96, y: distance / 2 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimate = () => {
    switch (variant) {
      case "scale-up":
        return { opacity: 1, scale: 1, y: 0 };
      default:
        return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Smooth bespoke ease curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

