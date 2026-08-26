"use client";

import { useRef, type PointerEvent } from "react";
import type { StackItem } from "@/features/portfolio/types";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import {
  CloseLightIcon,
  MinLightIcon,
  ZoomLightIcon,
} from "@/features/portfolio/components/work/projects-chrome";

function TrafficLights({ onClose }: { onClose: () => void }) {
  const glyphClassName =
    "pointer-events-none size-[8px] opacity-0 transition-opacity duration-100 group-hover/lights:opacity-100";

  return (
    <button
      type="button"
      aria-label="닫기"
      onClick={onClose}
      className="group/lights flex w-full cursor-pointer items-center gap-2 px-4 py-3.5"
    >
      <span className="flex size-3 items-center justify-center overflow-hidden rounded-full bg-[#ff5f57]">
        <CloseLightIcon className={glyphClassName} />
      </span>
      <span className="flex size-3 items-center justify-center overflow-hidden rounded-full bg-[#febc2e]">
        <MinLightIcon className={glyphClassName} />
      </span>
      <span className="flex size-3 items-center justify-center overflow-hidden rounded-full bg-[#28c840]">
        <ZoomLightIcon className={glyphClassName} />
      </span>
    </button>
  );
}

function SidebarAppIcon({ item }: { item: StackItem }) {
  if (item.themed) {
    return (
      <span
        aria-hidden="true"
        className="size-4 shrink-0"
        style={{
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
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.icon}
      alt=""
      className="size-4 shrink-0 object-contain"
      draggable={false}
    />
  );
}

function NotesList({
  items,
  selectedId,
  onSelectItem,
  onReorder,
}: {
  items: readonly StackItem[];
  selectedId: string;
  onSelectItem: (item: StackItem) => void;
  onReorder: (fromId: string, toId: string) => void;
}) {
  const draggingIdRef = useRef<string | null>(null);
  const didDragRef = useRef(false);
  const handleSelectItem = useDebouncedCallback(onSelectItem);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-3">
      {items.map((entry) => {
        const selected = entry.id === selectedId;

        return (
          <button
            key={entry.id}
            type="button"
            draggable
            aria-current={selected ? "true" : undefined}
            onClick={() => {
              if (didDragRef.current) {
                didDragRef.current = false;
                return;
              }

              handleSelectItem(entry);
            }}
            onDragStart={(event) => {
              draggingIdRef.current = entry.id;
              didDragRef.current = true;
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", entry.id);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              const fromId = draggingIdRef.current;
              if (!fromId || fromId === entry.id) {
                return;
              }

              onReorder(fromId, entry.id);
            }}
            onDragEnd={() => {
              draggingIdRef.current = null;
            }}
            className={`flex w-full cursor-grab items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm active:cursor-grabbing ${
              selected ? "text-foreground" : "text-muted hover:bg-soft"
            }`}
            style={
              selected
                ? { backgroundColor: "var(--notes-glass-item)" }
                : undefined
            }
          >
            <SidebarAppIcon item={entry} />
            <span className="min-w-0 truncate">{entry.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function NotesSidebar({
  width,
  items,
  selectedId,
  onClose,
  onSelectItem,
  onReorder,
  onResizePointerDown,
}: {
  width: number;
  items: readonly StackItem[];
  selectedId: string;
  onClose: () => void;
  onSelectItem: (item: StackItem) => void;
  onReorder: (fromId: string, toId: string) => void;
  onResizePointerDown: (event: PointerEvent<HTMLElement>) => void;
}) {
  return (
    <div
      className="notes-overlay__sidebar relative flex h-full min-h-0 shrink-0 flex-col"
      style={{ width }}
    >
      <div className="notes-overlay__glass m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.05rem]">
        <TrafficLights onClose={onClose} />
        <p className="px-3 pb-1.5 text-xs font-medium tracking-[0.16em] text-muted uppercase">
          list
        </p>
        <NotesList
          items={items}
          selectedId={selectedId}
          onSelectItem={onSelectItem}
          onReorder={onReorder}
        />
      </div>
      <div
        className="notes-overlay__sidebar-handle"
        onPointerDown={onResizePointerDown}
      />
    </div>
  );
}
