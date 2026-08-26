import { ProjectArticle } from "@/features/portfolio/components/work/project-article";
import { ProjectVisual } from "@/features/portfolio/components/shared/project-visual";
import { ProjectsSplitShell } from "./projects-split-shell";
import type { Project } from "@/features/portfolio/types";

type ProjectDetailViewProps = {
  project: Project;
  projects: readonly Project[];
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
};

export function ProjectDetailBody({ project }: { project: Project }) {
  return (
    <div className="projects-overlay__detail projects-overlay__article">
      <div className="glass-chip overflow-hidden rounded-[1.25rem]">
        <ProjectVisual className="projects-overlay__hero bg-transparent" />
      </div>
      <div className="glass-chip projects-overlay__article-body rounded-[1.25rem]">
        <ProjectArticle project={project} />
      </div>
    </div>
  );
}

export function ProjectDetailView({
  project,
  projects,
  onSelect,
  onBackToList,
}: ProjectDetailViewProps) {
  return (
    <ProjectsSplitShell
      projects={projects}
      activeSlug={project.slug}
      onSelect={onSelect}
      onBackToList={onBackToList}
      scrollKey={project.slug}
    >
      <ProjectDetailBody project={project} />
    </ProjectsSplitShell>
  );
}
