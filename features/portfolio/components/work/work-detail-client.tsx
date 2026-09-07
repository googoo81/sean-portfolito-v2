"use client";

import { notFound } from "next/navigation";
import { usePortfolio } from "@/features/portfolio/i18n";
import { ProjectDetailView } from "@/features/portfolio/components/work/project-detail-view";
import { WorkWindow } from "@/features/portfolio/components/work/projects-chrome";

type WorkDetailClientProps = {
  slug: string;
};

export function WorkDetailClient({ slug }: WorkDetailClientProps) {
  const { projects } = usePortfolio();
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <WorkWindow title={project.shortTitle}>
      <ProjectDetailView project={project} projects={projects} />
    </WorkWindow>
  );
}
