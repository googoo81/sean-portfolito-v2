"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/format";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  className?: string;
};

function getScheduledTheme(): Theme {
  const hour = new Date().getHours();
  return hour >= 9 && hour < 19 ? "light" : "dark";
}

function getCurrentTheme(): Theme {
  const theme = document.documentElement.dataset.theme;

  if (theme === "dark" || theme === "light") {
    return theme;
  }

  return getScheduledTheme();
}

function applyTheme(theme: Theme, button?: HTMLButtonElement | null) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  if (button) {
    const isDark = theme === "dark";
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "라이트 모드로 전환" : "다크 모드로 전환",
    );
  }
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applyTheme(getCurrentTheme(), buttonRef.current);
  }, []);

  function toggleTheme() {
    const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";

    applyTheme(nextTheme, buttonRef.current);
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label="테마 전환"
      aria-pressed="false"
      className={cn(
        "theme-toggle h-15 w-28 shrink-0 cursor-pointer rounded-full border border-foreground/20 bg-(--theme-toggle-track) p-1.5 backdrop-blur-xl transition-[transform,background-color,border-color] duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground",
        className,
      )}
    >
      <span className="sr-only">흑백 테마 전환</span>
      <span className="theme-toggle__thumb relative flex size-12 items-center justify-center rounded-full bg-(--theme-toggle-thumb) text-(--theme-toggle-icon) shadow-[0_3px_12px_rgba(0,0,0,0.3)] ring-1 ring-foreground/15 transition-[transform,background-color,color] duration-300 ease-out">
        <svg
          viewBox="0 0 24 24"
          className="theme-toggle__sun absolute size-6 transition-all duration-200"
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
          className="theme-toggle__moon absolute size-6 transition-all duration-200"
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.2 15.2A8.3 8.3 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
        </svg>
      </span>
    </button>
  );
}
