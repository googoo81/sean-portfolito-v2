import type { ReactNode } from "react";
import { ProjectIndex } from "./project-index";
import type { Project } from "@/features/portfolio/types";

type ProjectsSplitShellProps = {
  projects: readonly Project[];
  activeSlug?: string;
  scrollKey?: string;
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
  children: ReactNode;
};

export function ProjectsSplitShell({
  projects,
  activeSlug,
  scrollKey,
  onSelect,
  onBackToList,
  children,
}: ProjectsSplitShellProps) {
  return (
    <div className="projects-overlay__detail-layout">
      <ProjectIndex
        projects={projects}
        activeSlug={activeSlug}
        onSelect={onSelect}
        onBackToList={onBackToList}
      />
      <div className="projects-overlay__detail-scroll" key={scrollKey}>
        {children}
      </div>
    </div>
  );
}
