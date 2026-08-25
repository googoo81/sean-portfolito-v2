export type {
  CertificateItem,
  EducationItem,
  HistoryItem,
  NavItem,
  Portfolio,
  PortfolioContact,
  PortfolioIntro,
  Project,
  ProjectLink,
  SkillGroup,
  SkillItem,
} from "@/features/portfolio/types";

export { getPortfolio, getProjectBySlug } from "@/features/portfolio/lib";
export { PortfolioPage } from "@/features/portfolio/components";
export { NAV_ITEMS } from "@/features/portfolio/constants";
export {
  useActiveSection,
  usePrefersReducedMotion,
} from "@/features/portfolio/hooks";
