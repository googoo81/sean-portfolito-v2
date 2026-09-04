import { ExternalLink, Prose } from "@/components/ui";
import type { Project, ProjectImage } from "@/features/portfolio/types";

type ProjectArticleProps = {
  project: Project;
};

function stillsOf(project: Project): ProjectImage[] {
  if (project.galleryFormat === "carousel" || project.galleryFormat === "deck") {
    return [];
  }

  return project.gallery ?? [];
}

function pdfLinksOf(project: Project) {
  return (
    project.links?.filter((link) => /\.pdf(?:$|\?)/i.test(link.href)) ?? []
  );
}

function outboundLinksOf(project: Project) {
  return (
    project.links?.filter((link) => !/\.pdf(?:$|\?)/i.test(link.href)) ?? []
  );
}

export function ProjectArticle({ project }: ProjectArticleProps) {
  const stills = stillsOf(project);
  const pdfs = pdfLinksOf(project);
  const outbound = outboundLinksOf(project);

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

      {outbound.length > 0 ? (
        <div>
          <h2 className="article__heading">Links</h2>
          <ul className="article__links">
            {outbound.map((link) => (
              <li key={link.href}>
                <ExternalLink href={encodeURI(link.href)} className="article__link">
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h2 className="article__heading">Situation & Hypothesis</h2>
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
        <h2 className="article__heading">Result & Reflection</h2>
        <Prose className="article__result">{project.result}</Prose>
      </div>

      {stills.length > 0 ? (
        <div>
          <h2 className="article__heading">Work</h2>
          <div className="article__gallery">
            {stills.map((image) => (
              <figure key={image.src} className="article__shot">
                <img src={image.src} alt={image.alt} />
              </figure>
            ))}
          </div>
        </div>
      ) : null}

      {pdfs.length > 0 ? (
        <div>
          <h2 className="article__heading">Deck</h2>
          {pdfs.map((pdf) => (
            <div key={pdf.href} className="article__pdf-block">
              <iframe
                src={encodeURI(pdf.href)}
                title={pdf.label}
                className="article__pdf-frame"
              />
              <div className="article__pdf-footer">
                <ExternalLink href={encodeURI(pdf.href)} className="article__link">
                  {pdf.label} ↗
                </ExternalLink>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
