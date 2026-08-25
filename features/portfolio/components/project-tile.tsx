import Link from "next/link";
import { BentoCard } from "@/components/ui";
import { ProjectVisual } from "./project-visual";
import type { Project } from "@/features/portfolio/types";

type ProjectTileProps = {
  project: Project;
  className?: string;
};

export function ProjectTile({ project, className }: ProjectTileProps) {
  return (
    <BentoCard as="article" className={className}>
      <Link
        href={`/work/${project.slug}`}
        className="relative flex h-full min-h-[16rem] flex-col xl:min-h-0"
      >
        <div className="min-h-0 flex-1">
          <ProjectVisual />
        </div>
        <p className="px-5 pb-5 text-base font-medium tracking-tight sm:text-lg">
          {project.shortTitle}
        </p>
      </Link>
    </BentoCard>
  );
}
