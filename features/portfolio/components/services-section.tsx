"use client";

import { FadeIn } from "@/components/ui/fade-in";
import type { ServiceItem } from "@/features/portfolio/types";

type ServicesSectionProps = {
  headline: string;
  services: ServiceItem[];
};

/** Light capability strip — not a skills resume */
export function ServicesSection({ headline, services }: ServicesSectionProps) {
  return (
    <section className="border-t border-line py-16 sm:py-24">
      <FadeIn>
        <h2 className="max-w-xl text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {headline}
        </h2>
      </FadeIn>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {services.map((service, index) => (
          <FadeIn key={service.title} delay={index * 0.05}>
            <article className="border-t border-line pt-5">
              <h3 className="text-sm font-medium text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
