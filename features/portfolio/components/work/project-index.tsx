"use client";

import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/format";
import type { Project } from "@/features/portfolio/types";

type ProjectIndexProps = {
  projects: readonly Project[];
  activeSlug?: string;
  onSelect?: (project: Project) => void;
  onBackToList?: () => void;
};

type TipState = {
  label: string;
  top: number;
  left: number;
  placement: "right" | "bottom";
};

const rightTip = {
  opacity: 1,
  x: 0,
  y: "-50%",
  scale: 1,
} as const;

const bottomTip = {
  opacity: 1,
  x: "-50%",
  y: 0,
  scale: 1,
} as const;

export function ProjectIndex({
  projects,
  activeSlug,
  onSelect,
  onBackToList,
}: ProjectIndexProps) {
  return (
    <nav className="project-index" aria-label="프로젝트 목록">
      <ul className="project-index__list">
        <IndexSlot
          label="프로젝트 목록"
          active={!activeSlug}
          href={onBackToList ? undefined : "/work"}
          onClick={onBackToList}
        >
          <ListGlyph />
        </IndexSlot>
        <li className="project-index__rule" aria-hidden />
        {projects.map((project) => (
          <IndexSlot
            key={project.slug}
            label={project.shortTitle}
            active={project.slug === activeSlug}
            href={onSelect ? undefined : `/work/${project.slug}`}
            onClick={onSelect ? () => onSelect(project) : undefined}
          >
            {project.shortTitle.slice(0, 2)}
          </IndexSlot>
        ))}
      </ul>
    </nav>
  );
}

function ListGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

function IndexSlot({
  label,
  active = false,
  href,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const slotRef = useRef<HTMLLIElement>(null);
  const showTimer = useRef(0);
  const [tip, setTip] = useState<TipState | null>(null);
  const className = cn("project-index__item", active && "is-active");
  const icon = (
    <span className="project-index__icon" aria-hidden>
      {children}
    </span>
  );

  const showTip = () => {
    window.clearTimeout(showTimer.current);
    showTimer.current = window.setTimeout(() => {
      const bounds = slotRef.current?.getBoundingClientRect();
      if (!bounds) {
        return;
      }

      const shell = slotRef.current?.closest(".projects-shell");
      const shellWidth = shell?.getBoundingClientRect().width ?? window.innerWidth;
      const horizontal = shellWidth < 768;
      setTip(
        horizontal
          ? {
              label,
              top: bounds.bottom + 10,
              left: bounds.left + bounds.width / 2,
              placement: "bottom",
            }
          : {
              label,
              top: bounds.top + bounds.height / 2,
              left: bounds.right + 10,
              placement: "right",
            },
      );
    }, 80);
  };

  const hideTip = () => {
    window.clearTimeout(showTimer.current);
    setTip(null);
  };

  return (
    <li
      ref={slotRef}
      className="project-index__slot"
      onPointerEnter={showTip}
      onPointerLeave={hideTip}
      onPointerDown={hideTip}
    >
      {active ? (
        <div className={className} aria-current="page" aria-label={label}>
          {icon}
        </div>
      ) : onClick ? (
        <button type="button" className={className} aria-label={label} onClick={onClick}>
          {icon}
        </button>
      ) : href ? (
        <Link href={href} className={className} aria-label={label}>
          {icon}
        </Link>
      ) : null}
      {typeof document === "undefined"
        ? null
        : createPortal(
            <AnimatePresence>
              {tip ? (
                <motion.div
                  key={label}
                  role="tooltip"
                  className={cn(
                    "project-index__tip",
                    tip.placement === "bottom" && "project-index__tip--bottom",
                  )}
                  style={{ top: tip.top, left: tip.left }}
                  initial={
                    tip.placement === "right"
                      ? { opacity: 0, x: -6, y: "-50%", scale: 0.96 }
                      : { opacity: 0, x: "-50%", y: -4, scale: 0.96 }
                  }
                  animate={tip.placement === "right" ? rightTip : bottomTip}
                  exit={
                    tip.placement === "right"
                      ? { opacity: 0, x: -4, y: "-50%", scale: 0.98 }
                      : { opacity: 0, x: "-50%", y: -2, scale: 0.98 }
                  }
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  {tip.label}
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )}
    </li>
  );
}
