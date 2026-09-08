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
import { notionPageIdFromUrl } from "@/lib/notion";
import {
  fallbackProjectsOrigin,
  type ProjectsOrigin,
} from "@/features/portfolio/components/home/projects/projects-origin";

const NotionOverlay = dynamic(
  () => import("./notion-overlay").then((mod) => mod.NotionOverlay),
  { ssr: false },
);

export function prefetchNotionOverlay() {
  void import("./notion-overlay");
}

type OpenNotionOptions = {
  url: string;
  title: string;
  origin?: ProjectsOrigin;
};

type NotionSessionValue = {
  open: boolean;
  openNotion: (options: OpenNotionOptions) => void;
};

const NotionSessionContext = createContext<NotionSessionValue | null>(null);

export function useNotionSession() {
  const value = useContext(NotionSessionContext);
  if (!value) {
    throw new Error("useNotionSession must be used within NotionSessionProvider");
  }
  return value;
}

export function NotionSessionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState<ProjectsOrigin | null>(null);
  const openRef = useRef(open);
  openRef.current = open;

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
        () => prefetchNotionOverlay(),
        { timeout: 2000 },
      );
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => prefetchNotionOverlay(), 600);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const openNotion = useDebouncedCallback((options: OpenNotionOptions) => {
    const id = notionPageIdFromUrl(options.url);
    if (!id) {
      window.open(options.url, "_blank", "noopener,noreferrer");
      return;
    }

    blurActiveElement();
    setPageId(id);
    setPageUrl(options.url);
    setTitle(options.title);
    setOrigin(options.origin ?? fallbackProjectsOrigin());
    setOpen(true);
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleExited = useCallback(() => {
    setPageId(null);
    setPageUrl("");
    setOrigin(null);
    setTitle("");
  }, []);

  return (
    <NotionSessionContext.Provider value={{ open, openNotion }}>
      {children}
      {pageId && origin && pageUrl ? (
        <NotionOverlay
          open={open}
          pageId={pageId}
          pageUrl={pageUrl}
          title={title}
          origin={origin}
          reducedMotion={reducedMotion}
          onClose={handleClose}
          onExited={handleExited}
        />
      ) : null}
    </NotionSessionContext.Provider>
  );
}
