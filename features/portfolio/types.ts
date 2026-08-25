export type SkillItem = {
  title: string;
  body: string;
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  shortTitle: string;
  title: string;
  meta: string;
  tools: string;
  period: string;
  situation: string;
  actions: string[];
  result: string;
  links?: ProjectLink[];
};

export type HistoryItem = {
  company: string;
  role: string;
  period: string;
  summary: string[];
};

export type EducationItem = {
  school: string;
  period: string;
};

export type CertificateItem = {
  name: string;
  date: string;
};

export type PortfolioIntro = {
  headline: string;
  lines: string[];
  closing: string;
};

export type PortfolioContact = {
  name: string;
  phone: string;
  email: string;
  github: string;
  medium: string;
};

export type Portfolio = {
  intro: PortfolioIntro;
  contact: PortfolioContact;
  skills: SkillGroup[];
  stack: string[];
  featuredSlug: string;
  projectsIntro: string;
  projects: Project[];
  projectPattern: string;
  closing: string;
  histories: HistoryItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
};

export type NavItem = {
  href: `#${string}`;
  label: string;
  sectionId: string;
};
