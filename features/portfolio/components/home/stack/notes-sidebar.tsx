"use client";

import { useRef, type PointerEvent } from "react";
import type { StackItem } from "@/features/portfolio/types";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import {
  CloseLightIcon,
  ExpandLightIcon,
  MinLightIcon,
  ZoomLightIcon,
} from "@/features/portfolio/components/work/projects-chrome";

function TrafficLights({
  onClose,
  onZoom,
  maximized,
}: {
  onClose: () => void;
  onZoom: () => void;
  maximized: boolean;
}) {
  return (
    <div className="projects-overlay__lights">
      <button
        type="button"
        aria-label="닫기"
        className="projects-overlay__light projects-overlay__light--close"
        onClick={onClose}
      >
        <CloseLightIcon />
      </button>
      <button
        type="button"
        aria-label="닫기"
        className="projects-overlay__light projects-overlay__light--min"
        onClick={onClose}
      >
        <MinLightIcon />
      </button>
      <button
        type="button"
        aria-label={maximized ? "창 크기 복원" : "전체 화면"}
        className="projects-overlay__light projects-overlay__light--zoom"
        onClick={onZoom}
      >
        {maximized ? <ExpandLightIcon /> : <ZoomLightIcon />}
      </button>
    </div>
  );
}

function SidebarAppIcon({ item }: { item: StackItem }) {
  if (item.themed) {
    return (
      <span
        aria-hidden="true"
        className="notes-overlay__app-icon"
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
      className="notes-overlay__app-icon"
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
    <div className="notes-overlay__list">
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
            className={`notes-overlay__item${selected ? " is-active" : ""}`}
            style={
              selected
                ? { backgroundColor: "var(--notes-glass-item)" }
                : undefined
            }
          >
            <SidebarAppIcon item={entry} />
            <span className="notes-overlay__item-label">{entry.label}</span>
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
  onZoom,
  maximized,
  onSelectItem,
  onReorder,
  onResizePointerDown,
}: {
  width: number;
  items: readonly StackItem[];
  selectedId: string;
  onClose: () => void;
  onZoom: () => void;
  maximized: boolean;
  onSelectItem: (item: StackItem) => void;
  onReorder: (fromId: string, toId: string) => void;
  onResizePointerDown: (event: PointerEvent<HTMLElement>) => void;
}) {
  return (
    <div
      className="notes-overlay__sidebar"
      style={{ width }}
    >
      <div className="notes-overlay__glass">
        <TrafficLights onClose={onClose} onZoom={onZoom} maximized={maximized} />
        <p className="notes-overlay__label">list</p>
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
