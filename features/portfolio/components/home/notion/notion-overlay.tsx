"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { useUi } from "@/features/portfolio/i18n";
import {
  CloseLightIcon,
  ExpandLightIcon,
  HistoryNav,
  MinLightIcon,
  ZoomLightIcon,
} from "@/features/portfolio/components/work/projects-chrome";
import { RESIZE_EDGES } from "@/features/portfolio/components/home/stack/notes-window";
import { useProjectsWindow } from "@/features/portfolio/components/home/projects/use-projects-window";
import type { ProjectsOrigin } from "@/features/portfolio/components/home/projects/projects-origin";
import { NotionContent } from "./notion-content";
import { NotionTabBar } from "./notion-tab-bar";
import { canNotionBack, canNotionForward } from "./notion-hash";
import type { NotionTab } from "./notion-tabs";
import "../projects/projects-overlay.css";
import "./notion-content.css";

type NotionOverlayProps = {
  open: boolean;
  pageId: string;
  pageUrl: string;
  title: string;
  tabs: NotionTab[];
  origin: ProjectsOrigin;
  reducedMotion?: boolean;
  skipEnter?: boolean;
  onClose: () => void;
  onExited: () => void;
  onSelectTab: (tab: NotionTab) => void;
  onTitle: (pageId: string, title: string) => void;
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

const WINDOW_RADIUS = 12;
const shownWindow = { x: 0, y: 0, scale: 1 };

function NotionBrowserChrome({
  maximized,
  tabs,
  activePageId,
  onClose,
  onZoom,
  onMovePointerDown,
  onSelectTab,
}: {
  maximized: boolean;
  tabs: NotionTab[];
  activePageId: string;
  onClose: () => void;
  onZoom: () => void;
  onMovePointerDown: (event: PointerEvent<HTMLElement>) => void;
  onSelectTab: (tab: NotionTab) => void;
}) {
  const ui = useUi();
  const zoomLabel = maximized ? ui.chrome.restore : ui.chrome.maximize;

  return (
    <div
      className="notion-overlay__chrome"
      onPointerDown={onMovePointerDown}
      onDoubleClick={onZoom}
    >
      <div
        className="projects-overlay__lights"
        onPointerDown={(event) => event.stopPropagation()}
        onDoubleClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={ui.chrome.close}
          className="projects-overlay__light projects-overlay__light--close"
          onClick={onClose}
        >
          <CloseLightIcon />
        </button>
        <button
          type="button"
          aria-label={ui.chrome.home}
          className="projects-overlay__light projects-overlay__light--min"
          onClick={onClose}
        >
          <MinLightIcon />
        </button>
        <button
          type="button"
          aria-label={zoomLabel}
          className="projects-overlay__light projects-overlay__light--zoom"
          onClick={onZoom}
        >
          {maximized ? <ExpandLightIcon /> : <ZoomLightIcon />}
        </button>
      </div>

      <HistoryNav
        canBack={canNotionBack()}
        canForward={canNotionForward()}
        onBack={() => history.back()}
        onForward={() => history.forward()}
      />

      <NotionTabBar
        tabs={tabs}
        activePageId={activePageId}
        ariaLabel={ui.notion.tabsAria}
        onSelect={onSelectTab}
      />
    </div>
  );
}

export function NotionOverlay({
  open,
  pageId,
  pageUrl,
  title,
  tabs,
  origin,
  reducedMotion = false,
  skipEnter = false,
  onClose,
  onExited,
  onSelectTab,
  onTitle,
}: NotionOverlayProps) {
  const exitedRef = useRef(false);
  const skipOpenMotion = reducedMotion || skipEnter;
  const handleClose = useDebouncedCallback(onClose);
  const {
    frame,
    dragging,
    isMaximized,
    startMove,
    startResize,
    toggleMaximize,
  } = useProjectsWindow(open);
  const [displayTitle, setDisplayTitle] = useState(title);
  const [settled, setSettled] = useState(skipOpenMotion);
  const [contentReady, setContentReady] = useState(skipOpenMotion);
  const onTitleRef = useRef(onTitle);
  onTitleRef.current = onTitle;

  useEffect(() => {
    setDisplayTitle(title);
  }, [title, pageId]);

  const handleContentTitle = useCallback(
    (nextTitle: string) => {
      setDisplayTitle(nextTitle);
      onTitleRef.current(pageId, nextTitle);
    },
    [pageId],
  );

  const fromCard = useMemo(() => {
    const originCenterX = origin.x + origin.width / 2;
    const originCenterY = origin.y + origin.height / 2;
    const targetCenterX = frame.x + frame.width / 2;
    const targetCenterY = frame.y + frame.height / 2;

    return {
      x: originCenterX - targetCenterX,
      y: originCenterY - targetCenterY,
      scale: Math.max(
        Math.min(origin.width / Math.max(frame.width, 1), 1),
        0.08,
      ),
    };
  }, [origin, frame]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-notion-open", "");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-notion-open");
      document.documentElement.removeAttribute("data-notion-settled");
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setSettled(false);
      document.documentElement.removeAttribute("data-notion-settled");
      return;
    }

    const delay = skipOpenMotion ? 0 : Math.round(WINDOW_ZOOM.duration * 1000);
    const id = window.setTimeout(() => {
      setSettled(true);
      setContentReady(true);
      document.documentElement.setAttribute("data-notion-settled", "");
    }, delay);

    return () => window.clearTimeout(id);
  }, [open, skipOpenMotion]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  const finishExit = () => {
    if (open || exitedRef.current) {
      return;
    }
    exitedRef.current = true;
    onExited();
  };

  if (!frame.width) {
    return null;
  }

  return createPortal(
    <div className="projects-overlay notion-overlay">
      <motion.div
        className="projects-overlay__backdrop"
        initial={{ opacity: skipOpenMotion ? 1 : 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: skipOpenMotion ? 0 : 0.24, ease: "easeOut" }}
        onClick={open ? handleClose : undefined}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={displayTitle}
        aria-labelledby="notion-overlay-title"
        className={`projects-overlay__window${
          settled && !dragging && !reducedMotion
            ? " projects-overlay__window--smooth"
            : ""
        }`}
        style={{
          left: frame.x,
          top: frame.y,
          width: frame.width,
          height: frame.height,
          borderRadius: isMaximized ? 0 : WINDOW_RADIUS,
        }}
        initial={skipOpenMotion ? shownWindow : fromCard}
        animate={open ? shownWindow : fromCard}
        transition={
          skipOpenMotion || dragging
            ? { duration: 0 }
            : open
              ? WINDOW_ZOOM
              : WINDOW_CLOSE
        }
        onAnimationComplete={finishExit}
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
          animate={{ opacity: open && contentReady ? 0 : 1 }}
          transition={{ duration: skipOpenMotion ? 0 : 0.18 }}
        >
          <p className="project-kicker">📝 Notion.</p>
        </motion.div>
        {contentReady ? (
          <motion.div
            className="projects-overlay__content"
            initial={{ opacity: skipOpenMotion ? 1 : 0 }}
            animate={{ opacity: open ? 1 : 0 }}
            style={{ pointerEvents: open ? "auto" : "none" }}
            transition={{ duration: skipOpenMotion ? 0 : 0.2 }}
          >
            <NotionBrowserChrome
              maximized={isMaximized}
              tabs={tabs}
              activePageId={pageId}
              onClose={handleClose}
              onZoom={toggleMaximize}
              onMovePointerDown={startMove}
              onSelectTab={onSelectTab}
            />
            <h2 id="notion-overlay-title" className="sr-only">
              {displayTitle}
            </h2>
            <div className="notion-overlay__scroll">
              <NotionContent
                key={pageId}
                pageId={pageId}
                pageUrl={pageUrl}
                onTitle={handleContentTitle}
                onHome={handleClose}
              />
            </div>
          </motion.div>
        ) : null}
      </motion.div>
    </div>,
    document.body,
  );
}
