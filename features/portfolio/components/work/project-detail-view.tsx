import { ProjectArticle } from "@/features/portfolio/components/work/project-article";
import { ProjectIndex } from "@/features/portfolio/components/work/project-index";
import { ProjectVisual } from "@/features/portfolio/components/shared/project-visual";
import type { Project } from "@/features/portfolio/types";

type ProjectDetailViewProps = {
  project: Project;
  projects: readonly Project[];
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
};

export function ProjectDetailView({
  project,
  projects,
  onSelect,
  onBackToList,
}: ProjectDetailViewProps) {
  return (
    <div className="projects-overlay__detail-layout">
      <ProjectIndex
        projects={projects}
        activeSlug={project.slug}
        onSelect={onSelect}
        onBackToList={onBackToList}
      />
      <div className="projects-overlay__detail-scroll" key={project.slug}>
        <div className="projects-overlay__detail flex w-full flex-col gap-3 px-5 py-6 sm:px-8 sm:py-8">
          <div className="glass-chip overflow-hidden rounded-[1.25rem]">
            <ProjectVisual className="h-56 min-h-56 bg-transparent sm:h-72" />
          </div>
          <div className="glass-chip rounded-[1.25rem] p-5 sm:p-7">
            <ProjectArticle project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}
