import { portfolio } from "@/features/portfolio/data/portfolio";
import type { Portfolio, Project } from "@/features/portfolio/types";

/** Server-side portfolio accessor. Swap implementation later for CMS/API. */
export function getPortfolio(): Portfolio {
  return portfolio;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}

export function getFeaturedProject({
  featuredSlug,
  projects,
}: Pick<Portfolio, "featuredSlug" | "projects">): Project | undefined {
  return projects.find((project) => project.slug === featuredSlug) ?? projects[0];
}
