import Link from "next/link";
import { DeviceMockup } from "../../shared/device-mockup";
import type { Project } from "@/features/portfolio/types";

type ProjectTileCompactProps = {
  project: Project;
  onSelect?: (project: Project) => void;
};

function kindOf(meta: string) {
  return meta.split("|")[0]?.trim() ?? "";
}

export function ProjectTileCompact({
  project,
  onSelect,
}: ProjectTileCompactProps) {
  const kind = kindOf(project.meta);
  const className = "project-tile-compact";

  const content = (
    <>
      <div className="project-tile-compact__media">
        <DeviceMockup project={project} />
      </div>
      <div className="project-tile-compact__caption">
        <p className="project-tile-compact__meta">
          <span>{project.period}</span>
          {kind ? (
            <>
              <span className="project-tile-compact__dot" aria-hidden />
              <span>{kind}</span>
            </>
          ) : null}
        </p>
        <p className="project-tile-compact__title">{project.shortTitle}</p>
      </div>
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
