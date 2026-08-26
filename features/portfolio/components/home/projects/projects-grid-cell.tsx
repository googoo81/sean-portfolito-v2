"use client";

import { useRef } from "react";
import { BentoCard } from "@/components/ui";
import {
  prefetchProjectsOverlay,
  useProjectsSession,
} from "./projects-session";
import { readProjectsOrigin } from "./projects-origin";

type ProjectsGridCellProps = {
  className?: string;
};

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

export function ProjectsGridCell({ className }: ProjectsGridCellProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { open, openProjects } = useProjectsSession();

  return (
    <BentoCard className={className}>
      <button
        ref={cardRef}
        type="button"
        aria-label="모든 프로젝트"
        aria-expanded={open}
        data-projects-origin="cell"
        className="projects-cell"
        onPointerEnter={prefetchProjectsOverlay}
        onFocus={prefetchProjectsOverlay}
        onClick={() => {
          const origin = readProjectsOrigin(cardRef.current);
          if (!origin) {
            return;
          }

          openProjects({ origin });
        }}
      >
        <p className="project-kicker">💻 Projects.</p>
        <span className="bento-projects__go" aria-hidden>
          <span className="bento-projects__go-icons">
            <GoArrow />
            <GoArrow />
          </span>
        </span>
      </button>
    </BentoCard>
  );
}
