"use client";

import { FadeIn } from "@/components/ui/fade-in";

type CompaniesStripProps = {
  companies: string[];
};

export function CompaniesStrip({ companies }: CompaniesStripProps) {
  return (
    <section className="border-t border-line py-14 sm:py-16">
      <FadeIn>
        <p className="text-xs tracking-[0.16em] text-muted uppercase">
          Selected work with
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
          {companies.map((company) => (
            <li
              key={company}
              className="text-base font-medium tracking-tight text-foreground/40 sm:text-lg"
            >
              {company}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
