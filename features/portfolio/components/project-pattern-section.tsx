import { Prose, Section } from "@/components/ui";

type ProjectPatternSectionProps = {
  pattern: string;
  closing: string;
};

export function ProjectPatternSection({
  pattern,
  closing,
}: ProjectPatternSectionProps) {
  return (
    <Section id="pattern" title="Project Pattern & Improvement.">
      <Prose className="max-w-2xl">{pattern}</Prose>
      <Prose className="mt-8 max-w-2xl border-t border-line pt-8 text-foreground">
        {closing}
      </Prose>
    </Section>
  );
}
