"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHistoryPager } from "./use-history-pager";

const glyph = "pointer-events-none";

export function CloseLightIcon({ className = glyph }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none">
      <path
        d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
        stroke="#4d0000"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinLightIcon({ className = glyph }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none">
      <path
        d="M2.4 6h7.2"
        stroke="#995700"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ZoomLightIcon({ className = glyph }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className}>
      <path fill="#006400" d="M6.4 2.7h2.9v2.9L6.4 2.7Z" />
      <path fill="#006400" d="M5.6 9.3H2.7V6.4L5.6 9.3Z" />
    </svg>
  );
}

function TrafficLight({
  kind,
  label,
  closeHref,
  onClose,
}: {
  kind: "close" | "min";
  label: string;
  closeHref?: string;
  onClose?: () => void;
}) {
  const className = `projects-overlay__light projects-overlay__light--${kind}`;
  const icon = kind === "close" ? <CloseLightIcon /> : <MinLightIcon />;

  if (closeHref) {
    return (
      <Link href={closeHref} aria-label={label} className={className}>
        {icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={onClose}
    >
      {icon}
    </button>
  );
}

function TrafficLights({
  onClose,
  closeHref,
}: {
  onClose?: () => void;
  closeHref?: string;
}) {
  return (
    <div className="projects-overlay__lights">
      <TrafficLight
        kind="close"
        label="닫기"
        closeHref={closeHref}
        onClose={onClose}
      />
      <TrafficLight
        kind="min"
        label="홈으로"
        closeHref={closeHref}
        onClose={onClose}
      />
      <span
        aria-hidden
        className="projects-overlay__light projects-overlay__light--zoom"
      >
        <ZoomLightIcon />
      </span>
    </div>
  );
}

export function HistoryNav({
  onBack,
  onForward,
  canForward,
}: {
  onBack: () => void;
  onForward: () => void;
  canForward: boolean;
}) {
  return (
    <div className="projects-overlay__nav">
      <button
        type="button"
        aria-label="뒤로"
        className="projects-overlay__nav-btn"
        onClick={onBack}
      >
        <BackGlyph />
      </button>
      <button
        type="button"
        aria-label="앞으로"
        className="projects-overlay__nav-btn"
        disabled={!canForward}
        onClick={onForward}
      >
        <ForwardGlyph />
      </button>
    </div>
  );
}

export function WindowTitlebar({
  title,
  titleId,
  closeHref,
  onClose,
  children,
}: {
  title: string;
  titleId?: string;
  closeHref?: string;
  onClose?: () => void;
  children: ReactNode;
}) {
  return (
    <header className="projects-overlay__titlebar">
      <TrafficLights closeHref={closeHref} onClose={onClose} />
      {children}
      <p id={titleId} className="projects-overlay__title">
        {title}
      </p>
    </header>
  );
}

function WorkHistoryNav() {
  const pager = useHistoryPager({ persist: true });

  return (
    <HistoryNav
      canForward={pager.canForward}
      onBack={pager.back}
      onForward={pager.forward}
    />
  );
}

export function WorkWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <WindowTitlebar title={title} closeHref="/">
        <WorkHistoryNav key={pathname} />
      </WindowTitlebar>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </main>
  );
}

function BackGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3 5 8l5 5" />
    </svg>
  );
}

function ForwardGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}
