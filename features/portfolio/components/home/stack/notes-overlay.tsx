"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { StackItem } from "@/features/portfolio/types";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";

export type NotesOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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

function TrafficLights({ onClose }: { onClose: () => void }) {
  const glyphClassName =
    "pointer-events-none size-[8px] opacity-0 transition-opacity duration-100 group-hover/lights:opacity-100";

  return (
    <button
      type="button"
      aria-label="닫기"
      onClick={onClose}
      className="group/lights flex w-full cursor-pointer items-center gap-2 px-4 py-3.5"
    >
      <span className="flex size-3 items-center justify-center overflow-hidden rounded-full bg-[#ff5f57]">
        <svg viewBox="0 0 12 12" className={glyphClassName} fill="none">
          <path
            d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
            stroke="#4d0000"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex size-3 items-center justify-center overflow-hidden rounded-full bg-[#febc2e]">
        <svg viewBox="0 0 12 12" className={glyphClassName} fill="none">
          <path
            d="M2.4 6h7.2"
            stroke="#995700"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex size-3 items-center justify-center overflow-hidden rounded-full bg-[#28c840]">
        <svg viewBox="0 0 12 12" className={glyphClassName}>
          <path fill="#006400" d="M6.4 2.7h2.9v2.9L6.4 2.7Z" />
          <path fill="#006400" d="M5.6 9.3H2.7V6.4L5.6 9.3Z" />
        </svg>
      </span>
    </button>
  );
}

function SidebarAppIcon({ item }: { item: StackItem }) {
  if (item.themed) {
    return (
      <span
        aria-hidden="true"
        className="size-4 shrink-0"
        style={{
          backgroundColor: "var(--stack-icon-themed)",
          maskImage: `url("${item.icon}")`,
          WebkitMaskImage: `url("${item.icon}")`,
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.icon}
      alt=""
      className="size-4 shrink-0 object-contain"
      draggable={false}
    />
  );
}

function NotesSidebar({
  items,
  selectedId,
  onSelectItem,
  onReorder,
}: {
  items: readonly StackItem[];
  selectedId: string;
  onSelectItem: (item: StackItem) => void;
  onReorder: (fromId: string, toId: string) => void;
}) {
  const draggingIdRef = useRef<string | null>(null);
  const didDragRef = useRef(false);
  const handleSelectItem = useDebouncedCallback(onSelectItem);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-3">
      {items.map((entry) => {
        const selected = entry.id === selectedId;

        return (
          <button
            key={entry.id}
            type="button"
            draggable
            aria-current={selected ? "true" : undefined}
            onClick={() => {
              if (didDragRef.current) {
                didDragRef.current = false;
                return;
              }

              handleSelectItem(entry);
            }}
            onDragStart={(event) => {
              draggingIdRef.current = entry.id;
              didDragRef.current = true;
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", entry.id);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              const fromId = draggingIdRef.current;
              if (!fromId || fromId === entry.id) {
                return;
              }

              onReorder(fromId, entry.id);
            }}
            onDragEnd={() => {
              draggingIdRef.current = null;
            }}
            className={`flex w-full cursor-grab items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm active:cursor-grabbing ${
              selected ? "text-foreground" : "text-muted hover:bg-soft"
            }`}
            style={
              selected
                ? { backgroundColor: "var(--notes-glass-item)" }
                : undefined
            }
          >
            <SidebarAppIcon item={entry} />
            <span className="min-w-0 truncate">{entry.label}</span>
          </button>
        );
      })}
    </div>
  );
}

type NoteDraft = {
  title: string;
  body: string;
};

type WindowFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const WINDOW_MIN_WIDTH = 560;
const WINDOW_MIN_HEIGHT = 380;
const WINDOW_PAD = 8;
const SIDEBAR_DEFAULT = 216;
const SIDEBAR_MIN = 176;
const CONTENT_MIN = 280;
const RESIZE_EDGES: ResizeEdge[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

let rememberedFrame: WindowFrame | null = null;
let rememberedRestoredFrame: WindowFrame | null = null;
let rememberedSidebarWidth: number | null = null;
let rememberedNotes: Record<string, NoteDraft> = {};

function getNotesWindowTarget(): WindowFrame {
  const padding = window.matchMedia("(min-width: 640px)").matches ? 32 : 16;
  const width = Math.min(768, window.innerWidth - padding * 2);
  const height = Math.min(
    576,
    window.innerHeight * 0.82,
    window.innerHeight - padding * 2,
  );

  return {
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

function clampFrame(frame: WindowFrame): WindowFrame {
  const maxWidth = window.innerWidth - WINDOW_PAD * 2;
  const maxHeight = window.innerHeight - WINDOW_PAD * 2;
  const width = Math.min(Math.max(frame.width, WINDOW_MIN_WIDTH), maxWidth);
  const height = Math.min(Math.max(frame.height, WINDOW_MIN_HEIGHT), maxHeight);
  const x = Math.min(
    Math.max(frame.x, WINDOW_PAD),
    window.innerWidth - width - WINDOW_PAD,
  );
  const y = Math.min(
    Math.max(frame.y, WINDOW_PAD),
    window.innerHeight - height - WINDOW_PAD,
  );

  return { x, y, width, height };
}

function resizeFrame(
  start: WindowFrame,
  edge: ResizeEdge,
  dx: number,
  dy: number,
) {
  let { x, y, width, height } = start;

  if (edge.includes("e")) {
    width += dx;
  }
  if (edge.includes("s")) {
    height += dy;
  }
  if (edge.includes("w")) {
    x += dx;
    width -= dx;
  }
  if (edge.includes("n")) {
    y += dy;
    height -= dy;
  }

  if (width < WINDOW_MIN_WIDTH) {
    if (edge.includes("w")) {
      x -= WINDOW_MIN_WIDTH - width;
    }
    width = WINDOW_MIN_WIDTH;
  }
  if (height < WINDOW_MIN_HEIGHT) {
    if (edge.includes("n")) {
      y -= WINDOW_MIN_HEIGHT - height;
    }
    height = WINDOW_MIN_HEIGHT;
  }

  return clampFrame({ x, y, width, height });
}

function clampSidebarWidth(width: number, windowWidth: number) {
  const max = Math.max(SIDEBAR_MIN, windowWidth - CONTENT_MIN);
  return Math.min(Math.max(width, SIDEBAR_MIN), max);
}

function getNoteDraft(item: StackItem): NoteDraft {
  return (
    rememberedNotes[item.id] ?? {
      title: item.label,
      body: item.note,
    }
  );
}

function maximizedFrame(): WindowFrame {
  return {
    x: WINDOW_PAD,
    y: WINDOW_PAD,
    width: window.innerWidth - WINDOW_PAD * 2,
    height: window.innerHeight - WINDOW_PAD * 2,
  };
}

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
  const frameRef = useRef<WindowFrame | null>(null);
  const restoredFrameRef = useRef<WindowFrame | null>(rememberedRestoredFrame);
  const dragRef = useRef<{
    pointerX: number;
    pointerY: number;
    start: WindowFrame;
    startSidebarWidth: number;
    mode: "move" | "sidebar" | ResizeEdge;
  } | null>(null);

  const [frame, setFrame] = useState<WindowFrame>(() =>
    clampFrame(rememberedFrame ?? getNotesWindowTarget()),
  );
  const [sidebarWidth, setSidebarWidth] = useState(() =>
    clampSidebarWidth(
      rememberedSidebarWidth ?? SIDEBAR_DEFAULT,
      (rememberedFrame ?? getNotesWindowTarget()).width,
    ),
  );
  const [notesById, setNotesById] = useState<Record<string, NoteDraft>>(
    () => rememberedNotes,
  );
  const draft = notesById[item.id] ?? {
    title: item.label,
    body: item.note,
  };

  useEffect(() => {
    frameRef.current = frame;
    rememberedFrame = frame;
    rememberedRestoredFrame = restoredFrameRef.current;
  }, [frame]);

  useEffect(() => {
    rememberedSidebarWidth = sidebarWidth;
  }, [sidebarWidth]);

  const visibleSidebarWidth = clampSidebarWidth(sidebarWidth, frame.width);

  const updateDraft = (field: keyof NoteDraft, value: string) => {
    setNotesById((current) => {
      const next = {
        ...current,
        [item.id]: {
          ...(current[item.id] ?? getNoteDraft(item)),
          [field]: value,
        },
      };
      rememberedNotes = next;
      return next;
    });
  };

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

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      const dx = event.clientX - drag.pointerX;
      const dy = event.clientY - drag.pointerY;

      if (drag.mode === "move") {
        setFrame(
          clampFrame({
            ...drag.start,
            x: drag.start.x + dx,
            y: drag.start.y + dy,
          }),
        );
        return;
      }

      if (drag.mode === "sidebar") {
        setSidebarWidth(
          clampSidebarWidth(drag.startSidebarWidth + dx, drag.start.width),
        );
        return;
      }

      setFrame(resizeFrame(drag.start, drag.mode, dx, dy));
    };

    const onPointerUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const startMove = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || !open) {
      return;
    }

    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      start: frame,
      startSidebarWidth: sidebarWidth,
      mode: "move",
    };
  };

  const startResize =
    (edge: ResizeEdge) => (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0 || !open) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      dragRef.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        start: frame,
        startSidebarWidth: sidebarWidth,
        mode: edge,
      };
    };

  const startSidebarResize = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || !open) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      start: frame,
      startSidebarWidth: sidebarWidth,
      mode: "sidebar",
    };
  };

  const toggleMaximize = () => {
    const current = frameRef.current ?? frame;
    const max = maximizedFrame();
    const isMax =
      Math.abs(current.x - max.x) < 2 &&
      Math.abs(current.y - max.y) < 2 &&
      Math.abs(current.width - max.width) < 2 &&
      Math.abs(current.height - max.height) < 2;

    if (isMax && restoredFrameRef.current) {
      setFrame(clampFrame(restoredFrameRef.current));
      return;
    }

    restoredFrameRef.current = current;
    setFrame(max);
  };

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
        <div
          className="notes-overlay__sidebar relative flex h-full min-h-0 shrink-0 flex-col"
          style={{ width: visibleSidebarWidth }}
        >
          <div className="notes-overlay__glass m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.05rem]">
            <TrafficLights onClose={handleClose} />
            <p className="px-3 pb-1.5 text-xs font-medium tracking-[0.16em] text-muted uppercase">
              list
            </p>
            <NotesSidebar
              items={items}
              selectedId={item.id}
              onSelectItem={onSelectItem}
              onReorder={onReorder}
            />
          </div>
          <div
            className="notes-overlay__sidebar-handle"
            onPointerDown={startSidebarResize}
          />
        </div>

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
