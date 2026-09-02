import { InstagramCarousel } from "@/features/portfolio/components/shared/instagram-carousel";
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
  const carousel =
    project.galleryFormat === "carousel" ? (project.gallery ?? []) : [];
  const showHero = carousel.length > 0 || Boolean(project.video);

  return (
    <div className="projects-overlay__detail projects-overlay__article">
      {showHero ? (
        <div className="glass-chip projects-overlay__chip">
          {carousel.length > 0 ? (
            <InstagramCarousel images={carousel} />
          ) : (
            <ProjectVisual
              project={project}
              preferVideo
              className="projects-overlay__hero"
            />
          )}
        </div>
      ) : null}
      <div className="glass-chip projects-overlay__chip projects-overlay__article-body">
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
