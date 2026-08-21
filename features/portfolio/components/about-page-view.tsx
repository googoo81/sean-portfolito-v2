import { FadeIn } from "@/components/ui/fade-in";
import { AboutHero } from "./about-hero";
import { SiteShell } from "./site-shell";
import type { Portfolio } from "@/features/portfolio/types";

type AboutPageViewProps = {
  portfolio: Portfolio;
};

/**
 * Story page — narrative + quiet timeline.
 * No bullet job duties (that reads as a résumé).
 */
export function AboutPageView({ portfolio }: AboutPageViewProps) {
  const { about, histories, education, certificates, contact } = portfolio;

  const educationLine = [
    ...education.map((e) => e.school),
    ...certificates.map((c) => c.name),
  ].join(" · ");

  return (
    <SiteShell
      contact={contact}
      ctaHeadline="같이 다음 콘텐츠를 만들어요"
      ctaSubline="Open for collaborations"
    >
      <AboutHero about={about} ctaEmail={contact.email} />

      <section className="py-6 sm:py-10">
        <FadeIn>
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted sm:text-lg">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-line py-14 sm:py-16">
        <FadeIn>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            Along the way
          </h2>
          <ul className="mt-8 space-y-6">
            {histories.map((item) => (
              <li
                key={item.company}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <p className="text-foreground">
                  <span className="font-medium">{item.role}</span>
                  <span className="text-muted"> · {item.company}</span>
                </p>
                <p className="shrink-0 text-sm text-muted">{item.period}</p>
              </li>
            ))}
          </ul>
          {educationLine ? (
            <p className="mt-10 text-sm text-muted">{educationLine}</p>
          ) : null}
        </FadeIn>
      </section>

      <section className="border-t border-line py-14 sm:py-16">
        <FadeIn>
          <h2 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            {about.stanceTitle}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted">
            {about.stance.slice(0, 2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </section>
    </SiteShell>
  );
}
