import { Section } from "@/components/ui";
import type { EducationItem } from "@/features/portfolio/types";

type EducationSectionProps = {
  education: EducationItem[];
};

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section id="education" title="Education.">
      <ul className="space-y-4">
        {education.map((item) => (
          <li key={item.school}>
            <h3 className="text-lg font-semibold text-foreground">
              {item.school}
            </h3>
            <p className="mt-1 text-sm text-muted">{item.period}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
