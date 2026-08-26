"use client";

import { useSyncExternalStore } from "react";

const LOW_MEMORY_GB = 4;

type NavigatorWithBudget = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

export function readLiteMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const navigatorWithBudget = navigator as NavigatorWithBudget;
  if (
    typeof navigatorWithBudget.deviceMemory === "number" &&
    navigatorWithBudget.deviceMemory <= LOW_MEMORY_GB
  ) {
    return true;
  }

  return Boolean(navigatorWithBudget.connection?.saveData);
}

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

export function useLiteMotion() {
  return useSyncExternalStore(subscribe, readLiteMotion, () => false);
}
