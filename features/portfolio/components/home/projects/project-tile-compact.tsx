import Link from "next/link";
import { ProjectVisual } from "../../shared/project-visual";
import type { Project } from "@/features/portfolio/types";

type ProjectTileCompactProps = {
  project: Project;
};

export function ProjectTileCompact({ project }: ProjectTileCompactProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="flex h-full min-h-[7.5rem] flex-col overflow-hidden rounded-[1.25rem] border border-line bg-accent-soft transition-colors hover:bg-[#2e2e2e]"
    >
      <div className="min-h-0 flex-1">
        <ProjectVisual className="h-full min-h-[4.5rem] bg-transparent" />
      </div>
      <p className="truncate px-3 pb-3 text-sm font-medium tracking-tight">
        {project.shortTitle}
      </p>
    </Link>
  );
}
