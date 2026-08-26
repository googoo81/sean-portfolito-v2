import Link from "next/link";
import { BentoCard } from "@/components/ui";
import { ProjectVisual } from "../../shared/project-visual";
import type { Project } from "@/features/portfolio/types";

type ProjectTileProps = {
  project: Project;
  className?: string;
};

export function ProjectTile({ project, className }: ProjectTileProps) {
  return (
    <BentoCard as="article" className={className}>
      <Link href={`/work/${project.slug}`} className="project-tile">
        <div className="project-tile__body">
          <ProjectVisual />
        </div>
        <p className="project-tile__title">{project.shortTitle}</p>
      </Link>
    </BentoCard>
  );
}
