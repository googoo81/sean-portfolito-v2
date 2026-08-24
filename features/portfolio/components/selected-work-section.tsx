import { WorkItem } from "./work-item";
import { sortFeaturedProjects } from "@/features/portfolio/lib";
import type { Project } from "@/features/portfolio/types";

type SelectedWorkSectionProps = {
  projects: Project[];
};

export function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  const featured = sortFeaturedProjects(projects);

  return (
    <section
      id="work"
      className="scroll-mt-24 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"
    >
      <header className="flex items-baseline justify-between gap-4 border-t border-line pt-6">
        <h2 className="font-display text-xs tracking-[0.28em] uppercase">
          Selected Work
        </h2>
        <p className="font-display text-xs tracking-[0.22em] text-muted uppercase">
          {String(featured.length).padStart(2, "0")} Projects
        </p>
      </header>

      <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-0">
        {featured.map((project, index) => (
          <WorkItem
            key={project.slug}
            project={project}
            bordered={index > 0}
          />
        ))}
      </div>
    </section>
  );
}
