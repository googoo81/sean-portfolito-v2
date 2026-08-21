"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import type { Project } from "@/features/portfolio/types";

type WorksGridProps = {
  projects: Project[];
};

/** Visual-first stack — title sits on/under the image, not a CV entry */
export function WorksGrid({ projects }: WorksGridProps) {
  return (
    <section id="works" className="space-y-8 pt-6 sm:space-y-12 sm:pt-8">
      {projects.map((project, index) => (
        <FadeIn key={project.id} delay={index * 0.05}>
          <Link
            href={`/work/${project.id}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <div className="relative overflow-hidden rounded-sm">
              <MediaPlaceholder
                label={project.media.coverLabel}
                aspect={index === 0 ? "wide" : "video"}
                className="min-h-[260px] border-0 transition duration-500 group-hover:scale-[1.02] sm:min-h-[420px]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                {project.shortTitle}
              </p>
              <ul className="hidden flex-wrap justify-end gap-x-3 text-[11px] tracking-wide text-muted sm:flex">
                {project.media.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Link>
        </FadeIn>
      ))}
    </section>
  );
}
