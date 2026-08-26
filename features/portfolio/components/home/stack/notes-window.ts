export type NotesOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type NoteDraft = {
  title: string;
  body: string;
};

export type WindowFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export const WINDOW_MIN_WIDTH = 560;
export const WINDOW_MIN_HEIGHT = 380;
export const WINDOW_PAD = 8;
export const SIDEBAR_DEFAULT = 216;
export const SIDEBAR_MIN = 176;
export const CONTENT_MIN = 280;
export const RESIZE_EDGES: ResizeEdge[] = [
  "n",
  "s",
  "e",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
];

export function getNotesWindowTarget(): WindowFrame {
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

export function clampFrame(frame: WindowFrame): WindowFrame {
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

export function resizeFrame(
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

export function clampSidebarWidth(width: number, windowWidth: number) {
  const max = Math.max(SIDEBAR_MIN, windowWidth - CONTENT_MIN);
  return Math.min(Math.max(width, SIDEBAR_MIN), max);
}

export function maximizedFrame(): WindowFrame {
  return {
    x: WINDOW_PAD,
    y: WINDOW_PAD,
    width: window.innerWidth - WINDOW_PAD * 2,
    height: window.innerHeight - WINDOW_PAD * 2,
  };
}
