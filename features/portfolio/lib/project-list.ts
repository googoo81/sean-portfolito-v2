import type { Project, ProjectKind } from "@/features/portfolio/types";

export type ProjectKindFilter = "all" | ProjectKind;
export type ProjectSort = "newest" | "oldest";

export function projectKindLabel(meta: string) {
  return meta.split("|")[0]?.trim() ?? "";
}

export function matchesKindFilter(
  project: Project,
  kind: ProjectKindFilter,
) {
  if (kind === "all") {
    return true;
  }

  return project.kind === kind;
}

export function filterAndSortProjects(
  projects: readonly Project[],
  kind: ProjectKindFilter,
  sort: ProjectSort,
) {
  const filtered = projects.filter((project) =>
    matchesKindFilter(project, kind),
  );

  return filtered.sort((a, b) =>
    sort === "newest"
      ? b.period.localeCompare(a.period)
      : a.period.localeCompare(b.period),
  );
}
