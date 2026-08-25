"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/features/portfolio/hooks";
import { stackIconSrc } from "@/features/portfolio/constants";

type StackRowProps = {
  items: string[];
};

const TILE_SIZE = 76;
const ICON_SIZE = 54;
const MAX_SCALE = 1.52;
const INFLUENCE = 160;
const GAP = 12;

function scaleForDistance(distance: number) {
  if (distance >= INFLUENCE) {
    return 1;
  }

  const progress = distance / INFLUENCE;
  const eased = (Math.cos(progress * Math.PI) + 1) / 2;
  return 1 + eased * (MAX_SCALE - 1);
}

function translationsForScales(scales: number[]) {
  const baseWidth = scales.length * TILE_SIZE + (scales.length - 1) * GAP;
  const scaledWidth =
    scales.reduce((total, scale) => total + TILE_SIZE * scale, 0) +
    (scales.length - 1) * GAP;
  let baseCursor = -baseWidth / 2;
  let scaledCursor = -scaledWidth / 2;

  return scales.map((scale) => {
    const baseCenter = baseCursor + TILE_SIZE / 2;
    const scaledCenter = scaledCursor + (TILE_SIZE * scale) / 2;

    baseCursor += TILE_SIZE + GAP;
    scaledCursor += TILE_SIZE * scale + GAP;

    return scaledCenter - baseCenter;
  });
}

type StackIconProps = {
  item: string;
  scale?: number;
  translation?: number;
  active?: boolean;
};

function StackIcon({
  item,
  scale = 1,
  translation = 0,
  active = false,
}: StackIconProps) {
  return (
    <span
      data-stack-slot
      role="listitem"
      aria-label={item}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        transform: `translateX(${translation}px)`,
      }}
      className="relative flex shrink-0 items-end justify-center transition-transform duration-100 ease-out will-change-transform"
    >
      <span
        aria-hidden="true"
        style={{
          bottom: `calc(100% + ${(scale - 1) * TILE_SIZE + 12}px)`,
        }}
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#2c2c2e]/95 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-[0_5px_18px_rgba(0,0,0,0.45)] ring-1 ring-white/15 backdrop-blur-xl transition-all duration-100 ${
          active
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        }`}
      >
        {item}
        <span className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[#2c2c2e]" />
      </span>
      <span
        style={{
          width: TILE_SIZE,
          height: TILE_SIZE,
          transform: `scale(${scale})`,
          transformOrigin: "bottom center",
        }}
        className="flex items-center justify-center rounded-[1.35rem] bg-white/7 shadow-[0_8px_18px_rgba(0,0,0,0.28)] ring-1 ring-white/6 transition-transform duration-100 ease-out will-change-transform"
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
    </span>
  );
}

export function StackRow({ items }: StackRowProps) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerXRef = useRef(0);
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const updateScales = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const slots = container.querySelectorAll<HTMLElement>("[data-stack-slot]");
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    const next = Array.from(slots).map((slot, index) => {
      const rect = slot.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(clientX - centerX);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }

      return scaleForDistance(distance);
    });

    setScales(next);
    setActiveIndex(
      closestDistance <= TILE_SIZE * 0.75 ? closestIndex : null,
    );
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerXRef.current = event.clientX;

    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = requestAnimationFrame(() => {
      updateScales(pointerXRef.current);
      frameRef.current = null;
    });
  };

  const handlePointerLeave = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setScales(items.map(() => 1));
    setActiveIndex(null);
  };

  if (reducedMotion) {
    return (
      <div
        role="list"
        aria-label="사용 도구"
        className="flex w-full max-w-full flex-wrap items-center justify-center gap-3 sm:px-2"
      >
        {items.map((item) => (
          <StackIcon key={item} item={item} />
        ))}
      </div>
    );
  }

  const translations = translationsForScales(scales);

  return (
    <>
      <div
        ref={containerRef}
        role="list"
        aria-label="사용 도구"
        className="relative hidden w-full items-end justify-center gap-3 px-2 xl:flex"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((item, index) => (
          <StackIcon
            key={item}
            item={item}
            scale={scales[index]}
            translation={translations[index]}
            active={activeIndex === index}
          />
        ))}
      </div>

      <div
        role="list"
        aria-label="사용 도구"
        className="flex max-w-full flex-wrap items-center justify-center gap-1.5 xl:hidden"
      >
        {items.map((item) => (
          <StackIcon key={item} item={item} />
        ))}
      </div>
    </>
  );
}
