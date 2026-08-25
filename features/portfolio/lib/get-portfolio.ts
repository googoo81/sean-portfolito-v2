import { portfolio } from "@/features/portfolio/data/portfolio";
import type { Portfolio, Project } from "@/features/portfolio/types";

const MAX_GRID_PROJECTS = 4;

/** Server-side portfolio accessor. Swap implementation later for CMS/API. */
export function getPortfolio(): Portfolio {
  return portfolio;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}

type ProjectCollection = Pick<Portfolio, "featuredSlug" | "projects">;

export function getFeaturedProject({
  featuredSlug,
  projects,
}: ProjectCollection): Project | undefined {
  return projects.find((project) => project.slug === featuredSlug) ?? projects[0];
}

export function getGridProjects(source: ProjectCollection): Project[] {
  const featured = getFeaturedProject(source);
  if (!featured) {
    return source.projects.slice(0, MAX_GRID_PROJECTS);
  }

  return source.projects
    .filter((project) => project.slug !== featured.slug)
    .slice(0, MAX_GRID_PROJECTS);
}
