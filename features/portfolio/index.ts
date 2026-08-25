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

export { getFeaturedProject, getGridProjects, getPortfolio, getProjectBySlug } from "@/features/portfolio/lib";
export { PortfolioPage } from "@/features/portfolio/components";
export { NAV_ITEMS, STACK_ICON_DIR, STACK_ICONS, stackIconSlug, stackIconSrc } from "@/features/portfolio/constants";
export type { StackIconId } from "@/features/portfolio/constants";
export {
  useActiveSection,
  usePrefersReducedMotion,
} from "@/features/portfolio/hooks";
