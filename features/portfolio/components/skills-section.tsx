import { Prose, Section } from "@/components/ui";
import { SkillGroupBlock } from "./skill-group-block";
import type { PortfolioIntro, SkillGroup } from "@/features/portfolio/types";

type SkillsSectionProps = {
  intro: PortfolioIntro;
  skills: SkillGroup[];
};

export function SkillsSection({ intro, skills }: SkillsSectionProps) {
  return (
    <Section id="about" title="About.">
      <div className="mb-12 max-w-2xl space-y-3">
        {intro.lines.map((line) => (
          <Prose key={line}>{line}</Prose>
        ))}
        <Prose className="text-foreground">{intro.closing}</Prose>
      </div>
      <div className="space-y-12">
        {skills.map((group) => (
          <SkillGroupBlock key={group.title} group={group} />
        ))}
      </div>
    </Section>
  );
}
