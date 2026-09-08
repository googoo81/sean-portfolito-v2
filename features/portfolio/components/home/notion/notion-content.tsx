"use client";

import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";
import { useUi } from "@/features/portfolio/i18n";
import { getCurrentTheme, type Theme } from "@/lib/theme";
import { notionStaticPath } from "@/lib/notion";
import "react-notion-x/src/styles.css";
import "./notion-content.css";

type NotionContentProps = {
  pageId: string;
  onTitle?: (title: string) => void;
};

export function NotionContent({ pageId, onTitle }: NotionContentProps) {
  const ui = useUi();
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(getCurrentTheme());

    const observer = new MutationObserver(() => {
      setTheme(getCurrentTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setRecordMap(null);
    setError(false);

    fetch(notionStaticPath(pageId))
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Notion page (${response.status})`);
        }
        return response.json() as Promise<ExtendedRecordMap>;
      })
      .then((map) => {
        if (cancelled) {
          return;
        }
        setRecordMap(map);
        const title = getPageTitle(map)?.trim();
        if (title) {
          onTitle?.(title);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pageId, onTitle]);

  if (error) {
    return <p className="notion-overlay__status">{ui.notion.error}</p>;
  }

  if (!recordMap) {
    return <p className="notion-overlay__status">{ui.notion.loading}</p>;
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      darkMode={theme === "dark"}
      disableHeader
      mapPageUrl={(id) => `https://www.notion.so/${id.replaceAll("-", "")}`}
      rootPageId={pageId}
      className="notion-overlay__renderer"
    />
  );
}
