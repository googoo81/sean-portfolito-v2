import { ExternalLink, Prose } from "@/components/ui";
import type { Project } from "@/features/portfolio/types";

type ProjectArticleProps = {
  project: Project;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
  return (
    <div className="article">
      <header>
        <h1 className="article__title">{project.title}</h1>
        <p className="article__meta">{project.meta}</p>
        <p className="article__meta">
          Tools: {project.tools}
          <span className="article__sep">|</span>
          {project.period}
        </p>
      </header>

      {project.links && project.links.length > 0 ? (
        <div>
          <h2 className="article__heading">Links</h2>
          <ul className="article__links">
            {project.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href} className="article__link">
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="article__heading">Situation & Task</h2>
        <Prose>{project.situation}</Prose>
      </div>

      <div>
        <h2 className="article__heading">Action</h2>
        <ul className="article__actions">
          {project.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="article__heading">Result & Next Action</h2>
        <Prose className="article__result">{project.result}</Prose>
      </div>
    </div>
  );
}
