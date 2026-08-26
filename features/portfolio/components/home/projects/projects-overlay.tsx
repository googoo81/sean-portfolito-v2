"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { ProjectDetailBody } from "@/features/portfolio/components/work/project-detail-view";
import { ProjectListBody } from "@/features/portfolio/components/work/project-list-view";
import { ProjectsSplitShell } from "@/features/portfolio/components/work/projects-split-shell";
import { useHistoryPager } from "@/features/portfolio/components/work/use-history-pager";
import {
  HistoryNav,
  WindowTitlebar,
} from "@/features/portfolio/components/work/projects-chrome";
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
  const pager = useHistoryPager();
  const { back, syncPopState } = pager;
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<Project | null>(() =>
    projectFromHash(projects),
  );
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setSelected(projectFromHash(projects));
      pager.reset();
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
        back();
        return;
      }

      handleClose();
    };

    const onPopState = () => {
      setSelected(projectFromHash(projects));
      syncPopState();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [back, handleClose, open, projects, syncPopState]);

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
    pager.reset();
    setSelected(project);
    writeProjectsDetailHash(project.slug);
  });

  const handleBackToList = () => {
    pager.reset();
    setSelected(null);
    writeProjectsListHash();
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
          <WindowTitlebar
            title={selected ? selected.shortTitle : "Projects."}
            titleId="projects-overlay-title"
            onClose={handleClose}
          >
            <HistoryNav
              canForward={pager.canForward}
              onBack={pager.back}
              onForward={pager.forward}
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
