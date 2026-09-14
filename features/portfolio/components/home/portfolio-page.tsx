"use client";

import { BentoCard, BentoGrid, ExternalLink, LocaleToggle, ThemeToggle } from "@/components/ui";
import { getFeaturedProject } from "@/features/portfolio/lib";
import { usePortfolio } from "@/features/portfolio/i18n";
import { ProfileTile } from "./profile-tile";
import { ProjectTile } from "./projects/project-tile";
import { ProjectsGridCell } from "./projects/projects-grid-cell";
import {
  ProjectsSessionProvider,
  useProjectsSession,
} from "./projects/projects-session";
import { restoreProjectsOrigin } from "./projects/projects-origin";
import {
  NotionSessionProvider,
  useNotionSession,
} from "./notion/notion-session";
import { SkillsTile } from "./skills-tile";
import { SocialTile } from "./social-tile";
import { StackRow } from "./stack";
import { isNotionUrl } from "@/lib/notion";
import type { EducationItem, HistoryItem } from "@/features/portfolio/types";

function ProcessArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="about-process__arrow"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HistoryLinkedTitle({
  label,
  href,
  projectsFilter,
}: {
  label: string;
  href?: string;
  projectsFilter?: HistoryItem["projectsFilter"];
}) {
  const { openProjects } = useProjectsSession();
  const { openNotion } = useNotionSession();

  if (projectsFilter) {
    return (
      <button
        type="button"
        className="bento-history__link"
        onClick={() => {
          openProjects({
            origin: restoreProjectsOrigin("cell"),
            kind: projectsFilter,
          });
        }}
      >
        <span className="bento-history__link-text">{label}</span>
        <span className="bento-history__link-mark" aria-hidden>
          ↗
        </span>
      </button>
    );
  }

  if (href && isNotionUrl(href)) {
    return (
      <button
        type="button"
        className="bento-history__link"
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          openNotion({
            url: href,
            title: label,
            origin: {
              x: bounds.left,
              y: bounds.top,
              width: bounds.width,
              height: bounds.height,
            },
          });
        }}
      >
        <span className="bento-history__link-text">{label}</span>
        <span className="bento-history__link-mark" aria-hidden>
          ↗
        </span>
      </button>
    );
  }

  if (href) {
    return (
      <ExternalLink href={href} className="bento-history__link">
        <span className="bento-history__link-text">{label}</span>
        <span className="bento-history__link-mark" aria-hidden>
          ↗
        </span>
      </ExternalLink>
    );
  }

  return label;
}

function EducationTitle({ item }: { item: EducationItem }) {
  return (
    <HistoryLinkedTitle label={item.school} href={item.href} />
  );
}

function WorkHistoryTitle({ item }: { item: HistoryItem }) {
  return (
    <HistoryLinkedTitle
      label={item.company}
      href={item.href}
      projectsFilter={item.projectsFilter}
    />
  );
}

export function PortfolioPage() {
  const portfolio = usePortfolio();
  const featured = getFeaturedProject(portfolio);

  return (
    <main className="bento-page">
      <ProjectsSessionProvider projects={portfolio.projects}>
        <NotionSessionProvider>
          <BentoGrid>
          <BentoCard className="bento-intro">
            <h1 className="intro-title">
              {portfolio.intro.headline.split("\n").map((line) => (
                <span key={line} className="intro-title__line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="intro-sub">{portfolio.intro.subhead}</p>
            <p className="intro-process">
              {portfolio.intro.process.map((step, index) => (
                <span key={step} className="about-process__step">
                  {index > 0 ? <ProcessArrow /> : null}
                  {step}
                </span>
              ))}
            </p>
          </BentoCard>

          {featured ? (
            <ProjectTile project={featured} className="bento-featured" />
          ) : null}

          <ProfileTile
            className="bento-profile"
            name={portfolio.contact.name}
          />

          <BentoCard className="bento-about">
            <div>
              <p className="eyebrow eyebrow--sm">👻 about.</p>
            </div>
            <div className="about-copy">
              <p className="about-closing">{portfolio.intro.closing}</p>
              <div className="about-pairs">
                {portfolio.intro.pairs.map((pair) => (
                  <span key={pair.join("-")} className="about-pair glass-chip">
                    {pair[0]}
                    <span className="about-pair__dot" aria-hidden />
                    {pair[1]}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard className="bento-social">
            <SocialTile {...portfolio.contact} />
          </BentoCard>

          <div className="bento-mid">
            <ProjectsGridCell className="bento-projects" />

            <BentoCard className="bento-history">
              <p className="eyebrow">🧑‍💻 Histories.</p>
              <ul className="bento-fill-end bento-history__grid">
                {portfolio.education.map((item) => (
                  <li key={item.school}>
                    <p className="bento-history__title">
                      <EducationTitle item={item} />
                    </p>
                    <p className="bento-history__meta">{item.period}</p>
                  </li>
                ))}
                {portfolio.histories.map((item) => (
                  <li key={item.company}>
                    <p className="bento-history__title">
                      <WorkHistoryTitle item={item} />
                    </p>
                    <p className="bento-history__meta">
                      {item.role} · {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard className="bento-certs">
              <p className="eyebrow">🪪 Certificates.</p>
              <ul className="bento-history__grid">
                {portfolio.certificates.map((item) => (
                  <li key={item.name}>
                    <p className="bento-history__title">{item.name}</p>
                    <p className="bento-history__meta">{item.date}</p>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </div>

          <div className="bento-bottom">
            <BentoCard className="bento-stack">
              <p className="eyebrow">📚 Stack I use.</p>
              <div className="bento-stack__body">
                <StackRow items={portfolio.stack} />
              </div>
            </BentoCard>

            <BentoCard className="bento-skills">
              <SkillsTile skills={portfolio.skills} />
            </BentoCard>

            <BentoCard className="bento-cta">
              <div className="bento-cta__toggles">
                <LocaleToggle />
                <ThemeToggle />
              </div>
            </BentoCard>
          </div>
          </BentoGrid>
        </NotionSessionProvider>
      </ProjectsSessionProvider>
    </main>
  );
}
