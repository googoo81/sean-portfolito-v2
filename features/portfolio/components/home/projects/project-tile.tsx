"use client";

import { useRef } from "react";
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

export function ProjectTile({ project, className }: ProjectTileProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { open, openProjects } = useProjectsSession();

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
      </button>
    </BentoCard>
  );
}
