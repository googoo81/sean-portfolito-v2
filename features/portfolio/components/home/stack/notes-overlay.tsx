"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { StackItem } from "@/features/portfolio/types";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import { NotesSidebar } from "./notes-sidebar";
import { RESIZE_EDGES, type NotesOrigin } from "./notes-window";
import { useNotesWindow } from "./use-notes-window";

export type { NotesOrigin };

type NotesOverlayProps = {
  open: boolean;
  item: StackItem;
  items: readonly StackItem[];
  origin: NotesOrigin;
  reducedMotion?: boolean;
  onClose: () => void;
  onExited: () => void;
  onSelectItem: (item: StackItem) => void;
  onReorder: (fromId: string, toId: string) => void;
};

const WINDOW_SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.9,
} as const;

const WINDOW_CLOSE = {
  type: "tween",
  duration: 0.22,
  ease: [0.32, 0, 0.67, 0],
} as const;

const shownWindow = { x: 0, y: 0, scale: 1, opacity: 1 };

export function NotesOverlay({
  open,
  item,
  items,
  origin,
  reducedMotion = false,
  onClose,
  onExited,
  onSelectItem,
  onReorder,
}: NotesOverlayProps) {
  const exitedRef = useRef(false);
  const onCloseRef = useRef(onClose);
  const handleClose = useDebouncedCallback(onClose);
  const {
    frame,
    draft,
    visibleSidebarWidth,
    startMove,
    startResize,
    startSidebarResize,
    toggleMaximize,
    updateDraft,
  } = useNotesWindow(open, item);

  const fromIcon = useMemo(() => {
    const originCenterX = origin.x + origin.width / 2;
    const originCenterY = origin.y + origin.height / 2;
    const targetCenterX = frame.x + frame.width / 2;
    const targetCenterY = frame.y + frame.height / 2;

    return {
      x: originCenterX - targetCenterX,
      y: originCenterY - targetCenterY,
      scale: Math.max(origin.width / frame.width, 0.08),
      opacity: 1,
    };
  }, [origin, frame]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-notes-open", "");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-notes-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return createPortal(
    <div className="notes-overlay">
      <motion.div
        className="notes-overlay__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
        onClick={open ? handleClose : undefined}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="notes-overlay-title"
        className="notes-overlay__window flex overflow-hidden rounded-[1.25rem]"
        style={{
          left: frame.x,
          top: frame.y,
          width: frame.width,
          height: frame.height,
        }}
        initial={reducedMotion ? shownWindow : fromIcon}
        animate={open ? shownWindow : { ...fromIcon, opacity: 0 }}
        transition={
          reducedMotion ? { duration: 0 } : open ? WINDOW_SPRING : WINDOW_CLOSE
        }
        onAnimationComplete={() => {
          if (open || exitedRef.current) {
            return;
          }

          exitedRef.current = true;
          onExited();
        }}
      >
        {RESIZE_EDGES.map((edge) => (
          <div
            key={edge}
            className={`notes-overlay__handle notes-overlay__handle--${edge}`}
            onPointerDown={startResize(edge)}
          />
        ))}
        <NotesSidebar
          width={visibleSidebarWidth}
          items={items}
          selectedId={item.id}
          onClose={handleClose}
          onSelectItem={onSelectItem}
          onReorder={onReorder}
          onResizePointerDown={startSidebarResize}
        />

        <div
          className="flex min-w-0 flex-1 flex-col"
          style={{
            backgroundColor: "var(--notes-paper)",
            color: "var(--notes-ink)",
          }}
        >
          <div
            className="notes-overlay__titlebar flex items-center justify-center border-b border-line px-4 py-3"
            onPointerDown={startMove}
            onDoubleClick={toggleMaximize}
          >
            <h2 id="notes-overlay-title" className="text-sm font-medium">
              Stack I use
            </h2>
          </div>
          <div className="flex min-h-0 flex-1 flex-col px-8 py-7 sm:px-10 sm:py-8">
            <input
              value={draft.title}
              onChange={(event) => updateDraft("title", event.target.value)}
              aria-label="메모 제목"
              placeholder="제목"
              className="w-full border-0 bg-transparent p-0 text-2xl font-semibold tracking-tight outline-none"
            />
            <textarea
              value={draft.body}
              onChange={(event) => updateDraft("body", event.target.value)}
              aria-label="메모 내용"
              placeholder="메모를 입력하세요"
              className="mt-4 min-h-0 w-full flex-1 resize-none border-0 bg-transparent p-0 text-[15px] leading-7 outline-none"
            />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
