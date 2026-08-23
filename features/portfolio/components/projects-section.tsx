import { Prose, Section } from "@/components/ui";
import { ProjectArticle } from "./project-article";
import type { Project } from "@/features/portfolio/types";

type ProjectsSectionProps = {
  intro?: string;
  projects: Project[];
};

export function ProjectsSection({ intro, projects }: ProjectsSectionProps) {
  return (
    <Section id="projects" title="Projects Experiences.">
      {intro ? <Prose className="mb-12 max-w-2xl">{intro}</Prose> : null}

      <div className="space-y-16">
        {projects.map((project) => (
          <ProjectArticle key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
