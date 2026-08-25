"use client";

import { useCallback, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/features/portfolio/hooks";
import { stackIconSrc } from "@/features/portfolio/constants";

type StackRowProps = {
  items: string[];
};

const TILE_SIZE = 64;
const ICON_SIZE = 40;
const MAX_SCALE = 1.55;
const INFLUENCE = 120;

function scaleForDistance(distance: number) {
  if (distance >= INFLUENCE) {
    return 1;
  }

  const t = 1 - distance / INFLUENCE;
  return 1 + t * (MAX_SCALE - 1);
}

type StackIconProps = {
  item: string;
  scale?: number;
};

function StackIcon({ item, scale = 1 }: StackIconProps) {
  return (
    <span
      data-stack-icon
      title={item}
      aria-label={item}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
      }}
      className="flex shrink-0 items-center justify-center rounded-[1.35rem] bg-white/8 text-foreground transition-transform duration-150 ease-out will-change-transform"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={stackIconSrc(item)}
        alt=""
        width={ICON_SIZE}
        height={ICON_SIZE}
        className="object-contain"
        loading="lazy"
      />
    </span>
  );
}

export function StackRow({ items }: StackRowProps) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));

  const updateScales = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const icons = container.querySelectorAll<HTMLElement>("[data-stack-icon]");
    const next = Array.from(icons).map((icon) => {
      const rect = icon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      return scaleForDistance(Math.abs(clientX - centerX));
    });

    setScales(next);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updateScales(event.clientX);
  };

  const handleMouseLeave = () => {
    setScales(items.map(() => 1));
  };

  if (reducedMotion) {
    return (
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {items.map((item) => (
          <StackIcon key={item} item={item} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="hidden w-full items-end justify-center gap-1.5 pb-1 xl:flex"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, index) => (
          <StackIcon key={item} item={item} scale={scales[index]} />
        ))}
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-2 xl:hidden">
        {items.map((item) => (
          <StackIcon key={item} item={item} />
        ))}
      </div>
    </>
  );
}
