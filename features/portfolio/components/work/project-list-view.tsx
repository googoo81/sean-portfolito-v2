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
    <div className="projects-overlay__detail grid grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-8">
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
