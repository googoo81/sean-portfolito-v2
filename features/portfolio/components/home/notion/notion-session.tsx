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
import {
  beginNotionSession,
  closeNotionHistory,
  isNotionHash,
  parseNotionPageId,
  restoreNotionSession,
  writeNotionHash,
} from "./notion-hash";

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

function notionUrlFromPageId(pageId: string) {
  return `https://www.notion.so/${pageId.replaceAll("-", "")}`;
}

export function NotionSessionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState<ProjectsOrigin | null>(null);
  const openRef = useRef(open);
  const originRef = useRef(origin);
  openRef.current = open;
  originRef.current = origin;

  const reveal = useCallback(
    (
      next: {
        pageId: string;
        pageUrl: string;
        title: string;
        origin: ProjectsOrigin;
      },
    ) => {
      setPageId(next.pageId);
      setPageUrl(next.pageUrl);
      setTitle(next.title);
      setOrigin(next.origin);
      setOpen(true);
    },
    [],
  );

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

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const restoredId = parseNotionPageId();
      if (!restoredId || !isNotionHash()) {
        return;
      }

      restoreNotionSession();
      reveal({
        pageId: restoredId,
        pageUrl: notionUrlFromPageId(restoredId),
        title: "Notion",
        origin: fallbackProjectsOrigin(),
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [reveal]);

  useEffect(() => {
    const onPopState = () => {
      if (isNotionHash()) {
        restoreNotionSession();
        const restoredId = parseNotionPageId();
        if (restoredId && !openRef.current) {
          reveal({
            pageId: restoredId,
            pageUrl: notionUrlFromPageId(restoredId),
            title: "Notion",
            origin: originRef.current ?? fallbackProjectsOrigin(),
          });
        }
        return;
      }

      setOpen(false);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [reveal]);

  const openNotion = useDebouncedCallback((options: OpenNotionOptions) => {
    const id = notionPageIdFromUrl(options.url);
    if (!id) {
      window.open(options.url, "_blank", "noopener,noreferrer");
      return;
    }

    blurActiveElement();
    reveal({
      pageId: id,
      pageUrl: options.url,
      title: options.title,
      origin: options.origin ?? fallbackProjectsOrigin(),
    });
    beginNotionSession();
    writeNotionHash(id);
  });

  const handleClose = useCallback(() => {
    setOpen(false);
    closeNotionHistory();
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
