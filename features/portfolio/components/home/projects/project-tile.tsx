"use client";

import { useRef, type PointerEvent } from "react";
import { BentoCard } from "@/components/ui";
import { ProjectVisual } from "../../shared/project-visual";
import {
  prefetchProjectsOverlay,
  useProjectsSession,
} from "./projects-session";
import { readProjectsOrigin } from "./projects-origin";
import type { Project } from "@/features/portfolio/types";

type ProjectTileProps = {
  project: Project;
  className?: string;
};

function motionLocked() {
  const html = document.documentElement;
  return (
    html.dataset.reducedMotion === "true" ||
    html.dataset.liteMotion === "true" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function featuredCard(node: HTMLElement | null) {
  return node?.closest(".bento-featured");
}

function updateFeaturedTilt(card: HTMLElement, event: PointerEvent<HTMLElement>) {
  const rect = card.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--tilt-x", `${(-py * 7).toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${(px * 9).toFixed(2)}deg`);
  card.style.setProperty("--shift-x", `${(px * -14).toFixed(1)}px`);
  card.style.setProperty("--shift-y", `${(py * -12).toFixed(1)}px`);
}

function resetFeaturedTilt(card: HTMLElement) {
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--shift-x", "0px");
  card.style.setProperty("--shift-y", "0px");
}

function GoArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function ProjectTile({ project, className }: ProjectTileProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { open, openProjects } = useProjectsSession();

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (motionLocked()) {
      return;
    }

    const card = featuredCard(event.currentTarget);
    if (card instanceof HTMLElement) {
      updateFeaturedTilt(card, event);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    const card = featuredCard(event.currentTarget);
    if (card instanceof HTMLElement) {
      resetFeaturedTilt(card);
    }
  };

  return (
    <BentoCard as="article" className={className}>
      <button
        ref={cardRef}
        type="button"
        aria-label={`${project.shortTitle} 열기`}
        aria-expanded={open}
        data-projects-origin="featured"
        className="project-tile"
        onPointerEnter={prefetchProjectsOverlay}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onFocus={prefetchProjectsOverlay}
        onClick={() => {
          const origin = readProjectsOrigin(cardRef.current);
          if (!origin) {
            return;
          }

          openProjects({ origin, slug: project.slug });
        }}
      >
        <div className="project-tile__body">
          <ProjectVisual />
        </div>
        <p className="project-tile__title">{project.shortTitle}</p>
        <span className="bento-projects__go project-tile__go" aria-hidden>
          <span className="bento-projects__go-icons">
            <GoArrow />
            <GoArrow />
          </span>
        </span>
      </button>
    </BentoCard>
  );
}
