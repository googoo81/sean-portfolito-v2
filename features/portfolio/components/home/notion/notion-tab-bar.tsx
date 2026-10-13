"use client";

import { useState } from "react";
import type { NotionTab } from "./notion-tabs";

type NotionTabBarProps = {
  tabs: NotionTab[];
  activePageId: string;
  ariaLabel: string;
  onSelect: (tab: NotionTab) => void;
};

function TabIcon({ tab }: { tab: NotionTab }) {
  const [failed, setFailed] = useState(false);

  if (!tab.iconUrl || failed) {
    return (
      <span
        className="notion-overlay__tab-icon notion-overlay__tab-icon--fallback"
        aria-hidden
      >
        {tab.title.slice(0, 1)}
      </span>
    );
  }

  return (
    <img
      className="notion-overlay__tab-icon"
      src={tab.iconUrl}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

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
            <TabIcon tab={tab} />
            <span className="notion-overlay__tab-label">{tab.title}</span>
          </button>
        );
      })}
    </div>
  );
}
