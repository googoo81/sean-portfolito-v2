import { CertificatesSection } from "./certificates-section";
import { ContactSection } from "./contact-section";
import { EducationSection } from "./education-section";
import { HeroSection } from "./hero-section";
import { HistoriesSection } from "./histories-section";
import { MotionPreference } from "./motion-preference";
import { ProjectPatternSection } from "./project-pattern-section";
import { ProjectsSection } from "./projects-section";
import { SelectedWorkSection } from "./selected-work-section";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { SkillsSection } from "./skills-section";
import type { Portfolio } from "@/features/portfolio/types";

type PortfolioPageProps = {
  portfolio: Portfolio;
};

export function PortfolioPage({ portfolio }: PortfolioPageProps) {
  return (
    <>
      <MotionPreference />
      <SiteNav brandName={portfolio.contact.name} />
      <main className="w-full flex-1">
        <div className="mx-auto w-full max-w-[1440px]">
          <HeroSection intro={portfolio.intro} />
          <SelectedWorkSection projects={portfolio.projects} />
        </div>
        <div className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-8">
          <SkillsSection intro={portfolio.intro} skills={portfolio.skills} />
          <ProjectsSection projects={portfolio.projects} />
          <ProjectPatternSection
            pattern={portfolio.projectPattern}
            closing={portfolio.closing}
          />
          <HistoriesSection histories={portfolio.histories} />
          <EducationSection education={portfolio.education} />
          <CertificatesSection certificates={portfolio.certificates} />
          <ContactSection contact={portfolio.contact} />
        </div>
      </main>
      <SiteFooter name={portfolio.contact.name} />
    </>
  );
}
