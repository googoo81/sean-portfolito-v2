"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/features/portfolio/hooks";

/** Syncs prefers-reduced-motion to a document data attribute for CSS. */
export function MotionPreference() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";
  }, [reduced]);

  return null;
}
