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

export function getFeaturedProject(): Project | undefined {
  const { featuredSlug, projects } = portfolio;
  return projects.find((project) => project.slug === featuredSlug) ?? projects[0];
}

export function getGridProjects(): Project[] {
  const featured = getFeaturedProject();
  if (!featured) {
    return portfolio.projects.slice(0, MAX_GRID_PROJECTS);
  }

  return portfolio.projects
    .filter((project) => project.slug !== featured.slug)
    .slice(0, MAX_GRID_PROJECTS);
}
