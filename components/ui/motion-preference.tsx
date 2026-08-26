"use client";

import { useEffect } from "react";
import { readLiteMotion } from "@/lib/use-lite-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function MotionPreference() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = reduced ? "true" : "false";
    document.documentElement.dataset.liteMotion = readLiteMotion()
      ? "true"
      : "false";
  }, [reduced]);

  return null;
}
