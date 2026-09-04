import type { Project } from "@/features/portfolio/types";

export type ProjectKindFilter = "all" | "team" | "personal";
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

  const label = projectKindLabel(project.meta);
  if (kind === "team") {
    return label.startsWith("팀");
  }
  return label.startsWith("개인");
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
