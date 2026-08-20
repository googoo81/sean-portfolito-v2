import { portfolio } from "@/features/portfolio/data/portfolio";
import type { Portfolio } from "@/features/portfolio/types";

/** Server-side portfolio accessor. Swap implementation later for CMS/API. */
export function getPortfolio(): Portfolio {
  return portfolio;
}
