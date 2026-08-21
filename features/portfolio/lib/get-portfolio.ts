import { portfolio } from "@/features/portfolio/data/portfolio";
import type { Portfolio, Project } from "@/features/portfolio/types";

export function getPortfolio(): Portfolio {
  return portfolio;
}

export function getProjects(): Project[] {
  return portfolio.projects;
}

export function getProjectById(id: string): Project | undefined {
  return portfolio.projects.find((project) => project.id === id);
}

export function getProjectIds(): string[] {
  return portfolio.projects.map((project) => project.id);
}
