import type { NavLink } from "@/features/portfolio/types";

/** Daniel-style primary nav: Works + Story */
export const NAV_LINKS = [
  { href: "/", label: "Works" },
  { href: "/about", label: "Story" },
] as const satisfies readonly NavLink[];
