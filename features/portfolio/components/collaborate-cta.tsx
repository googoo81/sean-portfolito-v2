import { ExternalLink } from "@/components/ui";
import type { PortfolioContact } from "@/features/portfolio/types";

type CollaborateCtaProps = {
  contact: PortfolioContact;
  headline?: string;
  subline?: string;
};

export function CollaborateCta({
  contact,
  headline = "다음 작업을 같이해요",
  subline = "Open for collaborations",
}: CollaborateCtaProps) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {headline}
      </h2>
      <p className="mt-4 text-sm text-muted">{subline}</p>
      <a
        href={`mailto:${contact.email}`}
        className="mt-8 inline-flex border-b border-foreground pb-0.5 text-base font-medium text-foreground transition-opacity hover:opacity-60"
      >
        {contact.email}
      </a>
      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <li>
          <ExternalLink href={contact.github}>Github</ExternalLink>
        </li>
        <li>
          <ExternalLink href={contact.medium}>Medium</ExternalLink>
        </li>
      </ul>
    </section>
  );
}
