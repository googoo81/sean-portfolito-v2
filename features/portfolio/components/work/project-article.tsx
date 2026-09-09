"use client";

import type { ReactNode } from "react";
import { ExternalLink, Prose } from "@/components/ui";
import type { Project, ProjectImage } from "@/features/portfolio/types";

type ProjectArticleProps = {
  project: Project;
};

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "strategy", label: "Strategy" },
  { id: "execution", label: "Execution" },
  { id: "closing", label: "Outcome" },
] as const;

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

function closingNavLabel(project: Project) {
  if (project.closing.kind === "points") {
    return project.closing.label ?? "Project Point";
  }
  return "Outcome";
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ArticleSection({
  id,
  step,
  label,
  children,
}: {
  id: string;
  step: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="article__section">
      <div className="article__section-head">
        <span className="article__step" aria-hidden>
          {step}
        </span>
        <h2 className="article__heading">{label}</h2>
      </div>
      {children}
    </section>
  );
}

export function ProjectArticle({ project }: ProjectArticleProps) {
  const stills = stillsOf(project);
  const pdfs = pdfLinksOf(project);
  const outbound = outboundLinksOf(project);
  const closingLabel = closingNavLabel(project);
  const nav = SECTIONS.map((section) =>
    section.id === "closing"
      ? { ...section, label: closingLabel }
      : section,
  );

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
        <nav className="article__toc" aria-label="Project sections">
          {nav.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className="article__toc-link"
              onClick={() => scrollToSection(section.id)}
            >
              <span className="article__toc-step" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.label}
            </button>
          ))}
        </nav>
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

      <ArticleSection id="problem" step="01" label="Problem">
        <Prose>{project.problem}</Prose>
      </ArticleSection>

      <ArticleSection id="strategy" step="02" label="Strategy">
        <Prose>{project.strategy}</Prose>
      </ArticleSection>

      <ArticleSection id="execution" step="03" label="Execution">
        <ul className="article__actions">
          {project.execution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {stills.length > 0 ? (
          <div className="article__gallery">
            {stills.map((image) => (
              <figure key={image.src} className="article__shot">
                <img src={image.src} alt={image.alt} />
              </figure>
            ))}
          </div>
        ) : null}
      </ArticleSection>

      <ArticleSection id="closing" step="04" label={closingLabel}>
        {project.closing.kind === "outcome" ? (
          <Prose className="article__result">{project.closing.body}</Prose>
        ) : (
          <ul className="article__actions">
            {project.closing.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </ArticleSection>

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
