"use client";

import { useMotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { DockIcon } from "./dock-icon";
import { DOCK_GAP } from "./dock-config";
import type { StackItem } from "@/features/portfolio/types";

type StackRowProps = {
  items: readonly StackItem[];
};

export function StackRow({ items }: StackRowProps) {
  const reducedMotion = usePrefersReducedMotion();
  const pointerX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <>
      <div
        role="list"
        aria-label="사용 도구"
        style={{ gap: DOCK_GAP }}
        className="relative hidden w-full items-end justify-center px-2 xl:flex"
        onPointerMove={
          reducedMotion
            ? undefined
            : (event) => pointerX.set(event.clientX)
        }
        onPointerLeave={
          reducedMotion
            ? undefined
            : () => pointerX.set(Number.POSITIVE_INFINITY)
        }
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            pointerX={pointerX}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      <div
        role="list"
        aria-label="사용 도구"
        className="flex max-w-full flex-wrap items-center justify-center gap-1.5 xl:hidden"
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            pointerX={pointerX}
            reducedMotion
          />
        ))}
      </div>
    </>
  );
}
