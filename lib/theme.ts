export const THEME_STORAGE_KEY = "portfolio-theme";
export const LIGHT_THEME_START_HOUR = 9;
export const DARK_THEME_START_HOUR = 19;
export const DEFAULT_THEME = "dark";

export type Theme = "dark" | "light";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

export function getScheduledTheme(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= LIGHT_THEME_START_HOUR && hour < DARK_THEME_START_HOUR
    ? "light"
    : "dark";
}

export function getStoredTheme(): Theme | undefined {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

export function persistTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function getCurrentTheme(): Theme {
  const documentTheme = document.documentElement.dataset.theme;
  if (isTheme(documentTheme)) {
    return documentTheme;
  }

  return getStoredTheme() ?? getScheduledTheme();
}

export function getOppositeTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

export function getThemeInitScript() {
  return `try{const t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});const h=new Date().getHours();const m=t==="dark"||t==="light"?t:h>=${LIGHT_THEME_START_HOUR}&&h<${DARK_THEME_START_HOUR}?"light":"dark";document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m;document.documentElement.dataset.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"true":"false"}catch{document.documentElement.dataset.theme=${JSON.stringify(DEFAULT_THEME)}}`;
}
