import { WorkItem } from "./work-item";
import { sortFeaturedProjects } from "@/features/portfolio/lib";
import type { Project } from "@/features/portfolio/types";

type SelectedWorkSectionProps = {
  intro: string;
  projects: Project[];
};

export function SelectedWorkSection({
  intro,
  projects,
}: SelectedWorkSectionProps) {
  const featured = sortFeaturedProjects(projects);

  return (
    <section
      id="work"
      className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <header className="grid grid-cols-12 items-end gap-4 border-t border-line pt-6">
        <div className="col-span-12 sm:col-span-7">
          <p className="font-display text-xs tracking-[0.28em] text-muted uppercase">
            Selected Work
          </p>
          <h2 className="font-display mt-3 text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.9] font-bold tracking-tight">
            Projects 2026
          </h2>
        </div>
        <p className="col-span-12 max-w-md text-sm leading-relaxed text-muted sm:col-span-5 sm:justify-self-end sm:text-right">
          {intro}
        </p>
      </header>

      <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
        {featured.map((project, index) => (
          <WorkItem key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
