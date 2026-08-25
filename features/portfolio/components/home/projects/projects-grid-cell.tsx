import { BentoCard } from "@/components/ui";
import { ProjectTileCompact } from "./project-tile-compact";
import type { Project } from "@/features/portfolio/types";
import { cn } from "@/lib/format";

type ProjectsGridCellProps = {
  projects: Project[];
  className?: string;
};

export function ProjectsGridCell({ projects, className }: ProjectsGridCellProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <BentoCard className={className}>
      <div className="flex h-full min-h-[12rem] flex-col p-4 sm:p-5 xl:min-h-0">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Projects
          </p>
          <p className="text-xs text-muted">{projects.length} works</p>
        </div>
        <div
          className={cn(
            "mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2.5",
            projects.length >= 4 && "grid-rows-2",
          )}
        >
          {projects.map((project) => (
            <ProjectTileCompact key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
