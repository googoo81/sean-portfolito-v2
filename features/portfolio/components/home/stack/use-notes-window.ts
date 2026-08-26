"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { StackItem } from "@/features/portfolio/types";
import {
  clampFrame,
  clampSidebarWidth,
  getNotesWindowTarget,
  maximizedFrame,
  resizeFrame,
  SIDEBAR_DEFAULT,
  type NoteDraft,
  type ResizeEdge,
  type WindowFrame,
} from "./notes-window";

type DragState = {
  pointerX: number;
  pointerY: number;
  start: WindowFrame;
  startSidebarWidth: number;
  mode: "move" | "sidebar" | ResizeEdge;
};

let rememberedFrame: WindowFrame | null = null;
let rememberedRestoredFrame: WindowFrame | null = null;
let rememberedSidebarWidth: number | null = null;
let rememberedNotes: Record<string, NoteDraft> = {};

function getNoteDraft(item: StackItem): NoteDraft {
  return (
    rememberedNotes[item.id] ?? {
      title: item.label,
      body: item.note,
    }
  );
}

export function useNotesWindow(open: boolean, item: StackItem) {
  const frameRef = useRef<WindowFrame | null>(null);
  const restoredFrameRef = useRef<WindowFrame | null>(rememberedRestoredFrame);
  const dragRef = useRef<DragState | null>(null);

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

  const beginDrag = (
    event: PointerEvent<HTMLElement>,
    mode: DragState["mode"],
  ) => {
    if (event.button !== 0 || !open) {
      return false;
    }

    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      start: frame,
      startSidebarWidth: sidebarWidth,
      mode,
    };
    return true;
  };

  const startMove = (event: PointerEvent<HTMLElement>) => {
    beginDrag(event, "move");
  };

  const startResize =
    (edge: ResizeEdge) => (event: PointerEvent<HTMLElement>) => {
      if (!beginDrag(event, edge)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

  const startSidebarResize = (event: PointerEvent<HTMLElement>) => {
    if (!beginDrag(event, "sidebar")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
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

  return {
    frame,
    draft,
    visibleSidebarWidth: clampSidebarWidth(sidebarWidth, frame.width),
    startMove,
    startResize,
    startSidebarResize,
    toggleMaximize,
    updateDraft,
  };
}
