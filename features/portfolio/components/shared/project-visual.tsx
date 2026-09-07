"use client";

import { cn } from "@/lib/format";
import { useUi } from "@/features/portfolio/i18n";
import { ProjectVideo } from "./project-video";
import type { Project } from "@/features/portfolio/types";

type ProjectVisualProps = {
  project?: Project;
  className?: string;
  preferVideo?: boolean;
};

export function ProjectVisual({
  project,
  className,
  preferVideo = false,
}: ProjectVisualProps) {
  const ui = useUi();
  const cover = project?.cover;
  const video =
    project?.video && (preferVideo || !cover) ? project.video : undefined;
  const reels = Boolean(video && project?.videoFormat === "reels");

  if (!video && !cover) {
    return (
      <div className={cn("project-visual", className)}>
        <p>{ui.video.previewFallback}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "project-visual",
        "project-visual--media",
        reels && "project-visual--reels",
        cover?.fit === "contain" && !video && "project-visual--contain",
        className,
      )}
    >
      {video ? (
        <ProjectVideo
          src={video}
          label={
            cover?.alt ??
            ui.video.fallbackLabel(project?.shortTitle ?? "")
          }
          interactive={preferVideo}
        />
      ) : (
        <img src={encodeURI(cover?.src ?? "")} alt={cover?.alt ?? ""} />
      )}
    </div>
  );
}
