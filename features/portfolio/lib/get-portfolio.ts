import { portfolio } from "@/features/portfolio/data/portfolio";
import type { Portfolio, Project } from "@/features/portfolio/types";

/** Server-side portfolio accessor. Swap implementation later for CMS/API. */
export function getPortfolio(): Portfolio {
  return portfolio;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolio.projects.find((project) => project.slug === slug);
}
