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

/** Closing section: live metrics narrative, or planning takeaways without forced KPIs. */
export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectChannel = {
  name: string;
  role: string;
  items: string[];
};

export type ProjectCreative = {
  label?: string;
  lead?: string;
  body?: string;
  flow: string[];
};

export type ProjectMediaMixItem = {
  channel: string;
  share: string;
  role: string;
  notes?: string[];
};

export type ProjectMediaMix = {
  label?: string;
  budget: string;
  rationale?: string;
  items: ProjectMediaMixItem[];
};

export type ProjectClosing =
  | {
      kind: "outcome";
      label?: "Outcome" | "Optimization";
      body: string;
      before?: {
        title: string;
        metrics: ProjectMetric[];
        insight?: string;
      };
      after?: {
        title: string;
        items: string[];
      };
    }
  | {
      kind: "points";
      label?: "Project Point" | "Key Takeaway";
      items: string[];
      body?: string;
    };

export type Project = {
  slug: string;
  shortTitle: string;
  title: string;
  kind: ProjectKind;
  meta: string;
  tools: string;
  period: string;
  /** Optional one-line context under the title. */
  summary?: string;
  problemLabel?: string;
  problem: string;
  /** Optional pull-quote highlighting the core problem. */
  problemLead?: string;
  strategyLabel?: string;
  strategy: string;
  /** Optional pull-quote highlighting the core strategy. */
  strategyLead?: string;
  /** Optional funnel steps shown as a visual flow. */
  strategyFlow?: string[];
  /** Optional supporting strategy bullets (target, content pillars, etc.). */
  strategyPoints?: string[];
  executionLabel?: string;
  execution: string[];
  /** Optional per-channel strategy cards (e.g. SA / DA / Owned). */
  channels?: ProjectChannel[];
  /** Optional creative process section (e.g. Reel). */
  creative?: ProjectCreative;
  /** Optional media-mix allocation section. */
  mediaMix?: ProjectMediaMix;
  closing: ProjectClosing;
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
