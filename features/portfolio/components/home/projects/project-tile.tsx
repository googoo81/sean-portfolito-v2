"use client";

import { useRef } from "react";
import { BentoCard } from "@/components/ui";
import { useUi } from "@/features/portfolio/i18n";
import { DeviceMockup } from "../../shared/device-mockup";
import { FeaturedRateChart } from "./featured-rate-chart";
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
  const ui = useUi();
  const cardRef = useRef<HTMLButtonElement>(null);
  const { open, openProjects } = useProjectsSession();
  const stat = project.featuredStat;
  const openLabel = stat
    ? `${ui.openProjectAria(project.shortTitle)}. ${stat.lead} ${stat.label} ${stat.before} → ${stat.after}`
    : ui.openProjectAria(project.shortTitle);

  return (
    <BentoCard as="article" className={className}>
      <button
        ref={cardRef}
        type="button"
        aria-label={openLabel}
        aria-expanded={open}
        data-projects-origin="featured"
        className={stat ? "project-tile project-tile--chart" : "project-tile"}
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
        <div className="project-tile__copy">
          <p className="project-tile__kicker">{project.period}</p>
          <p className="project-tile__title">
            {project.shortTitle}
            <span className="project-tile__open" aria-hidden="true">
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
            </span>
          </p>
        </div>
        {stat ? (
          <div className="project-tile__chart">
            <p className="project-tile__stat-label">{stat.label}</p>
            <FeaturedRateChart stat={stat} />
          </div>
        ) : (
          <div className="project-tile__body">
            <DeviceMockup project={project} />
          </div>
        )}
      </button>
    </BentoCard>
  );
}
