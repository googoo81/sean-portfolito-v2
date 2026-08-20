import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "animate-section scroll-mt-24 border-t border-line py-14 sm:py-16",
        className,
      )}
    >
      <h2 className="mb-8 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
