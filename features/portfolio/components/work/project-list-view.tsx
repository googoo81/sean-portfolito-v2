import { ProjectTileCompact } from "@/features/portfolio/components/home/projects/project-tile-compact";
import { ProjectsSplitShell } from "./projects-split-shell";
import type { Project } from "@/features/portfolio/types";

type ProjectListViewProps = {
  projects: readonly Project[];
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
};

export function ProjectListBody({
  projects,
  onSelect,
}: Pick<ProjectListViewProps, "projects" | "onSelect">) {
  return (
    <div className="projects-overlay__detail projects-overlay__list">
      {projects.map((project) => (
        <ProjectTileCompact
          key={project.slug}
          project={project}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function ProjectListView({
  projects,
  onSelect,
  onBackToList,
}: ProjectListViewProps) {
  return (
    <ProjectsSplitShell
      projects={projects}
      onSelect={onSelect}
      onBackToList={onBackToList}
      scrollKey="list"
    >
      <ProjectListBody projects={projects} onSelect={onSelect} />
    </ProjectsSplitShell>
  );
}
