"use client";

import type { NotionTab } from "./notion-tabs";

type NotionTabBarProps = {
  tabs: NotionTab[];
  activePageId: string;
  ariaLabel: string;
  onSelect: (tab: NotionTab) => void;
};

export function NotionTabBar({
  tabs,
  activePageId,
  ariaLabel,
  onSelect,
}: NotionTabBarProps) {
  if (tabs.length < 2) {
    return null;
  }

  const activeCompact = activePageId.replaceAll("-", "");

  return (
    <div
      className="notion-overlay__tabs"
      role="tablist"
      aria-label={ariaLabel}
      onPointerDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
    >
      {tabs.map((tab) => {
        const selected = tab.pageId === activeCompact;
        return (
          <button
            key={tab.pageId}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`notion-overlay__tab${
              selected ? " notion-overlay__tab--active" : ""
            }`}
            title={tab.title}
            onClick={() => {
              if (!selected) {
                onSelect(tab);
              }
            }}
          >
            {tab.iconUrl ? (
              <img
                className="notion-overlay__tab-icon"
                src={tab.iconUrl}
                alt=""
                draggable={false}
              />
            ) : (
              <span className="notion-overlay__tab-icon notion-overlay__tab-icon--fallback" aria-hidden>
                {tab.title.slice(0, 1)}
              </span>
            )}
            <span className="notion-overlay__tab-label">{tab.title}</span>
          </button>
        );
      })}
    </div>
  );
}
