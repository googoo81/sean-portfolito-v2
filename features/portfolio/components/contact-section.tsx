import { ExternalLink, Section } from "@/components/ui";
import type { PortfolioContact } from "@/features/portfolio/types";
import { stripProtocol, toTelHref } from "@/lib/format";

type ContactSectionProps = {
  contact: PortfolioContact;
};

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <Section id="contact" title={`${contact.name}.`}>
      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Phone</dt>
          <dd className="mt-1">
            <a
              href={toTelHref(contact.phone)}
              className="text-foreground transition-colors hover:text-accent"
            >
              {contact.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Email</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${contact.email}`}
              className="text-foreground transition-colors hover:text-accent"
            >
              {contact.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Github</dt>
          <dd className="mt-1">
            <ExternalLink href={contact.github}>
              {stripProtocol(contact.github)}
            </ExternalLink>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Medium</dt>
          <dd className="mt-1">
            <ExternalLink href={contact.medium}>
              {stripProtocol(contact.medium)}
            </ExternalLink>
          </dd>
        </div>
      </dl>
    </Section>
  );
}
