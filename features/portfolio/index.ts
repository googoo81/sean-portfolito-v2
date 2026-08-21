export type {
  CertificateItem,
  EducationItem,
  HistoryItem,
  NavLink,
  Portfolio,
  PortfolioAbout,
  PortfolioContact,
  PortfolioIntro,
  Project,
  ProjectLink,
  ProjectMedia,
  ServiceItem,
  SkillGroup,
  SkillItem,
} from "@/features/portfolio/types";

export {
  getPortfolio,
  getProjectById,
  getProjectIds,
  getProjects,
} from "@/features/portfolio/lib";
export {
  AboutPageView,
  HomePageView,
  WorkCaseView,
} from "@/features/portfolio/components";
export { NAV_LINKS } from "@/features/portfolio/constants";
export { usePrefersReducedMotion } from "@/features/portfolio/hooks";
