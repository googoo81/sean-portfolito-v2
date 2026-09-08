import type { Locale } from "@/lib/locale";
import type { Portfolio } from "@/features/portfolio/types";
import { portfolioEn } from "./portfolio.en";
import { portfolioKo } from "./portfolio.ko";

export const portfolios: Record<Locale, Portfolio> = {
  ko: portfolioKo,
  en: portfolioEn,
};

export { portfolioKo, portfolioEn };
