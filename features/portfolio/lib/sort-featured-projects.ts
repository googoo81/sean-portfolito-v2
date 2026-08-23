import type { Project } from "@/features/portfolio/types";

export function sortFeaturedProjects(projects: Project[]) {
  return [...projects].sort((a, b) => a.number.localeCompare(b.number));
}
