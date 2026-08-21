"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PortfolioAbout } from "@/features/portfolio/types";

type AboutHeroProps = {
  about: PortfolioAbout;
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

export function AboutHero({ about, ctaEmail }: AboutHeroProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className="pb-6 pt-14 sm:pt-20">
        <h1 className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-[2rem]">
          {about.headline}
        </h1>
        <a
          href={`mailto:${ctaEmail}`}
          className="mt-8 inline-flex border-b border-foreground pb-0.5 text-sm font-medium transition-opacity hover:opacity-60"
        >
          Start a project
        </a>
      </section>
    );
  }

  return (
    <motion.section
      className="pb-6 pt-14 sm:pt-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={item}
        className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-[2rem]"
      >
        {about.headline}
      </motion.h1>
      <motion.div variants={item} className="mt-8">
        <a
          href={`mailto:${ctaEmail}`}
          className="inline-flex border-b border-foreground pb-0.5 text-sm font-medium transition-opacity hover:opacity-60"
        >
          Start a project
        </a>
      </motion.div>
    </motion.section>
  );
}
