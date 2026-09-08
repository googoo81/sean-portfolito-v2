"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/format";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { useLocaleContext } from "@/features/portfolio/i18n";
import type { Locale } from "@/lib/locale";

type LocaleToggleProps = {
  className?: string;
};

function syncToggle(
  button: HTMLButtonElement | null,
  locale: Locale,
  labels: { toKo: string; toEn: string },
) {
  if (!button) {
    return;
  }

  const isEn = locale === "en";
  button.setAttribute("aria-pressed", String(isEn));
  button.setAttribute("aria-label", isEn ? labels.toKo : labels.toEn);
}

export function LocaleToggle({ className }: LocaleToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { locale, toggleLocale, ui } = useLocaleContext();

  useEffect(() => {
    syncToggle(buttonRef.current, locale, {
      toKo: ui.localeToKo,
      toEn: ui.localeToEn,
    });
  }, [locale, ui.localeToKo, ui.localeToEn]);

  const onToggle = useDebouncedCallback(() => {
    toggleLocale();
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      aria-label={ui.localeToggleAria}
      aria-pressed={locale === "en"}
      className={cn("locale-toggle glass", className)}
    >
      <span className="sr-only">{ui.localeToggleAria}</span>
      <span className="locale-toggle__track" aria-hidden>
        <span className="locale-toggle__option">KO</span>
        <span className="locale-toggle__option">EN</span>
      </span>
      <span className="locale-toggle__thumb glass-chip">
        {locale === "en" ? "EN" : "KO"}
      </span>
    </button>
  );
}
