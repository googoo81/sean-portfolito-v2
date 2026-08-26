"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { ProjectIndex } from "./project-index";
import type { Project } from "@/features/portfolio/types";

type ProjectsSplitShellProps = {
  projects: readonly Project[];
  activeSlug?: string;
  scrollKey?: string;
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
  children: ReactNode;
};

const PAGE_TRANSITION = {
  duration: 0.26,
  ease: [0.4, 0, 0.2, 1],
} as const;

export function ProjectsSplitShell({
  projects,
  activeSlug,
  scrollKey = "list",
  onSelect,
  onBackToList,
  children,
}: ProjectsSplitShellProps) {
  const reducedMotion = usePrefersReducedMotion();
  const pane = scrollKey === "list" ? "list" : "detail";

  return (
    <div className="projects-overlay__detail-layout">
      <ProjectIndex
        projects={projects}
        activeSlug={activeSlug}
        onSelect={onSelect}
        onBackToList={onBackToList}
      />
      <div className="projects-overlay__detail-scroll">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pane}
            className="projects-overlay__page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : PAGE_TRANSITION}
          >
            <div key={scrollKey}>{children}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
