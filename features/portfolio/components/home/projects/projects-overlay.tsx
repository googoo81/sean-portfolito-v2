"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { ProjectDetailBody } from "@/features/portfolio/components/work/project-detail-view";
import { ProjectListBody } from "@/features/portfolio/components/work/project-list-view";
import { ProjectsSplitShell } from "@/features/portfolio/components/work/projects-split-shell";
import {
  HistoryNav,
  WindowTitlebar,
} from "@/features/portfolio/components/work/projects-chrome";
import { RESIZE_EDGES } from "@/features/portfolio/components/home/stack/notes-window";
import {
  canProjectsBack,
  canProjectsForward,
  isProjectsHash,
  parseProjectsSlug,
  restoreProjectsSession,
  writeProjectsDetailHash,
  writeProjectsListHash,
} from "./projects-hash";
import { useProjectsWindow } from "./use-projects-window";
import type { ProjectsOrigin } from "./projects-origin";
import type { Project } from "@/features/portfolio/types";

export type { ProjectsOrigin };

type ProjectsOverlayProps = {
  open: boolean;
  origin: ProjectsOrigin;
  projects: readonly Project[];
  reducedMotion?: boolean;
  skipEnter?: boolean;
  onClose: () => void;
  onExited: () => void;
};

const WINDOW_CLOSE = {
  type: "tween",
  duration: 0.28,
  ease: [0.32, 0, 0.67, 0],
} as const;

const WINDOW_ZOOM = {
  type: "tween",
  duration: 0.36,
  ease: [0.22, 1, 0.36, 1],
} as const;

const WINDOW_RADIUS = 20;
const shownWindow = { x: 0, y: 0, scale: 1 };

export function ProjectsOverlay({
  open,
  origin,
  projects,
  reducedMotion = false,
  skipEnter = false,
  onClose,
  onExited,
}: ProjectsOverlayProps) {
  const exitedRef = useRef(false);
  const closeStartedAtRef = useRef(0);
  const skipOpenMotion = reducedMotion || skipEnter;
  const handleClose = useDebouncedCallback(onClose);
  const {
    frame,
    dragging,
    isMaximized,
    startMove,
    startResize,
    toggleMaximize,
  } = useProjectsWindow(open);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(() =>
    parseProjectsSlug(),
  );
  const [wasOpen, setWasOpen] = useState(open);
  const [settled, setSettled] = useState(skipOpenMotion);
  const [contentReady, setContentReady] = useState(skipOpenMotion);
  const selected = selectedSlug
    ? (projects.find((project) => project.slug === selectedSlug) ?? null)
    : null;

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setSelectedSlug(parseProjectsSlug());
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-projects-open", "");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-projects-open");
      document.documentElement.removeAttribute("data-projects-settled");
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setSettled(false);
      document.documentElement.removeAttribute("data-projects-settled");
      return;
    }

    const delay = skipOpenMotion ? 0 : Math.round(WINDOW_ZOOM.duration * 1000);
    const id = window.setTimeout(() => {
      setSettled(true);
      setContentReady(true);
      document.documentElement.setAttribute("data-projects-settled", "");
    }, delay);

    return () => window.clearTimeout(id);
  }, [open, skipOpenMotion]);

  useEffect(() => {
    if (open) {
      exitedRef.current = false;
      return;
    }

    closeStartedAtRef.current = performance.now();
    const delay = reducedMotion
      ? 0
      : Math.round(WINDOW_CLOSE.duration * 1000) + 80;
    const id = window.setTimeout(() => {
      if (exitedRef.current) {
        return;
      }

      exitedRef.current = true;
      onExited();
    }, delay);

    return () => window.clearTimeout(id);
  }, [open, onExited, reducedMotion]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (parseProjectsSlug()) {
        history.back();
        return;
      }

      handleClose();
    };

    const onPopState = () => {
      if (!isProjectsHash()) {
        return;
      }

      restoreProjectsSession();
      setSelectedSlug(parseProjectsSlug());
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [handleClose, open, projects]);

  const fromCard = useMemo(() => {
    const originCenterX = origin.x + origin.width / 2;
    const originCenterY = origin.y + origin.height / 2;
    const targetCenterX = frame.x + frame.width / 2;
    const targetCenterY = frame.y + frame.height / 2;

    return {
      x: originCenterX - targetCenterX,
      y: originCenterY - targetCenterY,
      scale: Math.max(
        origin.width / frame.width,
        origin.height / frame.height,
        0.04,
      ),
    };
  }, [origin, frame]);

  const handleSelect = useDebouncedCallback((project: Project) => {
    setSelectedSlug(project.slug);
    writeProjectsDetailHash(project.slug);
  });

  const handleBackToList = () => {
    setSelectedSlug(undefined);
    writeProjectsListHash();
  };

  const finishExit = () => {
    if (open || exitedRef.current) {
      return;
    }

    const elapsed = performance.now() - closeStartedAtRef.current;
    if (elapsed < WINDOW_CLOSE.duration * 1000 * 0.8 && !reducedMotion) {
      return;
    }

    exitedRef.current = true;
    onExited();
  };

  if (!frame.width) {
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
        className={`projects-overlay__window projects-shell${
          settled && !dragging && !reducedMotion
            ? " projects-overlay__window--smooth"
            : ""
        }`}
        style={{
          left: frame.x,
          top: frame.y,
          width: frame.width,
          height: frame.height,
          borderRadius: isMaximized ? 0 : WINDOW_RADIUS,
        }}
        initial={skipOpenMotion ? shownWindow : fromCard}
        animate={open ? shownWindow : fromCard}
        transition={
          reducedMotion || dragging
            ? { duration: 0 }
            : open
              ? WINDOW_ZOOM
              : WINDOW_CLOSE
        }
        onAnimationComplete={finishExit}
      >
        {RESIZE_EDGES.map((edge) => (
          <div
            key={edge}
            className={`projects-overlay__handle projects-overlay__handle--${edge}`}
            onPointerDown={startResize(edge)}
          />
        ))}
        <motion.div
          className="projects-overlay__face"
          initial={{ opacity: 1 }}
          animate={{ opacity: open && contentReady ? 0 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
        >
          <p className="project-kicker">💻 Projects.</p>
        </motion.div>
        {contentReady ? (
          <motion.div
            className="projects-overlay__content"
            initial={{ opacity: 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            style={{ pointerEvents: open ? "auto" : "none" }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <WindowTitlebar
              title={selected ? selected.shortTitle : "Projects."}
              titleId="projects-overlay-title"
              onClose={handleClose}
              onZoom={toggleMaximize}
              onMovePointerDown={startMove}
              maximized={isMaximized}
            >
              <HistoryNav
                canBack={canProjectsBack()}
                canForward={canProjectsForward()}
                onBack={() => history.back()}
                onForward={() => history.forward()}
              />
            </WindowTitlebar>
            <div className="projects-overlay__body projects-overlay__body--split">
              <ProjectsSplitShell
                projects={projects}
                activeSlug={selected?.slug}
                onSelect={handleSelect}
                onBackToList={handleBackToList}
                scrollKey={selected?.slug ?? "list"}
              >
                {selected ? (
                  <ProjectDetailBody project={selected} />
                ) : (
                  <ProjectListBody
                    projects={projects}
                    onSelect={handleSelect}
                  />
                )}
              </ProjectsSplitShell>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </div>,
    document.body,
  );
}
