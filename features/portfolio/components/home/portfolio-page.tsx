import { BentoCard, BentoGrid, ThemeToggle } from "@/components/ui";
import { getFeaturedProject } from "@/features/portfolio/lib";
import { ProfileTile } from "./profile-tile";
import { ProjectTile } from "./projects/project-tile";
import { ProjectsGridCell } from "./projects/projects-grid-cell";
import { SocialTile } from "./social-tile";
import { StackRow } from "./stack";
import type { Portfolio } from "@/features/portfolio/types";

type PortfolioPageProps = {
  portfolio: Portfolio;
};

export function PortfolioPage({ portfolio }: PortfolioPageProps) {
  const featured = getFeaturedProject(portfolio);

  return (
    <main className="bento-page flex min-h-dvh flex-1 flex-col p-3 sm:p-4">
      <BentoGrid className="min-h-0 flex-1">
        <BentoCard className="bento-intro justify-between p-6 sm:p-8">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Hi, I&apos;m {portfolio.contact.name} —
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {portfolio.intro.headline}
          </p>
        </BentoCard>

        {featured ? (
          <ProjectTile project={featured} className="bento-featured" />
        ) : null}

        <ProfileTile className="bento-profile" />

        <BentoCard className="bento-about justify-between p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            About.
          </p>
          <p className="mt-auto pt-8 text-lg leading-snug font-medium tracking-tight sm:text-xl">
            {portfolio.intro.closing}
          </p>
        </BentoCard>

        <BentoCard className="bento-social">
          <SocialTile {...portfolio.contact} />
        </BentoCard>

        <div className="bento-mid">
        <ProjectsGridCell className="bento-projects" />

        <BentoCard className="bento-history justify-between overflow-y-auto p-6 sm:p-7">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Histories & Certificates.
          </p>
          <div className="bento-fill-end mt-6 grid grid-cols-2 gap-x-8 gap-y-4">
            <ul className="space-y-4">
              {portfolio.education.map((item) => (
                <li key={item.school}>
                  <p className="text-base font-medium tracking-tight">{item.school}</p>
                  <p className="mt-1 text-sm text-muted">{item.period}</p>
                </li>
              ))}
              {portfolio.certificates.map((item) => (
                <li key={item.name}>
                  <p className="text-base font-medium tracking-tight">{item.name}</p>
                  <p className="mt-1 text-sm text-muted">{item.date}</p>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {portfolio.histories.map((item) => (
                <li key={item.company}>
                  <p className="text-base font-medium tracking-tight">{item.company}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.role} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </BentoCard>
        </div>

        <div className="bento-bottom">
        <BentoCard className="bento-stack p-6 sm:p-7">
          <p className="shrink-0 text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Stack I use.
          </p>
          <div className="flex min-h-0 flex-1 items-center">
            <StackRow items={portfolio.stack} />
          </div>
        </BentoCard>

        <BentoCard className="bento-skills overflow-y-auto p-6 sm:p-7">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            Skills.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolio.skills.map((label) => (
              <span
                key={label}
                className="glass-chip rounded-full px-3 py-1.5 text-xs text-foreground sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </BentoCard>

        <BentoCard className="bento-cta items-center justify-center p-6 sm:p-7">
          <ThemeToggle />
        </BentoCard>
        </div>
      </BentoGrid>
    </main>
  );
}
