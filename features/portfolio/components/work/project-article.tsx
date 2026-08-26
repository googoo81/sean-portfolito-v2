import { ExternalLink, Prose } from "@/components/ui";
import type { Project } from "@/features/portfolio/types";

type ProjectArticleProps = {
  project: Project;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-medium leading-snug tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-sm text-muted">{project.meta}</p>
        <p className="mt-1 text-sm text-muted">
          Tools: {project.tools}
          <span className="mx-2 text-faint">|</span>
          {project.period}
        </p>
      </header>

      {project.links && project.links.length > 0 ? (
        <div>
          <h2 className="text-sm font-medium text-foreground">Links</h2>
          <ul className="mt-2 space-y-1">
            {project.links.map((link) => (
              <li key={link.href}>
                <ExternalLink
                  href={link.href}
                  className="text-sm underline decoration-faint underline-offset-4 hover:decoration-foreground"
                >
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="text-sm font-medium text-foreground">
          Situation & Task
        </h2>
        <Prose className="mt-2">{project.situation}</Prose>
      </div>

      <div>
        <h2 className="text-sm font-medium text-foreground">Action</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-base">
          {project.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-medium text-foreground">
          Result & Next Action
        </h2>
        <Prose className="mt-2 border-l-2 border-line pl-4">
          {project.result}
        </Prose>
      </div>
    </div>
  );
}
