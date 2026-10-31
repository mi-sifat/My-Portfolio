"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxHeroProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  children,
  offset = 35,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

