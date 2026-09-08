"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { blurActiveElement } from "@/lib/blur-active-element";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { notionPageIdFromUrl } from "@/lib/notion";
import { usePortfolio } from "@/features/portfolio/i18n";
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
import {
  collectNotionTabs,
  loadNotionTabMeta,
  type NotionTab,
} from "./notion-tabs";

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

function compactPageId(pageId: string) {
  return pageId.replaceAll("-", "");
}

export function NotionSessionProvider({ children }: { children: ReactNode }) {
  const portfolio = usePortfolio();
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState<ProjectsOrigin | null>(null);
  const [skipEnter, setSkipEnter] = useState(false);
  const [tabs, setTabs] = useState<NotionTab[]>(() =>
    collectNotionTabs(portfolio),
  );
  const openRef = useRef(open);
  const originRef = useRef(origin);
  const pageIdRef = useRef(pageId);
  const tabsRef = useRef(tabs);
  openRef.current = open;
  originRef.current = origin;
  pageIdRef.current = pageId;
  tabsRef.current = tabs;

  const baseTabs = useMemo(() => collectNotionTabs(portfolio), [portfolio]);
  const baseTabsRef = useRef(baseTabs);
  baseTabsRef.current = baseTabs;

  useEffect(() => {
    setTabs((prev) => {
      const metaById = new Map(prev.map((tab) => [tab.pageId, tab]));
      return baseTabs.map((tab) => {
        const prior = metaById.get(tab.pageId);
        return prior
          ? { ...tab, title: prior.title, iconUrl: prior.iconUrl }
          : tab;
      });
    });
  }, [baseTabs]);

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      baseTabs.map(async (tab) => {
        const meta = await loadNotionTabMeta(tab.pageId);
        return { pageId: tab.pageId, ...meta };
      }),
    ).then((metas) => {
      if (cancelled) {
        return;
      }
      setTabs((prev) => {
        let changed = false;
        const next = prev.map((tab) => {
          const meta = metas.find((item) => item.pageId === tab.pageId);
          if (!meta?.iconUrl || meta.iconUrl === tab.iconUrl) {
            return tab;
          }
          changed = true;
          return { ...tab, iconUrl: meta.iconUrl };
        });
        return changed ? next : prev;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [baseTabs]);

  const reveal = useCallback(
    (
      next: {
        pageId: string;
        pageUrl: string;
        title: string;
        origin: ProjectsOrigin;
      },
      instant: boolean,
    ) => {
      const compact = compactPageId(next.pageId);
      setSkipEnter(instant);
      setPageId(compact);
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
      const compact = compactPageId(restoredId);
      const known = baseTabsRef.current.find((tab) => tab.pageId === compact);
      reveal(
        {
          pageId: compact,
          pageUrl: known?.url ?? notionUrlFromPageId(compact),
          title: known?.title ?? "Notion",
          origin: fallbackProjectsOrigin(),
        },
        true,
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [reveal]);

  useEffect(() => {
    const onPopState = () => {
      if (isNotionHash()) {
        restoreNotionSession();
        const restoredId = parseNotionPageId();
        if (!restoredId) {
          return;
        }

        const compact = compactPageId(restoredId);
        const known =
          tabsRef.current.find((tab) => tab.pageId === compact) ??
          baseTabsRef.current.find((tab) => tab.pageId === compact);

        if (!openRef.current) {
          reveal(
            {
              pageId: compact,
              pageUrl: known?.url ?? notionUrlFromPageId(compact),
              title: known?.title ?? "Notion",
              origin: originRef.current ?? fallbackProjectsOrigin(),
            },
            true,
          );
          return;
        }

        if (pageIdRef.current === compact) {
          return;
        }

        setPageId(compact);
        setPageUrl(known?.url ?? notionUrlFromPageId(compact));
        if (known?.title) {
          setTitle(known.title);
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

    const compact = compactPageId(id);
    blurActiveElement();

    if (openRef.current) {
      setPageId(compact);
      setPageUrl(options.url);
      setTitle(options.title);
      writeNotionHash(compact);
      return;
    }

    reveal(
      {
        pageId: compact,
        pageUrl: options.url,
        title: options.title,
        origin: options.origin ?? fallbackProjectsOrigin(),
      },
      false,
    );
    beginNotionSession();
    writeNotionHash(compact);
  });

  const switchTab = useCallback((tab: NotionTab) => {
    const compact = compactPageId(tab.pageId);
    if (pageIdRef.current === compact) {
      return;
    }
    setPageId(compact);
    setPageUrl(tab.url);
    setTitle(tab.title);
    writeNotionHash(compact);
  }, []);

  const handleTitle = useCallback((forPageId: string, nextTitle: string) => {
    const compact = compactPageId(forPageId);
    if (pageIdRef.current === compact) {
      setTitle((current) => (current === nextTitle ? current : nextTitle));
    }
  }, []);

  const handleClose = useCallback(() => {
    setSkipEnter(false);
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
          tabs={tabs}
          origin={origin}
          reducedMotion={reducedMotion}
          skipEnter={skipEnter}
          onClose={handleClose}
          onExited={handleExited}
          onSelectTab={switchTab}
          onTitle={handleTitle}
        />
      ) : null}
    </NotionSessionContext.Provider>
  );
}
