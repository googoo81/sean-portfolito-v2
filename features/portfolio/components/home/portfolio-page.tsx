import { BentoCard, BentoGrid, ThemeToggle } from "@/components/ui";
import { getFeaturedProject } from "@/features/portfolio/lib";
import { ProfileTile } from "./profile-tile";
import { ProjectTile } from "./projects/project-tile";
import { ProjectsGridCell } from "./projects/projects-grid-cell";
import { ProjectsSessionProvider } from "./projects/projects-session";
import { SkillsTile } from "./skills-tile";
import { SocialTile } from "./social-tile";
import { StackRow } from "./stack";
import type { Portfolio } from "@/features/portfolio/types";

type PortfolioPageProps = {
  portfolio: Portfolio;
};

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

export function PortfolioPage({ portfolio }: PortfolioPageProps) {
  const featured = getFeaturedProject(portfolio);

  return (
    <main className="bento-page">
      <ProjectsSessionProvider projects={portfolio.projects}>
        <BentoGrid>
          <BentoCard className="bento-intro">
            <h1 className="intro-title">
              {portfolio.intro.headline.split("\n").map((line) => (
                <span key={line} className="intro-title__rest">
                  {line}
                </span>
              ))}
              <span>
                {portfolio.contact.name}
                <span className="intro-title__rest"> 입니다.</span>
              </span>
            </h1>
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
              <p className="about-process">
                {portfolio.intro.process.map((step, index) => (
                  <span key={step} className="about-process__step">
                    {index > 0 ? <ProcessArrow /> : null}
                    {step}
                  </span>
                ))}
              </p>
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
                    <p className="bento-history__title">{item.school}</p>
                    <p className="bento-history__meta">{item.period}</p>
                  </li>
                ))}
                {portfolio.histories.map((item) => (
                  <li key={item.company}>
                    <p className="bento-history__title">{item.company}</p>
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
              <ThemeToggle />
            </BentoCard>
          </div>
        </BentoGrid>
      </ProjectsSessionProvider>
    </main>
  );
}
