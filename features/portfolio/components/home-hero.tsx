"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PortfolioIntro } from "@/features/portfolio/types";

type HomeHeroProps = {
  intro: PortfolioIntro;
  ctaEmail: string;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

/** Compact hero — works below do the talking */
export function HomeHero({ intro, ctaEmail }: HomeHeroProps) {
  const reduced = useReducedMotion();

  const block = (
    <>
      <p className="text-sm text-muted">{intro.greeting}</p>
      <h1 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-[2rem] sm:leading-snug">
        {intro.headline}
      </h1>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`mailto:${ctaEmail}`}
          className="inline-flex border-b border-foreground pb-0.5 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
        >
          Start a project
        </a>
        <p className="text-sm text-muted">{intro.credibility}</p>
      </div>
    </>
  );

  if (reduced) {
    return <section className="pb-4 pt-14 sm:pb-6 sm:pt-20">{block}</section>;
  }

  return (
    <motion.section
      className="pb-4 pt-14 sm:pb-6 sm:pt-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.p variants={item} className="text-sm text-muted">
        {intro.greeting}
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-4 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-[2rem] sm:leading-snug"
      >
        {intro.headline}
      </motion.h1>
      <motion.div
        variants={item}
        className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        <a
          href={`mailto:${ctaEmail}`}
          className="inline-flex border-b border-foreground pb-0.5 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
        >
          Start a project
        </a>
        <p className="text-sm text-muted">{intro.credibility}</p>
      </motion.div>
    </motion.section>
  );
}
