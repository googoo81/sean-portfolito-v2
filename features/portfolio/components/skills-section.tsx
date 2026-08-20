import { Section } from "@/components/ui";
import { SkillGroupBlock } from "./skill-group-block";
import type { SkillGroup } from "@/features/portfolio/types";

type SkillsSectionProps = {
  skills: SkillGroup[];
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title="Skills.">
      <div className="space-y-12">
        {skills.map((group) => (
          <SkillGroupBlock key={group.title} group={group} />
        ))}
      </div>
    </Section>
  );
}
