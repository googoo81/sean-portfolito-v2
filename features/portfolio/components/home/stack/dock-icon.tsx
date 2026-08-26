"use client";

import { useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import type { StackItem } from "@/features/portfolio/types";
import {
  DOCK_ICON_RATIO,
  DOCK_INFLUENCE,
  DOCK_MAX_SIZE,
  DOCK_SPRING,
  DOCK_TILE_SIZE,
} from "./dock-config";
import type { NotesOrigin } from "./notes-window";

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
        className="dock-icon__glyph"
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.icon}
      alt=""
      style={{ width: size, height: size }}
      className="dock-icon__glyph"
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
  const handleSelect = useDebouncedCallback(() => {
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
  });

  return (
    <motion.button
      ref={iconRef}
      type="button"
      role="listitem"
      aria-label={item.label}
      style={{ width: size, height: size }}
      className="dock-icon glass-chip"
      onPointerEnter={() => setShowLabel(true)}
      onPointerLeave={() => setShowLabel(false)}
      onClick={handleSelect}
    >
      <span
        aria-hidden="true"
        className={`dock-icon__tip${showLabel ? " is-visible" : ""}`}
      >
        {item.label}
        <span className="dock-icon__tip-arrow" />
      </span>
      <StackGlyph item={item} />
    </motion.button>
  );
}
