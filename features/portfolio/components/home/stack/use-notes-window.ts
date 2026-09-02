"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { StackItem } from "@/features/portfolio/types";
import { useFrameDrag } from "@/features/portfolio/components/shared/use-frame-drag";
import {
  clampFrame,
  clampSidebarWidth,
  getNotesWindowTarget,
  isMaximizedFrame,
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

  const { dragging, beginDrag } = useFrameDrag<DragState>((drag, dx, dy) => {
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
  });

  useEffect(() => {
    frameRef.current = frame;
    rememberedFrame = frame;
    rememberedRestoredFrame = restoredFrameRef.current;
  }, [frame]);

  useEffect(() => {
    rememberedSidebarWidth = sidebarWidth;
  }, [sidebarWidth]);

  const startMove = (event: PointerEvent<HTMLElement>) => {
    beginDrag(
      event,
      {
        pointerX: event.clientX,
        pointerY: event.clientY,
        start: frame,
        startSidebarWidth: sidebarWidth,
        mode: "move",
      },
      open,
    );
  };

  const startResize =
    (edge: ResizeEdge) => (event: PointerEvent<HTMLElement>) => {
      if (
        !beginDrag(
          event,
          {
            pointerX: event.clientX,
            pointerY: event.clientY,
            start: frame,
            startSidebarWidth: sidebarWidth,
            mode: edge,
          },
          open,
        )
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    };

  const startSidebarResize = (event: PointerEvent<HTMLElement>) => {
    if (
      !beginDrag(
        event,
        {
          pointerX: event.clientX,
          pointerY: event.clientY,
          start: frame,
          startSidebarWidth: sidebarWidth,
          mode: "sidebar",
        },
        open,
      )
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const toggleMaximize = () => {
    const current = frameRef.current ?? frame;

    if (isMaximizedFrame(current) && restoredFrameRef.current) {
      setFrame(clampFrame(restoredFrameRef.current));
      return;
    }

    restoredFrameRef.current = current;
    setFrame(maximizedFrame());
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
    isMaximized: isMaximizedFrame(frame),
    dragging,
    visibleSidebarWidth: clampSidebarWidth(sidebarWidth, frame.width),
    startMove,
    startResize,
    startSidebarResize,
    toggleMaximize,
    updateDraft,
  };
}
