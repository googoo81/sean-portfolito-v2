import { portfolios } from "@/features/portfolio/data";
import type { Portfolio, Project } from "@/features/portfolio/types";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locale";

function sortProjectsNewestFirst(projects: readonly Project[]): Project[] {
  return [...projects].sort((a, b) => b.period.localeCompare(a.period));
}

/** Server-side portfolio accessor. Swap implementation later for CMS/API. */
export function getPortfolio(locale: Locale = DEFAULT_LOCALE): Portfolio {
  const portfolio = portfolios[locale];
  return {
    ...portfolio,
    projects: sortProjectsNewestFirst(portfolio.projects),
  };
}

export function getProjectBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): Project | undefined {
  return portfolios[locale].projects.find((project) => project.slug === slug);
}

export function getFeaturedProject({
  featuredSlug,
  projects,
}: Pick<Portfolio, "featuredSlug" | "projects">): Project | undefined {
  return projects.find((project) => project.slug === featuredSlug) ?? projects[0];
}
