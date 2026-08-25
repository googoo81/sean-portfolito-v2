"use client";

import { useCallback, useEffect, useState } from "react";
import { useMotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { DockIcon } from "./dock-icon";
import { NotesOverlay, type NotesOrigin } from "./notes-overlay";
import {
  clearNotesHash,
  parseNotesHash,
  writeNotesHash,
} from "./notes-hash";
import { DOCK_GAP, DOCK_MAX_SIZE } from "./dock-config";
import type { StackItem } from "@/features/portfolio/types";

type StackRowProps = {
  items: readonly StackItem[];
};

function moveStackItem(
  items: readonly StackItem[],
  fromId: string,
  toId: string,
) {
  const from = items.findIndex((item) => item.id === fromId);
  const to = items.findIndex((item) => item.id === toId);
  if (from < 0 || to < 0 || from === to) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function fallbackNotesOrigin(): NotesOrigin {
  return {
    x: window.innerWidth / 2 - 38,
    y: window.innerHeight / 2 - 38,
    width: 76,
    height: 76,
  };
}

export function StackRow({ items }: StackRowProps) {
  const reducedMotion = usePrefersReducedMotion();
  const pointerX = useMotionValue(Number.POSITIVE_INFINITY);
  const [orderedItems, setOrderedItems] = useState<StackItem[]>(() => [
    ...items,
  ]);
  const [notesItem, setNotesItem] = useState<StackItem | null>(null);
  const [notesOrigin, setNotesOrigin] = useState<NotesOrigin | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [skipEnter, setSkipEnter] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const itemId = parseNotesHash();
      if (itemId === undefined) {
        return;
      }

      const item =
        items.find((entry) => entry.id === itemId) ?? items[0] ?? null;
      if (!item) {
        return;
      }

      setNotesItem(item);
      setNotesOrigin(fallbackNotesOrigin());
      setNotesOpen(true);
      setSkipEnter(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [items]);

  const openNotes = useCallback((origin: NotesOrigin, item: StackItem) => {
    setSkipEnter(false);
    setNotesItem(item);
    setNotesOrigin(origin);
    setNotesOpen(true);
    writeNotesHash(item.id);
  }, []);

  const closeNotes = useCallback(() => {
    setNotesOpen(false);
    clearNotesHash();
  }, []);

  const handleNotesExited = useCallback(() => {
    setNotesOrigin(null);
    setNotesItem(null);
  }, []);

  const handleSelectItem = useCallback((item: StackItem) => {
    setNotesItem(item);
    writeNotesHash(item.id);
  }, []);

  const handleReorder = useCallback((fromId: string, toId: string) => {
    setOrderedItems((current) => moveStackItem(current, fromId, toId));
  }, []);

  return (
    <>
      <div
        role="list"
        aria-label="사용 도구"
        style={{ gap: DOCK_GAP, height: DOCK_MAX_SIZE }}
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
        {orderedItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            pointerX={pointerX}
            reducedMotion={reducedMotion}
            onSelect={openNotes}
          />
        ))}
      </div>

      <div
        role="list"
        aria-label="사용 도구"
        className="flex max-w-full flex-wrap items-center justify-center gap-1.5 xl:hidden"
      >
        {orderedItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            pointerX={pointerX}
            reducedMotion
            onSelect={openNotes}
          />
        ))}
      </div>

      {notesOrigin && notesItem ? (
        <NotesOverlay
          open={notesOpen}
          item={notesItem}
          items={orderedItems}
          origin={notesOrigin}
          reducedMotion={reducedMotion || skipEnter}
          onClose={closeNotes}
          onExited={handleNotesExited}
          onSelectItem={handleSelectItem}
          onReorder={handleReorder}
        />
      ) : null}
    </>
  );
}
