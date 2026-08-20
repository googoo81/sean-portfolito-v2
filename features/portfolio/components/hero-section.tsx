import type { PortfolioIntro } from "@/features/portfolio/types";

type HeroSectionProps = {
  intro: PortfolioIntro;
};

export function HeroSection({ intro }: HeroSectionProps) {
  return (
    <section id="top" className="scroll-mt-24 py-16 sm:py-24">
      <p className="animate-hero text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        Portfolio
      </p>
      <h1 className="animate-hero mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {intro.headline}
      </h1>
      <div className="animate-hero-delay mt-8 max-w-xl space-y-3 text-base leading-relaxed text-muted sm:text-lg">
        {intro.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="pt-2 text-foreground">{intro.closing}</p>
      </div>
    </section>
  );
}
