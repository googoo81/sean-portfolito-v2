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
import type { StackItem } from "@/features/portfolio/types";

type DockIconProps = {
  item: StackItem;
  pointerX: MotionValue<number>;
  reducedMotion?: boolean;
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
}: DockIconProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
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
    <motion.span
      ref={iconRef}
      role="listitem"
      aria-label={item.label}
      style={{ width: size, height: size }}
      className="glass-chip relative flex shrink-0 items-center justify-center rounded-[1.35rem] will-change-[width,height]"
      onPointerEnter={() => setShowLabel(true)}
      onPointerLeave={() => setShowLabel(false)}
    >
      <span
        aria-hidden="true"
        className={`glass pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 -translate-x-1/2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-foreground transition-all duration-100 ${
          showLabel ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {item.label}
      </span>
      <StackGlyph item={item} />
    </motion.span>
  );
}
