import { CertificatesSection } from "./certificates-section";
import { ContactSection } from "./contact-section";
import { EducationSection } from "./education-section";
import { HeroSection } from "./hero-section";
import { HistoriesSection } from "./histories-section";
import { MotionPreference } from "./motion-preference";
import { ProjectPatternSection } from "./project-pattern-section";
import { ProjectsSection } from "./projects-section";
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
      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-5 pb-24 sm:px-8">
        <HeroSection intro={portfolio.intro} />
        <ContactSection contact={portfolio.contact} />
        <SkillsSection skills={portfolio.skills} />
        <ProjectsSection
          intro={portfolio.projectsIntro}
          projects={portfolio.projects}
        />
        <ProjectPatternSection
          pattern={portfolio.projectPattern}
          closing={portfolio.closing}
        />
        <HistoriesSection histories={portfolio.histories} />
        <EducationSection education={portfolio.education} />
        <CertificatesSection certificates={portfolio.certificates} />
      </main>
      <SiteFooter name={portfolio.contact.name} />
    </>
  );
}
