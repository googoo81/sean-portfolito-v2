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
};

export type EducationItem = {
  school: string;
  period: string;
};

export type CertificateItem = {
  name: string;
  date: string;
};

export type StackItem = {
  id: string;
  label: string;
  icon: string;
  themed: boolean;
  note: string;
};

export type PortfolioIntro = {
  headline: string;
  process: readonly string[];
  closing: string;
  pairs: readonly (readonly [string, string])[];
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
  skills: string[];
  stack: readonly StackItem[];
  featuredSlug: string;
  projects: Project[];
  histories: HistoryItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
};
