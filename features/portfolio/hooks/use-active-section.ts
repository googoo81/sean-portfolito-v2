"use client";

import { startTransition, useEffect, useState } from "react";

type UseActiveSectionOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * Tracks which section is in view via IntersectionObserver.
 * Updates are deferred with startTransition to keep scroll smooth (React 19).
 */
export function useActiveSection(
  sectionIds: readonly string[],
  { rootMargin = "-25% 0px -55% 0px", threshold = [0, 0.25, 0.5] }: UseActiveSectionOptions = {},
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target.id) {
          return;
        }

        startTransition(() => {
          setActiveId(visible.target.id);
        });
      },
      { rootMargin, threshold },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
}
