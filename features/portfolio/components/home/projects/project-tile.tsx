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
import { GoArrow } from "./go-arrow";
import type { Project } from "@/features/portfolio/types";

type ProjectTileProps = {
  project: Project;
  className?: string;
};

function multiplierOf(before: string, after: string) {
  const from = Number.parseFloat(before);
  const to = Number.parseFloat(after);
  if (!Number.isFinite(from) || !Number.isFinite(to) || from <= 0) {
    return null;
  }
  return (to / from).toFixed(1);
}

function OpenMark({ chip = false }: { chip?: boolean }) {
  if (chip) {
    return (
      <span className="project-tile__open--chip bento-projects__go" aria-hidden="true">
        <span className="bento-projects__go-icons">
          <GoArrow />
          <GoArrow />
        </span>
      </span>
    );
  }

  return (
    <span className="project-tile__open" aria-hidden="true">
      <GoArrow />
    </span>
  );
}

export function ProjectTile({ project, className }: ProjectTileProps) {
  const ui = useUi();
  const cardRef = useRef<HTMLButtonElement>(null);
  const { open, openProjects } = useProjectsSession();
  const stat = project.featuredStat;
  const multiplier = stat ? multiplierOf(stat.before, stat.after) : null;
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
            {stat ? null : <OpenMark />}
          </p>
        </div>
        {stat ? <OpenMark chip /> : null}
        {stat ? (
          <div className="project-tile__chart">
            <div className="project-tile__stat-head">
              <div className="project-tile__stat-copy">
                <p className="project-tile__stat-label">{stat.label}</p>
                <div className="project-tile__stat-figure">
                  <p className="project-tile__stat-value">{stat.after}</p>
                  {multiplier ? (
                    <p className="project-tile__stat-multiple">
                      {ui.rateFold(multiplier)}
                    </p>
                  ) : null}
                </div>
              </div>
              <p className="project-tile__stat-lead">{stat.lead}</p>
            </div>
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
