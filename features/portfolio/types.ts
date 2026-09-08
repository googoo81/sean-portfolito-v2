export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  fit?: "contain";
};

export type ProjectKind = "team" | "personal";

export type Project = {
  slug: string;
  shortTitle: string;
  title: string;
  kind: ProjectKind;
  meta: string;
  tools: string;
  period: string;
  situation: string;
  actions: string[];
  result: string;
  links?: ProjectLink[];
  icon?: string;
  cover?: ProjectImage;
  video?: string;
  videoFormat?: "reels";
  gallery?: ProjectImage[];
  galleryFormat?: "carousel" | "deck";
};

export type HistoryItem = {
  company: string;
  role: string;
  period: string;
  href?: string;
  /** Opens the projects list filtered to this kind instead of an external link. */
  projectsFilter?: ProjectKind;
};

export type EducationItem = {
  school: string;
  period: string;
  href?: string;
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
  linkedin: string;
};

export type SkillItem = {
  label: string;
  description: string;
};

export type Portfolio = {
  intro: PortfolioIntro;
  contact: PortfolioContact;
  skills: SkillItem[];
  stack: readonly StackItem[];
  featuredSlug: string;
  projects: Project[];
  histories: HistoryItem[];
  education: EducationItem[];
  certificates: CertificateItem[];
};
