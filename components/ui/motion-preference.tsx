"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function MotionPreference() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";
  }, [reduced]);

  return null;
}
