"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const glyph = "pointer-events-none";

const closeIcon = (
  <svg viewBox="0 0 12 12" className={glyph} fill="none">
    <path
      d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
      stroke="#4d0000"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

const minIcon = (
  <svg viewBox="0 0 12 12" className={glyph} fill="none">
    <path
      d="M2.4 6h7.2"
      stroke="#995700"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

export function TrafficLights({
  onClose,
  closeHref,
}: {
  onClose?: () => void;
  closeHref?: string;
}) {
  return (
    <div className="projects-overlay__lights">
      {closeHref ? (
        <Link
          href={closeHref}
          aria-label="닫기"
          className="projects-overlay__light projects-overlay__light--close"
        >
          {closeIcon}
        </Link>
      ) : (
        <button
          type="button"
          aria-label="닫기"
          className="projects-overlay__light projects-overlay__light--close"
          onClick={onClose}
        >
          {closeIcon}
        </button>
      )}
      {closeHref ? (
        <Link
          href={closeHref}
          aria-label="홈으로"
          className="projects-overlay__light projects-overlay__light--min"
        >
          {minIcon}
        </Link>
      ) : (
        <button
          type="button"
          aria-label="홈으로"
          className="projects-overlay__light projects-overlay__light--min"
          onClick={onClose}
        >
          {minIcon}
        </button>
      )}
      <span
        aria-hidden
        className="projects-overlay__light projects-overlay__light--zoom"
      >
        <svg viewBox="0 0 12 12" className={glyph}>
          <path fill="#006400" d="M6.4 2.7h2.9v2.9L6.4 2.7Z" />
          <path fill="#006400" d="M5.6 9.3H2.7V6.4L5.6 9.3Z" />
        </svg>
      </span>
    </div>
  );
}

export function HistoryNav({
  onBack,
  onForward,
  canForward,
  backHref,
}: {
  onBack?: () => void;
  onForward?: () => void;
  canForward: boolean;
  backHref?: string;
}) {
  return (
    <div className="projects-overlay__nav">
      {backHref ? (
        <Link href={backHref} aria-label="뒤로" className="projects-overlay__nav-btn">
          <BackGlyph />
        </Link>
      ) : (
        <button
          type="button"
          aria-label="뒤로"
          className="projects-overlay__nav-btn"
          onClick={onBack}
        >
          <BackGlyph />
        </button>
      )}
      {onForward ? (
        <button
          type="button"
          aria-label="앞으로"
          className="projects-overlay__nav-btn"
          disabled={!canForward}
          onClick={onForward}
        >
          <ForwardGlyph />
        </button>
      ) : (
        <span className="projects-overlay__nav-btn" aria-disabled>
          <ForwardGlyph muted />
        </span>
      )}
    </div>
  );
}

let workForwardSteps = 0;
let skipPathReset = false;

export function WorkHistoryNav() {
  const pathname = usePathname();
  const [forwardSteps, setForwardSteps] = useState(workForwardSteps);

  useEffect(() => {
    if (skipPathReset) {
      skipPathReset = false;
      return;
    }

    workForwardSteps = 0;
    setForwardSteps(0);
  }, [pathname]);

  return (
    <HistoryNav
      canForward={forwardSteps > 0}
      onBack={() => {
        skipPathReset = true;
        workForwardSteps = forwardSteps + 1;
        setForwardSteps(workForwardSteps);
        history.back();
      }}
      onForward={() => {
        if (forwardSteps === 0) {
          return;
        }

        skipPathReset = true;
        workForwardSteps = forwardSteps - 1;
        setForwardSteps(workForwardSteps);
        history.forward();
      }}
    />
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

function ForwardGlyph({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={muted ? "size-4 opacity-40" : "size-4"}
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
