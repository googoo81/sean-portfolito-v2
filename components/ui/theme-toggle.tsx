"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/format";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import {
  applyTheme,
  getCurrentTheme,
  getOppositeTheme,
  persistTheme,
  type Theme,
} from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

function syncToggle(button: HTMLButtonElement | null, theme: Theme) {
  if (!button) {
    return;
  }

  const isDark = theme === "dark";
  button.setAttribute("aria-pressed", String(isDark));
  button.setAttribute(
    "aria-label",
    isDark ? "라이트 모드로 전환" : "다크 모드로 전환",
  );
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    syncToggle(buttonRef.current, getCurrentTheme());
  }, []);

  const toggleTheme = useDebouncedCallback(() => {
    const nextTheme = getOppositeTheme(getCurrentTheme());

    applyTheme(nextTheme);
    persistTheme(nextTheme);
    syncToggle(buttonRef.current, nextTheme);
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label="테마 전환"
      aria-pressed="false"
      className={cn(
        "theme-toggle glass relative h-15 w-28 shrink-0 cursor-pointer overflow-hidden rounded-full bg-(--theme-toggle-track) p-1.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground",
        className,
      )}
    >
      <span className="sr-only">흑백 테마 전환</span>
      <span className="theme-toggle__thumb glass-chip relative z-10 flex size-12 items-center justify-center rounded-full bg-(--theme-toggle-thumb) text-(--theme-toggle-icon)">
        <svg
          viewBox="0 0 24 24"
          className="theme-toggle__sun absolute size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          className="theme-toggle__moon absolute size-6"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.2 15.2A8.3 8.3 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
        </svg>
      </span>
    </button>
  );
}
