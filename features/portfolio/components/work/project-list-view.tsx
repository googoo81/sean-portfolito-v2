"use client";

import { useMemo, useState } from "react";
import { ProjectTileCompact } from "@/features/portfolio/components/home/projects/project-tile-compact";
import { useUi } from "@/features/portfolio/i18n";
import { cn } from "@/lib/format";
import {
  filterAndSortProjects,
  type ProjectKindFilter,
  type ProjectSort,
} from "@/features/portfolio/lib/project-list";
import { ProjectsSplitShell } from "./projects-split-shell";
import type { Project } from "@/features/portfolio/types";

type ProjectListViewProps = {
  projects: readonly Project[];
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
};

export function ProjectListBody({
  projects,
  onSelect,
  initialKind = "all",
}: Pick<ProjectListViewProps, "projects" | "onSelect"> & {
  initialKind?: ProjectKindFilter;
}) {
  const ui = useUi();
  const [kind, setKind] = useState<ProjectKindFilter>(initialKind);
  const [sort, setSort] = useState<ProjectSort>("newest");
  const visible = useMemo(
    () => filterAndSortProjects(projects, kind, sort),
    [kind, projects, sort],
  );

  const kindOptions: { id: ProjectKindFilter; label: string }[] = [
    { id: "all", label: ui.projectFilter.all },
    { id: "team", label: ui.projectFilter.team },
    { id: "personal", label: ui.projectFilter.personal },
  ];

  const sortOptions: { id: ProjectSort; label: string }[] = [
    { id: "newest", label: ui.projectFilter.newest },
    { id: "oldest", label: ui.projectFilter.oldest },
  ];

  return (
    <div className="projects-overlay__detail projects-overlay__list">
      <div className="projects-overlay__toolbar">
        <div
          className="projects-overlay__filters"
          role="radiogroup"
          aria-label={ui.projectFilter.kindAria}
        >
          {kindOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={kind === option.id}
              className={cn(
                "projects-overlay__filter glass-chip",
                kind === option.id && "is-active",
              )}
              onClick={() => setKind(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div
          className="projects-overlay__filters"
          role="radiogroup"
          aria-label={ui.projectFilter.sortAria}
        >
          {sortOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={sort === option.id}
              className={cn(
                "projects-overlay__filter glass-chip",
                sort === option.id && "is-active",
              )}
              onClick={() => setSort(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {visible.length > 0 ? (
        visible.map((project) => (
          <ProjectTileCompact
            key={project.slug}
            project={project}
            onSelect={onSelect}
          />
        ))
      ) : (
        <p className="projects-overlay__empty">{ui.projectFilter.empty}</p>
      )}
    </div>
  );
}

export function ProjectListView({
  projects,
  onSelect,
  onBackToList,
}: ProjectListViewProps) {
  return (
    <ProjectsSplitShell
      projects={projects}
      onSelect={onSelect}
      onBackToList={onBackToList}
      scrollKey="list"
    >
      <ProjectListBody projects={projects} onSelect={onSelect} />
    </ProjectsSplitShell>
  );
}
