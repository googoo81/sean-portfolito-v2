export const LOCALE_STORAGE_KEY = "portfolio-locale";
export const DEFAULT_LOCALE = "ko";

export type Locale = "ko" | "en";

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}

export function getStoredLocale(): Locale | undefined {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

export function persistLocale(locale: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
}

export function getCurrentLocale(): Locale {
  const documentLocale = document.documentElement.dataset.locale;
  if (isLocale(documentLocale)) {
    return documentLocale;
  }

  return getStoredLocale() ?? DEFAULT_LOCALE;
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "ko" ? "en" : "ko";
}

export function getLocaleInitScript() {
  return `try{const l=localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)});const m=l==="ko"||l==="en"?l:${JSON.stringify(DEFAULT_LOCALE)};document.documentElement.lang=m;document.documentElement.dataset.locale=m}catch{document.documentElement.lang=${JSON.stringify(DEFAULT_LOCALE)};document.documentElement.dataset.locale=${JSON.stringify(DEFAULT_LOCALE)}}`;
}
