"use client";

import type { ReactNode } from "react";
import { ExternalLink, Prose } from "@/components/ui";
import type { Project, ProjectImage } from "@/features/portfolio/types";

type ProjectArticleProps = {
  project: Project;
};

type NavItem = {
  id: string;
  label: string;
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

function closingNavLabel(project: Project) {
  if (project.closing.kind === "points") {
    return project.closing.label ?? "Project Point";
  }
  return project.closing.label ?? "Outcome";
}

function buildNav(project: Project): NavItem[] {
  const items: NavItem[] = [
    { id: "problem", label: project.problemLabel ?? "Problem" },
    { id: "strategy", label: project.strategyLabel ?? "Strategy" },
  ];

  if (project.channels?.length || project.execution.length > 0) {
    items.push({
      id: "execution",
      label: project.executionLabel ?? "Execution",
    });
  }

  if (project.creative) {
    items.push({
      id: "creative",
      label: project.creative.label ?? "Creative",
    });
  }

  if (project.mediaMix) {
    items.push({
      id: "media-mix",
      label: project.mediaMix.label ?? "Media Mix",
    });
  }

  items.push({ id: "closing", label: closingNavLabel(project) });
  return items;
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
  const nav = buildNav(project);
  const closing = project.closing;
  const showExecution =
    Boolean(project.channels?.length) || project.execution.length > 0;
  const stepOf = (id: string) =>
    String(nav.findIndex((item) => item.id === id) + 1).padStart(2, "0");

  return (
    <div className="article">
      <header>
        <h1 className="article__title">{project.title}</h1>
        {project.summary ? (
          <p className="article__summary">{project.summary}</p>
        ) : null}
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

      <ArticleSection
        id="problem"
        step={stepOf("problem")}
        label={project.problemLabel ?? "Problem"}
      >
        {project.problemLead ? (
          <p className="article__lead">{project.problemLead}</p>
        ) : null}
        <Prose>{project.problem}</Prose>
      </ArticleSection>

      <ArticleSection
        id="strategy"
        step={stepOf("strategy")}
        label={project.strategyLabel ?? "Strategy"}
      >
        {project.strategyLead ? (
          <p className="article__lead">{project.strategyLead}</p>
        ) : null}
        <Prose>{project.strategy}</Prose>
        {project.strategyFlow && project.strategyFlow.length > 0 ? (
          <ol className="article__flow">
            {project.strategyFlow.map((step) => (
              <li key={step} className="article__flow-item">
                {step}
              </li>
            ))}
          </ol>
        ) : null}
        {project.strategyPoints && project.strategyPoints.length > 0 ? (
          <ul className="article__actions">
            {project.strategyPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </ArticleSection>

      {showExecution ? (
        <ArticleSection
          id="execution"
          step={stepOf("execution")}
          label={project.executionLabel ?? "Execution"}
        >
          {project.execution.length > 0 ? (
            <ul className="article__actions">
              {project.execution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {project.channels && project.channels.length > 0 ? (
            <div className="article__channels">
              {project.channels.map((channel) => (
                <article key={channel.name} className="article__channel">
                  <h3 className="article__channel-name">{channel.name}</h3>
                  <p className="article__channel-role">{channel.role}</p>
                  <ul className="article__actions">
                    {channel.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : null}
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
      ) : null}

      {project.creative ? (
        <ArticleSection
          id="creative"
          step={stepOf("creative")}
          label={project.creative.label ?? "Creative"}
        >
          {project.creative.lead ? (
            <p className="article__lead">{project.creative.lead}</p>
          ) : null}
          {project.creative.body ? <Prose>{project.creative.body}</Prose> : null}
          <ol className="article__flow">
            {project.creative.flow.map((step) => (
              <li key={step} className="article__flow-item">
                {step}
              </li>
            ))}
          </ol>
        </ArticleSection>
      ) : null}

      {project.mediaMix ? (
        <ArticleSection
          id="media-mix"
          step={stepOf("media-mix")}
          label={project.mediaMix.label ?? "Media Mix"}
        >
          <p className="article__budget">{project.mediaMix.budget}</p>
          {project.mediaMix.rationale ? (
            <Prose>{project.mediaMix.rationale}</Prose>
          ) : null}
          <div className="article__mix">
            {project.mediaMix.items.map((item) => (
              <article key={item.channel} className="article__mix-card">
                <div className="article__mix-head">
                  <h3 className="article__mix-channel">{item.channel}</h3>
                  <p className="article__mix-share">{item.share}</p>
                </div>
                <p className="article__channel-role">{item.role}</p>
                {item.notes && item.notes.length > 0 ? (
                  <ul className="article__actions">
                    {item.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </ArticleSection>
      ) : null}

      <ArticleSection
        id="closing"
        step={stepOf("closing")}
        label={closingNavLabel(project)}
      >
        {closing.kind === "outcome" ? (
          <div className="article__outcome">
            {closing.before ? (
              <div className="article__compare">
                <div className="article__compare-card">
                  <p className="article__compare-label">{closing.before.title}</p>
                  <dl className="article__metrics">
                    {closing.before.metrics.map((metric) => (
                      <div key={metric.label} className="article__metric">
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {closing.before.insight ? (
                    <p className="article__insight">{closing.before.insight}</p>
                  ) : null}
                </div>
                {closing.after ? (
                  <div className="article__compare-card">
                    <p className="article__compare-label">{closing.after.title}</p>
                    <ul className="article__actions">
                      {closing.after.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
            <Prose className="article__result">{closing.body}</Prose>
          </div>
        ) : (
          <div className="article__outcome">
            <ul className="article__actions">
              {closing.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {closing.body ? (
              <Prose className="article__result">{closing.body}</Prose>
            ) : null}
          </div>
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
