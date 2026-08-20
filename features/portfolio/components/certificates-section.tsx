import { Section } from "@/components/ui";
import type { CertificateItem } from "@/features/portfolio/types";

type CertificatesSectionProps = {
  certificates: CertificateItem[];
};

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  return (
    <Section id="certificates" title="Certificates.">
      <ul className="space-y-4">
        {certificates.map((item) => (
          <li key={item.name}>
            <h3 className="text-lg font-semibold text-foreground">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{item.date}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
