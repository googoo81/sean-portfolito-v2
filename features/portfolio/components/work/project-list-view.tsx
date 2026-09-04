"use client";

import { useMemo, useState } from "react";
import { ProjectTileCompact } from "@/features/portfolio/components/home/projects/project-tile-compact";
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

const KIND_OPTIONS: { id: ProjectKindFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "team", label: "팀" },
  { id: "personal", label: "개인" },
];

const SORT_OPTIONS: { id: ProjectSort; label: string }[] = [
  { id: "newest", label: "최신순" },
  { id: "oldest", label: "오래된순" },
];

export function ProjectListBody({
  projects,
  onSelect,
}: Pick<ProjectListViewProps, "projects" | "onSelect">) {
  const [kind, setKind] = useState<ProjectKindFilter>("all");
  const [sort, setSort] = useState<ProjectSort>("newest");
  const visible = useMemo(
    () => filterAndSortProjects(projects, kind, sort),
    [kind, projects, sort],
  );

  return (
    <div className="projects-overlay__detail projects-overlay__list">
      <div className="projects-overlay__toolbar">
        <div
          className="projects-overlay__filters"
          role="radiogroup"
          aria-label="프로젝트 유형"
        >
          {KIND_OPTIONS.map((option) => (
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
          aria-label="정렬"
        >
          {SORT_OPTIONS.map((option) => (
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
        <p className="projects-overlay__empty">해당하는 프로젝트가 없습니다.</p>
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
