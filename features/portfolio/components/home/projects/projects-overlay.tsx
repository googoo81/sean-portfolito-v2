"use client";

import { useEffect, useRef, useState } from "react";
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

const CARD_RADIUS = 32;
const WINDOW_RADIUS = 20;

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
  const {
    frame,
    dragging,
    isMaximized,
    startMove,
    startResize,
    toggleMaximize,
  } = useProjectsWindow(open);
  const [selected, setSelected] = useState<Project | null>(() =>
    projectFromHash(projects),
  );
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setSelected(projectFromHash(projects));
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-projects-open", "");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-projects-open");
    };
  }, []);

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
      setSelected(projectFromHash(projects));
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [handleClose, open, projects]);

  const fromCard = {
    left: origin.x,
    top: origin.y,
    width: origin.width,
    height: origin.height,
    borderRadius: CARD_RADIUS,
  };

  const openFrame = {
    left: frame.x,
    top: frame.y,
    width: frame.width,
    height: frame.height,
    borderRadius: isMaximized ? 0 : WINDOW_RADIUS,
  };

  const handleSelect = useDebouncedCallback((project: Project) => {
    setSelected(project);
    writeProjectsDetailHash(project.slug);
  });

  const handleBackToList = () => {
    setSelected(null);
    writeProjectsListHash();
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
        className="projects-overlay__window projects-shell"
        initial={reducedMotion ? openFrame : fromCard}
        animate={open ? openFrame : fromCard}
        transition={
          reducedMotion || dragging
            ? { duration: 0 }
            : open
              ? WINDOW_ZOOM
              : WINDOW_CLOSE
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
      </motion.div>
    </div>,
    document.body,
  );
}
