export type SkillItem = {
  title: string;
  body: string;
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};

export type ServiceItem = {
  title: string;
  body: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

/** Visual slots until real assets land in /public/projects/{id}/ */
export type ProjectMedia = {
  coverLabel: string;
  tags: string[];
  galleryLabels?: string[];
  videoPosterLabel?: string;
};

export type Project = {
  id: string;
  shortTitle: string;
  title: string;
  meta: string;
  tools: string;
  period: string;
  situation: string;
  actions: string[];
  result: string;
  media: ProjectMedia;
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
  greeting: string;
  headline: string;
  credibility: string;
};

export type PortfolioAbout = {
  headline: string;
  storyTitle: string;
  story: string[];
  stanceTitle: string;
  stance: string[];
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
  about: PortfolioAbout;
  contact: PortfolioContact;
  servicesHeadline: string;
  services: ServiceItem[];
  companies: string[];
  skills: SkillGroup[];
  projectsIntro: string;
  projects: Project[];
  projectPattern: string;
  closing: string;
  histories: HistoryItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
};

export type NavLink = {
  href: "/" | "/about";
  label: string;
};
