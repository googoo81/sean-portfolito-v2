"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getPortfolio } from "@/features/portfolio/lib/get-portfolio";
import { uiStrings, type UiStrings } from "@/features/portfolio/i18n/ui";
import type { Portfolio } from "@/features/portfolio/types";
import {
  applyLocale,
  DEFAULT_LOCALE,
  getCurrentLocale,
  getOppositeLocale,
  persistLocale,
  type Locale,
} from "@/lib/locale";

const LOCALE_CHANGE_EVENT = "portfolio-locale-change";

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
}

function getLocaleSnapshot(): Locale {
  return getCurrentLocale();
}

function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function emitLocaleChange() {
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}

type LocaleContextValue = {
  locale: Locale;
  portfolio: Portfolio;
  ui: UiStrings;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: ReactNode;
};

export function LocaleProvider({ children }: LocaleProviderProps) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    applyLocale(next);
    persistLocale(next);
    emitLocaleChange();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(getOppositeLocale(getCurrentLocale()));
  }, [setLocale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      portfolio: getPortfolio(locale),
      ui: uiStrings[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return context;
}

export function useLocale() {
  return useLocaleContext().locale;
}

export function usePortfolio() {
  return useLocaleContext().portfolio;
}

export function useUi() {
  return useLocaleContext().ui;
}
