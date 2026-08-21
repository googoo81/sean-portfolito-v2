"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/** Syncs prefers-reduced-motion to a document data attribute for CSS. */
export function MotionPreference() {
  const reduced = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";
  }, [reduced]);

  return null;
}
