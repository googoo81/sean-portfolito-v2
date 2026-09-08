"use client";

import { useEffect, useRef, useState } from "react";
import { BentoCard } from "@/components/ui";
import { useUi } from "@/features/portfolio/i18n";
import { useLiteMotion } from "@/lib/use-lite-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import {
  prefetchProjectsOverlay,
  useProjectsSession,
} from "./projects-session";
import { readProjectsOrigin } from "./projects-origin";

const OPENED_STORAGE_KEY = "projects-opened";

type ProjectsGridCellProps = {
  className?: string;
};

function GoArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function hasOpenedProjects() {
  try {
    return localStorage.getItem(OPENED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markProjectsOpened() {
  try {
    localStorage.setItem(OPENED_STORAGE_KEY, "1");
  } catch {
    // ignore quota / private mode
  }
}

function resetOpenedStorage() {
  try {
    localStorage.removeItem(OPENED_STORAGE_KEY);
  } catch {
    // ignore quota / private mode
  }
}

export function ProjectsGridCell({ className }: ProjectsGridCellProps) {
  const ui = useUi();
  const cardRef = useRef<HTMLButtonElement>(null);
  const { open, openProjects } = useProjectsSession();
  const reducedMotion = usePrefersReducedMotion();
  const liteMotion = useLiteMotion();
  const [cue, setCue] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    resetOpenedStorage();
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady || reducedMotion || liteMotion || open || hasOpenedProjects()) {
      return;
    }

    const startId = window.setTimeout(() => setCue(true), 5000);

    return () => {
      window.clearTimeout(startId);
    };
  }, [storageReady, reducedMotion, liteMotion, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    markProjectsOpened();
    setCue(false);
  }, [open]);

  return (
    <BentoCard
      className={`${className ?? ""}${cue ? " bento-projects--cue" : ""}`.trim()}
    >
      <button
        ref={cardRef}
        type="button"
        aria-label={ui.allProjectsAria}
        aria-expanded={open}
        data-projects-origin="cell"
        className="projects-cell"
        onPointerEnter={prefetchProjectsOverlay}
        onFocus={prefetchProjectsOverlay}
        onClick={() => {
          const origin = readProjectsOrigin(cardRef.current);
          if (!origin) {
            return;
          }

          openProjects({ origin });
        }}
      >
        <p className="project-kicker">💻 Projects.</p>
        <span className="bento-projects__go" aria-hidden>
          <span className="bento-projects__go-icons">
            <GoArrow />
            <GoArrow />
          </span>
        </span>
      </button>
    </BentoCard>
  );
}
