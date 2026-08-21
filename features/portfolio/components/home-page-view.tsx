import { CompaniesStrip } from "./companies-strip";
import { HomeHero } from "./home-hero";
import { ServicesSection } from "./services-section";
import { SiteShell } from "./site-shell";
import { WorksGrid } from "./works-grid";
import type { Portfolio } from "@/features/portfolio/types";

type HomePageViewProps = {
  portfolio: Portfolio;
};

/** `/` — Works-first home, Daniel Sun structure */
export function HomePageView({ portfolio }: HomePageViewProps) {
  return (
    <SiteShell contact={portfolio.contact}>
      <HomeHero intro={portfolio.intro} ctaEmail={portfolio.contact.email} />
      <WorksGrid projects={portfolio.projects} />
      <ServicesSection
        headline={portfolio.servicesHeadline}
        services={portfolio.services}
      />
      <CompaniesStrip companies={portfolio.companies} />
    </SiteShell>
  );
}
