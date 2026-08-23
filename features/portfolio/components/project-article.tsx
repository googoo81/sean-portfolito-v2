import { ExternalLink, Prose } from "@/components/ui";
import type { Project } from "@/features/portfolio/types";

type ProjectArticleProps = {
  project: Project;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
  return (
    <article id={`project-${project.slug}`} className="scroll-mt-24 space-y-6">
      <header>
        <h3 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-muted">{project.meta}</p>
        <p className="mt-1 text-sm text-muted">
          Tools: {project.tools}
          <span className="mx-2 text-line">|</span>
          {project.period}
        </p>
      </header>

      {project.links && project.links.length > 0 ? (
        <div>
          <h4 className="text-sm font-medium text-accent">Links</h4>
          <ul className="mt-2 space-y-1">
            {project.links.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  className="text-sm underline decoration-line underline-offset-4 hover:decoration-accent"
                >
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h4 className="text-sm font-medium text-accent">Situation & Task</h4>
        <Prose className="mt-2">{project.situation}</Prose>
      </div>

      <div>
        <h4 className="text-sm font-medium text-accent">Action</h4>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
          {project.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-accent">Result & Next Action</h4>
        <Prose className="mt-2 border-l-2 border-accent-soft pl-4">
          {project.result}
        </Prose>
      </div>
    </article>
  );
}
