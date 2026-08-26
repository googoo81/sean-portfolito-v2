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
  const className =
    "glass-chip flex h-full min-h-[7.5rem] w-full flex-col overflow-hidden rounded-[1.25rem] text-left transition-colors hover:bg-soft-hover";

  const content = (
    <>
      <div className="min-h-0 flex-1">
        <ProjectVisual className="h-full min-h-[4.5rem] bg-transparent" />
      </div>
      <p className="truncate px-3 pb-3 text-sm font-medium tracking-tight">
        {project.shortTitle}
      </p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        className={`${className} cursor-pointer`}
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
