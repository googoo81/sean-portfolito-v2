import Link from "next/link";
import { ProjectVisual } from "../../shared/project-visual";
import type { Project } from "@/features/portfolio/types";

type ProjectTileCompactProps = {
  project: Project;
  onSelect?: (project: Project) => void;
};

export function ProjectTileCompact({
  project,
  onSelect,
}: ProjectTileCompactProps) {
  const className = "project-tile-compact glass-chip";

  const content = (
    <>
      <div className="project-tile-compact__body">
        <ProjectVisual project={project} />
      </div>
      <p className="project-tile-compact__title">{project.shortTitle}</p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => onSelect(project)}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={`/work/${project.slug}`} className={className}>
      {content}
    </Link>
  );
}
