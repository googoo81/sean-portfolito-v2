import type { ReactNode } from "react";
import { CollaborateCta } from "./collaborate-cta";
import { MotionPreference } from "./motion-preference";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import type { PortfolioContact } from "@/features/portfolio/types";

type SiteShellProps = {
  contact: PortfolioContact;
  children: ReactNode;
  ctaHeadline?: string;
  ctaSubline?: string;
};

export function SiteShell({
  contact,
  children,
  ctaHeadline,
  ctaSubline,
}: SiteShellProps) {
  return (
    <>
      <MotionPreference />
      <SiteNav brandName={contact.name} />
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        {children}
        <CollaborateCta
          contact={contact}
          headline={ctaHeadline}
          subline={ctaSubline}
        />
      </main>
      <SiteFooter name={contact.name} />
    </>
  );
}
