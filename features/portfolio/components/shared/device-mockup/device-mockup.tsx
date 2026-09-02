import { cn } from "@/lib/format";
import { ProjectVisual } from "../project-visual";
import type { Project } from "@/features/portfolio/types";

type DeviceMockupProps = {
  project: Project;
  className?: string;
};

export function DeviceMockup({ project, className }: DeviceMockupProps) {
  return (
    <div className={cn("device-mockup", className)}>
      <div className="device-mockup__face">
        <ProjectVisual project={project} />
      </div>
    </div>
  );
}
