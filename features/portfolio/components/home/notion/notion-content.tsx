"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ComponentType,
  type AnchorHTMLAttributes,
} from "react";
import dynamic from "next/dynamic";
import { Breadcrumbs, NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap, Block } from "notion-types";
import { getPageTitle } from "notion-utils";
import { useUi } from "@/features/portfolio/i18n";
import { getCurrentTheme, type Theme } from "@/lib/theme";
import { notionStaticPath } from "@/lib/notion";
import "react-notion-x/src/styles.css";
import "./notion-content.css";

const Collection = dynamic(() =>
  import("react-notion-x/third-party/collection").then((mod) => mod.Collection),
);
const Modal = dynamic(() =>
  import("react-notion-x/third-party/modal").then((mod) => mod.Modal),
);

type NotionContentProps = {
  pageId: string;
  pageUrl: string;
  onTitle?: (title: string) => void;
  onHome?: () => void;
};

type NotionHeaderProps = {
  block: Block;
};

export function NotionContent({
  pageId,
  pageUrl,
  onTitle,
  onHome,
}: NotionContentProps) {
  const ui = useUi();
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const onTitleRef = useRef(onTitle);
  onTitleRef.current = onTitle;

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
          onTitleRef.current?.(title);
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
  }, [pageId]);

  const components = useMemo(() => {
    function Header({ block }: NotionHeaderProps) {
      return (
        <header className="notion-header">
          <div className="notion-nav-header">
            <Breadcrumbs block={block} />
          </div>
        </header>
      );
    }

    function PageLink({
      href,
      className,
      style,
      children,
      ...rest
    }: AnchorHTMLAttributes<HTMLAnchorElement>) {
      const goesHome = href === "/" || href?.startsWith("/?");

      if (goesHome) {
        return (
          <a
            {...rest}
            href="/"
            className={className}
            style={style}
            onClick={(event) => {
              event.preventDefault();
              onHome?.();
              if (window.location.pathname !== "/") {
                window.location.assign("/");
              }
            }}
          >
            {children}
          </a>
        );
      }

      return (
        <a href={href} className={className} style={style} {...rest}>
          {children}
        </a>
      );
    }

    return {
      Header: Header as ComponentType,
      PageLink: PageLink as ComponentType,
      Collection,
      Modal,
    } satisfies ComponentProps<typeof NotionRenderer>["components"];
  }, [onHome]);

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
      components={components}
      mapPageUrl={(id) => {
        const compact = id.replaceAll("-", "");
        if (compact === pageId.replaceAll("-", "")) {
          return pageUrl;
        }
        // Parent / workspace crumbs → home
        return "/";
      }}
      rootPageId={pageId}
      isImageZoomable
      className="notion-overlay__renderer"
    />
  );
}
