import type { NavItem } from "@/features/portfolio/types";

export const NAV_ITEMS = [
  { href: "#work", label: "Work", sectionId: "work" },
  { href: "#about", label: "About", sectionId: "about" },
  { href: "#contact", label: "Contact", sectionId: "contact" },
] as const satisfies readonly NavItem[];
