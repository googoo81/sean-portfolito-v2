"use client";

import { useEffect, useRef } from "react";
import {
  HERO_BACKGROUND_WORD,
  HERO_FOCUS_AREAS,
  HERO_YEAR,
} from "@/features/portfolio/constants";
import { usePrefersReducedMotion } from "@/features/portfolio/hooks";
import type { PortfolioIntro } from "@/features/portfolio/types";

type HeroSectionProps = {
  intro: PortfolioIntro;
};

export function HeroSection({ intro }: HeroSectionProps) {
  const lines = intro.headlineLines;
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLParagraphElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (reduced) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollProgress = 0;
    let frame = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate3d(${currentX * 18}px, ${currentY * 10 - scrollProgress * 48}px, 0)`;
      }

      if (markRef.current) {
        markRef.current.style.transform = `translate3d(${currentX * 28}px, ${currentY * 22}px, 0)`;
      }

      const first = lineRefs.current[0];
      const second = lineRefs.current[1];
      if (first) {
        first.style.transform = `translate3d(${-scrollProgress * 40}px, 0, 0)`;
      }
      if (second) {
        second.style.transform = `translate3d(${scrollProgress * 40}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const height = Math.max(rect.height, 1);
      scrollProgress = Math.min(1, Math.max(0, -rect.top / height));
    };

    frame = requestAnimationFrame(tick);
    section.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between overflow-hidden px-5 py-10 sm:px-8 lg:px-12 lg:py-14"
    >
      <div className="hero-fade relative z-10 flex items-baseline justify-between font-display text-xs tracking-[0.28em] uppercase">
        <span>Portfolio</span>
        <span>{HERO_YEAR}</span>
      </div>

      <h1 className="relative z-10 w-full py-16 sm:py-20">
        <span className="block overflow-hidden">
          <span
            ref={(node) => {
              lineRefs.current[0] = node;
            }}
            className="hero-reveal block text-[clamp(2.4rem,7.4vw,6.4rem)] leading-[0.94] font-semibold tracking-tight will-change-transform"
            style={{ animationDelay: "0.12s" }}
          >
            {lines[0]}
          </span>
        </span>
        <span className="mt-2 block overflow-hidden sm:mt-3">
          <span
            ref={(node) => {
              lineRefs.current[1] = node;
            }}
            className="hero-reveal block text-right text-[clamp(2.4rem,7.4vw,6.4rem)] leading-[0.94] font-semibold tracking-tight will-change-transform"
            style={{ animationDelay: "0.24s" }}
          >
            {lines[1]}
          </span>
        </span>
      </h1>

      <p
        ref={backgroundRef}
        aria-hidden
        className="pointer-events-none absolute top-[30%] right-[-6%] font-display text-[clamp(5rem,20vw,16rem)] leading-none font-extrabold tracking-tight text-foreground/5 select-none will-change-transform"
      >
        {HERO_BACKGROUND_WORD}
      </p>

      <div
        ref={markRef}
        aria-hidden
        className="pointer-events-none absolute top-[46%] left-[min(70%,calc(100%-4rem))] hidden will-change-transform sm:block"
      >
        <span className="relative block h-10 w-10 border border-foreground/20">
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-foreground/25" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-foreground/25" />
        </span>
      </div>

      <p
        className="hero-fade relative z-10 font-display text-[11px] tracking-[0.22em] text-muted uppercase sm:text-xs"
        style={{ animationDelay: "0.42s" }}
      >
        {HERO_FOCUS_AREAS.join(" / ")}
      </p>
    </section>
  );
}
