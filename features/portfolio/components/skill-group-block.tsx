import { Prose } from "@/components/ui";
import type { SkillGroup } from "@/features/portfolio/types";

type SkillGroupBlockProps = {
  group: SkillGroup;
};

export function SkillGroupBlock({ group }: SkillGroupBlockProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
      <ul className="mt-5 space-y-6">
        {group.items.map((item) => (
          <li key={item.title}>
            <h4 className="text-sm font-medium text-accent">{item.title}</h4>
            <Prose className="mt-2">{item.body}</Prose>
          </li>
        ))}
      </ul>
    </div>
  );
}
