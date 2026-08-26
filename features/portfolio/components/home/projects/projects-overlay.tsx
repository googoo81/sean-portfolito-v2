"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { ProjectDetailView } from "@/features/portfolio/components/work/project-detail-view";
import { ProjectListView } from "@/features/portfolio/components/work/project-list-view";
import {
  parseProjectsSlug,
  writeProjectsDetailHash,
  writeProjectsListHash,
} from "./projects-hash";
import type { Project } from "@/features/portfolio/types";

export type ProjectsOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ProjectsOverlayProps = {
  open: boolean;
  origin: ProjectsOrigin;
  projects: readonly Project[];
  reducedMotion?: boolean;
  onClose: () => void;
  onExited: () => void;
};

const WINDOW_OPEN = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 1,
} as const;

const WINDOW_CLOSE = {
  type: "tween",
  duration: 0.28,
  ease: [0.32, 0, 0.67, 0],
} as const;

const CARD_RADIUS = 32;

function Titlebar({
  title,
  onClose,
  onBack,
  onForward,
  canForward,
  withIndex = false,
}: {
  title: string;
  onClose: () => void;
  onBack: () => void;
  onForward: () => void;
  canForward: boolean;
  withIndex?: boolean;
}) {
  const glyph = "pointer-events-none";

  return (
    <header
      className={
        withIndex
          ? "projects-overlay__titlebar projects-overlay__titlebar--with-index"
          : "projects-overlay__titlebar"
      }
    >
      <div className="projects-overlay__lights">
        <button
          type="button"
          aria-label="닫기"
          className="projects-overlay__light projects-overlay__light--close"
          onClick={onClose}
        >
          <svg viewBox="0 0 12 12" className={glyph} fill="none">
            <path
              d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
              stroke="#4d0000"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="홈으로"
          className="projects-overlay__light projects-overlay__light--min"
          onClick={onClose}
        >
          <svg viewBox="0 0 12 12" className={glyph} fill="none">
            <path
              d="M2.4 6h7.2"
              stroke="#995700"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span
          aria-hidden
          className="projects-overlay__light projects-overlay__light--zoom"
        >
          <svg viewBox="0 0 12 12" className={glyph}>
            <path fill="#006400" d="M6.4 2.7h2.9v2.9L6.4 2.7Z" />
            <path fill="#006400" d="M5.6 9.3H2.7V6.4L5.6 9.3Z" />
          </svg>
        </span>
      </div>

      <div className="projects-overlay__nav">
        <button
          type="button"
          aria-label="뒤로"
          className="projects-overlay__nav-btn"
          onClick={onBack}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3 5 8l5 5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="앞으로"
          className="projects-overlay__nav-btn"
          disabled={!canForward}
          onClick={onForward}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>

      <p id="projects-overlay-title" className="projects-overlay__title">
        {title}
      </p>
    </header>
  );
}

function projectFromHash(projects: readonly Project[]) {
  if (typeof window === "undefined") {
    return null;
  }

  const slug = parseProjectsSlug();
  return projects.find((project) => project.slug === slug) ?? null;
}

export function ProjectsOverlay({
  open,
  origin,
  projects,
  reducedMotion = false,
  onClose,
  onExited,
}: ProjectsOverlayProps) {
  const exitedRef = useRef(false);
  const handleClose = useDebouncedCallback(onClose);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<Project | null>(() =>
    projectFromHash(projects),
  );
  const [forwardSteps, setForwardSteps] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  const navDirection = useRef<"back" | "forward" | null>(null);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setSelected(projectFromHash(projects));
      setForwardSteps(0);
    }
  }

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (parseProjectsSlug()) {
        navDirection.current = "back";
        setForwardSteps((steps) => steps + 1);
        history.back();
        return;
      }

      handleClose();
    };

    const onPopState = () => {
      setSelected(projectFromHash(projects));

      if (navDirection.current === "back" || navDirection.current === "forward") {
        navDirection.current = null;
        return;
      }

      setForwardSteps((steps) => steps + 1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-projects-open", "");
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-projects-open");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [handleClose, projects]);

  const fromCard = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return {
        x: origin.x,
        y: origin.y,
        scaleX: 1,
        scaleY: 1,
        borderRadius: CARD_RADIUS,
      };
    }

    const scaleX = origin.width / viewport.width;
    const scaleY = origin.height / viewport.height;

    return {
      x: origin.x,
      y: origin.y,
      scaleX,
      scaleY,
      borderRadius: CARD_RADIUS / scaleX,
    };
  }, [origin, viewport]);

  const shown = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    borderRadius: 0,
  };

  const handleSelect = useDebouncedCallback((project: Project) => {
    setForwardSteps(0);
    setSelected(project);
    writeProjectsDetailHash(project.slug);
  });

  const handleBackToList = () => {
    setForwardSteps(0);
    setSelected(null);
    writeProjectsListHash();
  };

  const handleBack = () => {
    navDirection.current = "back";
    setForwardSteps((steps) => steps + 1);
    history.back();
  };

  const handleForward = () => {
    if (forwardSteps === 0) {
      return;
    }

    navDirection.current = "forward";
    setForwardSteps((steps) => steps - 1);
    history.forward();
  };

  if (!viewport.width) {
    return null;
  }

  return createPortal(
    <div className="projects-overlay">
      <motion.div
        className="projects-overlay__backdrop"
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
        onClick={open ? handleClose : undefined}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-overlay-title"
        className="projects-overlay__window"
        style={{
          left: 0,
          top: 0,
          width: viewport.width,
          height: viewport.height,
        }}
        initial={reducedMotion ? shown : fromCard}
        animate={open ? shown : fromCard}
        transition={
          reducedMotion ? { duration: 0 } : open ? WINDOW_OPEN : WINDOW_CLOSE
        }
        onAnimationComplete={() => {
          if (open) {
            exitedRef.current = false;
            return;
          }

          if (exitedRef.current) {
            return;
          }

          exitedRef.current = true;
          onExited();
        }}
      >
        <motion.div
          className="projects-overlay__face"
          initial={{ opacity: 1 }}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
        >
          <p className="text-sm font-medium tracking-[0.18em] text-foreground uppercase">
            💻 Projects.
          </p>
        </motion.div>
        <motion.div
          className="projects-overlay__content"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          style={{ pointerEvents: open ? "auto" : "none" }}
          transition={{
            duration: reducedMotion ? 0 : 0.22,
            delay: open && !reducedMotion ? 0.14 : 0,
          }}
        >
          <Titlebar
            title={selected ? selected.shortTitle : "Projects."}
            onClose={handleClose}
            onBack={handleBack}
            onForward={handleForward}
            canForward={forwardSteps > 0}
            withIndex
          />
          <div className="projects-overlay__body projects-overlay__body--split">
            {selected ? (
              <ProjectDetailView
                project={selected}
                projects={projects}
                onSelect={handleSelect}
                onBackToList={handleBackToList}
              />
            ) : (
              <ProjectListView
                projects={projects}
                onSelect={handleSelect}
                onBackToList={handleBackToList}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>,
    document.body,
  );
}
