"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/format";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

/** Scroll-triggered fade-up. Skips motion when prefers-reduced-motion is on. */
export function FadeIn({
  children,
  className,
  y = 24,
  delay = 0,
}: FadeInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
