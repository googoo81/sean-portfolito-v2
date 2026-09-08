"use client";

import { usePortfolio } from "@/features/portfolio/i18n";
import { ProjectListView } from "@/features/portfolio/components/work/project-list-view";
import { WorkWindow } from "@/features/portfolio/components/work/projects-chrome";

export function WorkIndexClient() {
  const { projects } = usePortfolio();

  return (
    <WorkWindow title="Projects.">
      <ProjectListView projects={projects} />
    </WorkWindow>
  );
}
