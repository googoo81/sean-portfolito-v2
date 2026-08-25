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
      className="relative flex shrink-0 items-center justify-center rounded-[1.35rem] bg-soft shadow-[0_8px_18px_rgba(0,0,0,0.2)] ring-1 ring-line will-change-[width,height]"
      onPointerEnter={() => setShowLabel(true)}
      onPointerLeave={() => setShowLabel(false)}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#2c2c2e]/95 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-[0_5px_18px_rgba(0,0,0,0.45)] ring-1 ring-white/15 backdrop-blur-xl transition-all duration-100 ${
          showLabel ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {item.label}
        <span className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[#2c2c2e]" />
      </span>
      <StackGlyph item={item} />
    </motion.span>
  );
}
