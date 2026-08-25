"use client";

import { useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  DOCK_ICON_RATIO,
  DOCK_INFLUENCE,
  DOCK_MAX_SIZE,
  DOCK_SPRING,
  DOCK_TILE_SIZE,
} from "./dock-config";
import type { NotesOrigin } from "./notes-overlay";
import type { StackItem } from "@/features/portfolio/types";

type DockIconProps = {
  item: StackItem;
  pointerX: MotionValue<number>;
  reducedMotion?: boolean;
  onSelect?: (origin: NotesOrigin, item: StackItem) => void;
};

function StackGlyph({ item }: { item: StackItem }) {
  const size = `${DOCK_ICON_RATIO * 100}%`;

  if (item.themed) {
    return (
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
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
        className="transition-colors duration-200"
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.icon}
      alt=""
      style={{ width: size, height: size }}
      className="object-contain"
      loading="lazy"
    />
  );
}

export function DockIcon({
  item,
  pointerX,
  reducedMotion = false,
  onSelect,
}: DockIconProps) {
  const iconRef = useRef<HTMLButtonElement>(null);
  const [showLabel, setShowLabel] = useState(false);
  const distance = useTransform(pointerX, (latestPointerX) => {
    const bounds = iconRef.current?.getBoundingClientRect();
    if (!bounds || !Number.isFinite(latestPointerX)) {
      return DOCK_INFLUENCE;
    }

    return latestPointerX - (bounds.left + bounds.width / 2);
  });
  const targetSize = useTransform(
    distance,
    [-DOCK_INFLUENCE, 0, DOCK_INFLUENCE],
    [DOCK_TILE_SIZE, DOCK_MAX_SIZE, DOCK_TILE_SIZE],
    { clamp: true },
  );
  const animatedSize = useSpring(targetSize, DOCK_SPRING);
  const size = reducedMotion ? DOCK_TILE_SIZE : animatedSize;

  return (
    <motion.button
      ref={iconRef}
      type="button"
      role="listitem"
      aria-label={item.label}
      style={{ width: size, height: size }}
      className="glass-chip relative flex shrink-0 origin-bottom cursor-pointer items-center justify-center rounded-[1.35rem] will-change-[width,height]"
      onPointerEnter={() => setShowLabel(true)}
      onPointerLeave={() => setShowLabel(false)}
      onClick={() => {
        const bounds = iconRef.current?.getBoundingClientRect();
        if (!bounds) {
          return;
        }

        onSelect?.(
          {
            x: bounds.left,
            y: bounds.top,
            width: bounds.width,
            height: bounds.height,
          },
          item,
        );
      }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-20 -translate-x-1/2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-foreground transition-all duration-100 ${
          showLabel ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {item.label}
        <span className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-line bg-surface" />
      </span>
      <StackGlyph item={item} />
    </motion.button>
  );
}
