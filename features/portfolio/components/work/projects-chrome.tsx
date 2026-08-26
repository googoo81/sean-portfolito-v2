"use client";

import type { PointerEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHistoryPager } from "./use-history-pager";

const glyph = "pointer-events-none";
const LIGHT_SIZE = 12;
const LIGHT_DESIGN = 50;

function scaled(size: number) {
  return (size * LIGHT_SIZE) / LIGHT_DESIGN;
}

function TrafficGlyph({
  src,
  width,
  height,
  className = glyph,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      width={scaled(width)}
      height={scaled(height)}
      draggable={false}
      className={className}
    />
  );
}

export function CloseLightIcon({ className = glyph }: { className?: string }) {
  return (
    <TrafficGlyph
      src="/svg/header/close.svg"
      width={26}
      height={27}
      className={className}
    />
  );
}

export function MinLightIcon({ className = glyph }: { className?: string }) {
  return (
    <TrafficGlyph
      src="/svg/header/minimize.svg"
      width={30}
      height={6}
      className={className}
    />
  );
}

export function ZoomLightIcon({ className = glyph }: { className?: string }) {
  return (
    <TrafficGlyph
      src="/svg/header/zoom.svg"
      width={22}
      height={22}
      className={className}
    />
  );
}

export function ExpandLightIcon({ className = glyph }: { className?: string }) {
  return (
    <TrafficGlyph
      src="/svg/header/expand.svg"
      width={38}
      height={38}
      className={className}
    />
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
  onZoom,
  maximized = true,
}: {
  onClose?: () => void;
  closeHref?: string;
  onZoom?: () => void;
  maximized?: boolean;
}) {
  const zoomLabel = maximized ? "창 크기 복원" : "전체 화면";
  const zoomIcon = maximized ? <ExpandLightIcon /> : <ZoomLightIcon />;

  return (
    <div
      className="projects-overlay__lights"
      onPointerDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
    >
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
      {onZoom ? (
        <button
          type="button"
          aria-label={zoomLabel}
          className="projects-overlay__light projects-overlay__light--zoom"
          onClick={onZoom}
        >
          {zoomIcon}
        </button>
      ) : (
        <span
          aria-hidden
          className="projects-overlay__light projects-overlay__light--zoom"
        >
          {zoomIcon}
        </span>
      )}
    </div>
  );
}

export function HistoryNav({
  onBack,
  onForward,
  canBack = true,
  canForward,
}: {
  onBack: () => void;
  onForward: () => void;
  canBack?: boolean;
  canForward: boolean;
}) {
  return (
    <div
      className="projects-overlay__nav"
      onPointerDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="뒤로"
        className="projects-overlay__nav-btn"
        disabled={!canBack}
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
  onZoom,
  maximized,
  onMovePointerDown,
  children,
}: {
  title: string;
  titleId?: string;
  closeHref?: string;
  onClose?: () => void;
  onZoom?: () => void;
  maximized?: boolean;
  onMovePointerDown?: (event: PointerEvent<HTMLElement>) => void;
  children: ReactNode;
}) {
  return (
    <header
      className={`projects-overlay__titlebar${
        onMovePointerDown ? " projects-overlay__titlebar--move" : ""
      }`}
      onDoubleClick={onZoom}
      onPointerDown={onMovePointerDown}
    >
      <TrafficLights
        closeHref={closeHref}
        onClose={onClose}
        onZoom={onZoom}
        maximized={maximized}
      />
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
    <main className="projects-shell flex min-h-dvh flex-col bg-surface">
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
