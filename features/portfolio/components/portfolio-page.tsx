import { BentoCard, BentoGrid } from "@/components/ui";
import { getFeaturedProject, getGridProjects } from "@/features/portfolio/lib";
import { CopyEmailButton } from "./copy-email-button";
import { MotionPreference } from "./motion-preference";
import { ProfileTile } from "./profile-tile";
import { ProjectTile } from "./project-tile";
import { ProjectsGridCell } from "./projects-grid-cell";
import { SocialTile } from "./social-tile";
import { StackRow } from "./stack-row";
import type { Portfolio } from "@/features/portfolio/types";

type PortfolioPageProps = {
  portfolio: Portfolio;
};

export function PortfolioPage({ portfolio }: PortfolioPageProps) {
  const featured = getFeaturedProject();
  const gridProjects = getGridProjects();
  const skillLabels = portfolio.skills.flatMap((group) =>
    group.items.map((item) => item.title),
  );

  return (
    <>
      <MotionPreference />
      <main className="flex min-h-dvh flex-1 flex-col p-3 sm:p-4 xl:h-dvh xl:min-h-0">
        <BentoGrid className="min-h-0 flex-1">
          <BentoCard className="bento-intro justify-between p-6 sm:p-8">
            <h1 className="text-3xl font-medium tracking-tight sm:text-4xl xl:text-[2.5rem] xl:leading-tight">
              Hi, I&apos;m {portfolio.contact.name} —
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {portfolio.intro.headline}
            </p>
          </BentoCard>

          {featured ? (
            <ProjectTile project={featured} className="bento-featured" />
          ) : null}

          <ProfileTile
            contact={portfolio.contact}
            headline={portfolio.intro.headline}
            className="bento-profile"
          />

          <BentoCard className="bento-about justify-between p-6 sm:p-8">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              About
            </p>
            <p className="mt-auto pt-8 text-lg leading-snug font-medium tracking-tight sm:text-xl">
              {portfolio.intro.closing}
            </p>
          </BentoCard>

          <BentoCard className="bento-social">
            <SocialTile
              github={portfolio.contact.github}
              medium={portfolio.contact.medium}
              phone={portfolio.contact.phone}
              email={portfolio.contact.email}
            />
          </BentoCard>

          <ProjectsGridCell projects={gridProjects} className="bento-projects" />

          <BentoCard className="bento-history justify-between overflow-y-auto p-6 sm:p-7">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Histories
            </p>
            <ul className="mt-6 space-y-4 xl:mt-auto">
              {portfolio.histories.map((item) => (
                <li key={item.company}>
                  <p className="font-medium tracking-tight">{item.company}</p>
                  <p className="mt-1 text-sm text-muted">
                    {item.role} · {item.period}
                  </p>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard className="bento-stack p-6 sm:p-7">
            <p className="shrink-0 text-lg font-medium tracking-tight">
              Stack I use
            </p>
            <div className="flex min-h-0 flex-1 items-center">
              <StackRow items={portfolio.stack} />
            </div>
          </BentoCard>

          <BentoCard className="bento-skills justify-between overflow-y-auto p-6 sm:p-7">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                Skills
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skillLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-white/8 px-3 py-1.5 text-xs text-foreground sm:text-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm xl:mt-auto">
              {portfolio.education.map((item) => (
                <p key={item.school} className="text-muted">
                  <span className="text-foreground">{item.school}</span>
                  <span className="mx-1.5 text-white/20">·</span>
                  {item.period}
                </p>
              ))}
              {portfolio.certificates.map((item) => (
                <p key={item.name} className="text-muted">
                  <span className="text-foreground">{item.name}</span>
                  <span className="mx-1.5 text-white/20">·</span>
                  {item.date}
                </p>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="bento-cta justify-between p-6 sm:p-7">
            <p className="text-lg font-medium tracking-tight sm:text-xl">
              Have a project in mind?
            </p>
            <CopyEmailButton email={portfolio.contact.email} />
          </BentoCard>
        </BentoGrid>
      </main>
    </>
  );
}
