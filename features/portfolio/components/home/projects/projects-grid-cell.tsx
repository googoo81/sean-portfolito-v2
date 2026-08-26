"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BentoCard } from "@/components/ui";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { ProjectsOrigin } from "./projects-overlay";
import {
  beginProjectsSession,
  closeProjectsHistory,
  isProjectsHash,
  restoreProjectsSession,
  writeProjectsListHash,
} from "./projects-hash";
import type { Project } from "@/features/portfolio/types";

const ProjectsOverlay = dynamic(
  () => import("./projects-overlay").then((mod) => mod.ProjectsOverlay),
  { ssr: false },
);

function prefetchProjectsOverlay() {
  void import("./projects-overlay");
}

type ProjectsGridCellProps = {
  className?: string;
  projects: readonly Project[];
};

function GoArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
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

function readProjectsOrigin(node: HTMLElement | null): ProjectsOrigin | null {
  const bounds = node?.getBoundingClientRect();
  if (!bounds) {
    return null;
  }

  return {
    x: bounds.left,
    y: bounds.top,
    width: bounds.width,
    height: bounds.height,
  };
}

export function ProjectsGridCell({
  className,
  projects,
}: ProjectsGridCellProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const originRef = useRef<ProjectsOrigin | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<ProjectsOrigin | null>(null);
  const [skipEnter, setSkipEnter] = useState(false);
  originRef.current = origin;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!isProjectsHash()) {
        return;
      }

      const nextOrigin = readProjectsOrigin(cardRef.current) ?? {
        x: window.innerWidth / 2 - 80,
        y: window.innerHeight / 2 - 80,
        width: 160,
        height: 160,
      };

      setOrigin(nextOrigin);
      setSkipEnter(true);
      setOpen(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (isProjectsHash()) {
        restoreProjectsSession();
        const nextOrigin =
          originRef.current ??
          readProjectsOrigin(cardRef.current) ?? {
            x: window.innerWidth / 2 - 80,
            y: window.innerHeight / 2 - 80,
            width: 160,
            height: 160,
          };

        setOrigin(nextOrigin);
        setSkipEnter(true);
        setOpen(true);
        return;
      }

      setOpen(false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleOpen = useDebouncedCallback(() => {
    const nextOrigin = readProjectsOrigin(cardRef.current);
    if (!nextOrigin) {
      return;
    }

    setSkipEnter(false);
    setOrigin(nextOrigin);
    setOpen(true);
    beginProjectsSession();
    writeProjectsListHash();
  });

  const handleClose = useCallback(() => {
    setOpen(false);
    closeProjectsHistory();
  }, []);

  const handleExited = useCallback(() => {
    setOrigin(null);
  }, []);

  return (
    <>
      <BentoCard className={className}>
        <button
          ref={cardRef}
          type="button"
          aria-label="모든 프로젝트"
          aria-expanded={open}
          className="flex h-full min-h-48 w-full cursor-pointer flex-col items-center justify-center gap-4 p-5"
          onPointerEnter={prefetchProjectsOverlay}
          onFocus={prefetchProjectsOverlay}
          onClick={handleOpen}
        >
          <p className="text-sm font-medium tracking-[0.18em] text-foreground uppercase">
            💻 Projects.
          </p>
          <span
            className="bento-projects__go flex size-10 items-center justify-center rounded-full border border-line bg-soft text-foreground"
            aria-hidden
          >
            <span className="bento-projects__go-icons">
              <GoArrow />
              <GoArrow />
            </span>
          </span>
        </button>
      </BentoCard>

      {origin ? (
        <ProjectsOverlay
          open={open}
          origin={origin}
          projects={projects}
          reducedMotion={reducedMotion || skipEnter}
          onClose={handleClose}
          onExited={handleExited}
        />
      ) : null}
    </>
  );
}
