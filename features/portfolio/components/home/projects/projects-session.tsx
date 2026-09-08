"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { blurActiveElement } from "@/lib/blur-active-element";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import {
  beginProjectsSession,
  closeProjectsHistory,
  isProjectsHash,
  parseProjectsSlug,
  restoreProjectsSession,
  writeProjectsDetailHash,
  writeProjectsListHash,
} from "./projects-hash";
import { restoreProjectsOrigin, type ProjectsOrigin } from "./projects-origin";
import type { Project } from "@/features/portfolio/types";
import type { ProjectKindFilter } from "@/features/portfolio/lib/project-list";

const ProjectsOverlay = dynamic(
  () => import("./projects-overlay").then((mod) => mod.ProjectsOverlay),
  { ssr: false },
);

export function prefetchProjectsOverlay() {
  void import("./projects-overlay");
}

type OpenProjectsOptions = {
  origin: ProjectsOrigin;
  slug?: string;
  kind?: ProjectKindFilter;
};

type ProjectsSessionValue = {
  open: boolean;
  openProjects: (options: OpenProjectsOptions) => void;
};

const ProjectsSessionContext = createContext<ProjectsSessionValue | null>(null);

export function useProjectsSession() {
  const value = useContext(ProjectsSessionContext);
  if (!value) {
    throw new Error(
      "useProjectsSession must be used within ProjectsSessionProvider",
    );
  }
  return value;
}

export function ProjectsSessionProvider({
  projects,
  children,
}: {
  projects: readonly Project[];
  children: ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<ProjectsOrigin | null>(null);
  const [listKind, setListKind] = useState<ProjectKindFilter>("all");
  const [skipEnter, setSkipEnter] = useState(false);
  const originRef = useRef(origin);
  const openRef = useRef(open);
  originRef.current = origin;
  openRef.current = open;

  const reveal = useCallback((nextOrigin: ProjectsOrigin, instant: boolean) => {
    setSkipEnter(instant);
    setOrigin(nextOrigin);
    setOpen(true);
  }, []);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(
        () => prefetchProjectsOverlay(),
        { timeout: 1500 },
      );
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => prefetchProjectsOverlay(), 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!isProjectsHash()) {
        return;
      }

      reveal(
        restoreProjectsOrigin(parseProjectsSlug() ? "featured" : "cell"),
        true,
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [reveal]);

  useEffect(() => {
    const onPopState = () => {
      if (isProjectsHash()) {
        restoreProjectsSession();
        if (!openRef.current) {
          reveal(
            originRef.current ??
              restoreProjectsOrigin(parseProjectsSlug() ? "featured" : "cell"),
            true,
          );
        }
        return;
      }

      setOpen(false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [reveal]);

  const openProjects = useDebouncedCallback((options: OpenProjectsOptions) => {
    blurActiveElement();

    setListKind(options.kind ?? "all");
    reveal(options.origin, false);
    beginProjectsSession();
    if (options.slug) {
      writeProjectsDetailHash(options.slug);
    } else {
      writeProjectsListHash();
    }
  });

  const handleClose = useCallback(() => {
    setSkipEnter(false);
    setOpen(false);
    closeProjectsHistory();
  }, []);

  const handleExited = useCallback(() => {
    setOrigin(null);
    setListKind("all");
  }, []);

  return (
    <ProjectsSessionContext.Provider value={{ open, openProjects }}>
      {children}
      {origin ? (
        <ProjectsOverlay
          open={open}
          origin={origin}
          projects={projects}
          initialKind={listKind}
          reducedMotion={reducedMotion}
          skipEnter={skipEnter}
          onClose={handleClose}
          onExited={handleExited}
        />
      ) : null}
    </ProjectsSessionContext.Provider>
  );
}
