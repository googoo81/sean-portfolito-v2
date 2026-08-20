"use client";

import { NAV_ITEMS } from "@/features/portfolio/constants";
import { useActiveSection } from "@/features/portfolio/hooks";
import { cn } from "@/lib/format";

const OBSERVED_SECTION_IDS = NAV_ITEMS.map((item) => item.sectionId);

type SiteNavProps = {
  brandName: string;
};

export function SiteNav({ brandName }: SiteNavProps) {
  const activeId = useActiveSection(OBSERVED_SECTION_IDS);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {brandName}
        </a>
        <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs text-muted sm:text-sm">
          {NAV_ITEMS.map((link) => {
            const isActive = activeId === link.sectionId;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "transition-colors hover:text-accent",
                    isActive && "font-medium text-accent",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
