import type { NavItem } from "@/features/portfolio/types";

export const NAV_ITEMS = [
  { href: "#contact", label: "Contact", sectionId: "contact" },
  { href: "#skills", label: "Skills", sectionId: "skills" },
  { href: "#projects", label: "Projects", sectionId: "projects" },
  { href: "#histories", label: "Histories", sectionId: "histories" },
  { href: "#education", label: "Education", sectionId: "education" },
] as const satisfies readonly NavItem[];
