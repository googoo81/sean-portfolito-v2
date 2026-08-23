"use client";

import { useEffect, useRef } from "react";
import { WorkCover } from "./work-cover";
import { usePrefersReducedMotion } from "@/features/portfolio/hooks";
import type { Project } from "@/features/portfolio/types";
import { cn } from "@/lib/format";

type WorkItemProps = {
  project: Project;
  index: number;
};

export function WorkItem({ project, index }: WorkItemProps) {
  const reduced = usePrefersReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imageLeft = index % 2 === 1;

  useEffect(() => {
    const node = visualRef.current;
    if (!node) {
      return;
    }

    if (reduced) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <a
      href={`#project-${project.slug}`}
      className="group relative grid grid-cols-12 items-center gap-x-6 gap-y-8"
      onPointerMove={(event) => {
        const preview = previewRef.current;
        if (!preview || reduced) {
          return;
        }
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          return;
        }

        preview.style.opacity = "1";
        preview.style.transform = `translate3d(${event.clientX + 18}px, ${event.clientY - 72}px, 0)`;
      }}
      onPointerLeave={() => {
        const preview = previewRef.current;
        if (preview) {
          preview.style.opacity = "0";
        }
      }}
      onClick={() => {
        const preview = previewRef.current;
        if (preview) {
          preview.style.opacity = "0";
        }
      }}
    >
      <div
        className={cn(
          "col-span-12 lg:col-span-5",
          imageLeft ? "lg:col-start-8 lg:row-start-1" : "lg:col-start-1",
        )}
      >
        <p className="font-display text-xs tracking-[0.28em] text-muted">
          {project.number}
        </p>
        <h3 className="work-title font-display mt-4 text-[clamp(2rem,4.6vw,4.4rem)] leading-[0.92] font-bold tracking-tight">
          {project.shortName}
        </h3>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
          {project.tagline}
        </p>
        <p className="mt-6 font-display text-[11px] tracking-[0.18em] text-foreground/70 uppercase">
          {project.disciplines.join(" / ")}
        </p>
      </div>

      <div
        ref={visualRef}
        className={cn(
          "work-reveal col-span-12 aspect-4/5 sm:aspect-5/4 lg:col-span-7 lg:aspect-4/3",
          imageLeft ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6",
        )}
      >
        <WorkCover project={project} className="h-full min-h-0" />
      </div>

      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-50 hidden w-44 overflow-hidden border border-line bg-background opacity-0 shadow-[0_16px_40px_rgba(20,19,17,0.12)] transition-opacity duration-300 will-change-transform lg:block"
      >
        <div className="aspect-4/5">
          <WorkCover project={project} className="min-h-0" />
        </div>
        <div className="space-y-1 p-3">
          <p className="font-display text-[10px] tracking-[0.18em] text-muted uppercase">
            {project.period}
          </p>
          <p className="line-clamp-3 text-[11px] leading-snug text-foreground">
            {project.title}
          </p>
        </div>
      </div>
    </a>
  );
}
