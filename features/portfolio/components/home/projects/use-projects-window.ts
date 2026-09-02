"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useFrameDrag } from "@/features/portfolio/components/shared/use-frame-drag";
import {
  clampFrame,
  resizeFrame,
  type ResizeEdge,
  type WindowFrame,
} from "@/features/portfolio/components/home/stack/notes-window";

type DragState = {
  pointerX: number;
  pointerY: number;
  start: WindowFrame;
  mode: "move" | ResizeEdge;
};

let rememberedFrame: WindowFrame | null = null;
let rememberedRestoredFrame: WindowFrame | null = null;

export function getProjectsWindowTarget(): WindowFrame {
  const padding = window.matchMedia("(min-width: 640px)").matches ? 32 : 16;
  const width = Math.min(960, window.innerWidth - padding * 2);
  const height = Math.min(
    window.innerHeight * 0.86,
    window.innerHeight - padding * 2,
  );

  return {
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2,
    width,
    height,
  };
}

export function fullscreenFrame(): WindowFrame {
  return {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function isProjectsMaximized(frame: WindowFrame) {
  const max = fullscreenFrame();
  return (
    Math.abs(frame.x - max.x) < 2 &&
    Math.abs(frame.y - max.y) < 2 &&
    Math.abs(frame.width - max.width) < 2 &&
    Math.abs(frame.height - max.height) < 2
  );
}

function initialFrame(): WindowFrame {
  if (typeof window === "undefined") {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  if (!rememberedFrame) {
    return fullscreenFrame();
  }

  return isProjectsMaximized(rememberedFrame)
    ? fullscreenFrame()
    : clampFrame(rememberedFrame);
}

export function useProjectsWindow(open: boolean) {
  const frameRef = useRef<WindowFrame | null>(null);
  const restoredFrameRef = useRef<WindowFrame | null>(rememberedRestoredFrame);
  const [frame, setFrame] = useState<WindowFrame>(initialFrame);

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

    setFrame(resizeFrame(drag.start, drag.mode, dx, dy));
  });

  useEffect(() => {
    frameRef.current = frame;
    rememberedFrame = frame;
    if (!isProjectsMaximized(frame)) {
      restoredFrameRef.current = frame;
    }
    rememberedRestoredFrame = restoredFrameRef.current;
  }, [frame]);

  useEffect(() => {
    const onResize = () => {
      const current = frameRef.current;
      if (!current) {
        return;
      }

      setFrame(
        isProjectsMaximized(current)
          ? fullscreenFrame()
          : clampFrame(current),
      );
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const startMove = (event: PointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) {
      return;
    }

    if (isProjectsMaximized(frame)) {
      return;
    }

    beginDrag(
      event,
      {
        pointerX: event.clientX,
        pointerY: event.clientY,
        start: frame,
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

  const toggleMaximize = () => {
    const current = frameRef.current ?? frame;

    if (isProjectsMaximized(current) && restoredFrameRef.current) {
      setFrame(clampFrame(restoredFrameRef.current));
      return;
    }

    if (isProjectsMaximized(current)) {
      const next = clampFrame(getProjectsWindowTarget());
      restoredFrameRef.current = next;
      setFrame(next);
      return;
    }

    restoredFrameRef.current = current;
    setFrame(fullscreenFrame());
  };

  return {
    frame,
    dragging,
    isMaximized: isProjectsMaximized(frame),
    startMove,
    startResize,
    toggleMaximize,
  };
}
