"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import { useUi } from "@/features/portfolio/i18n";
import type { SkillItem } from "@/features/portfolio/types";

type SkillsTileProps = {
  skills: readonly SkillItem[];
};

export function SkillsTile({ skills }: SkillsTileProps) {
  const ui = useUi();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skills[activeIndex] ?? skills[0];

  if (!active) {
    return null;
  }

  return (
    <div className="skill-panel">
      <div className="skill-header">
        <p className="eyebrow skill-header__title">🛠️ Skills.</p>
        <div className="skill-tabs" role="radiogroup" aria-label={ui.skillsAria}>
          {skills.map((skill, index) => {
            const selected = index === activeIndex;

            return (
              <button
                key={skill.label}
                type="button"
                role="radio"
                aria-checked={selected}
                className={cn("skill-tab", selected && "is-active")}
                style={{ zIndex: selected ? skills.length + 2 : index + 1 }}
                onClick={() => setActiveIndex(index)}
              >
                <span className="skill-tab__label">{skill.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="skill-body">
        <p key={active.label} className="skill-desc">
          {active.description}
        </p>
      </div>
    </div>
  );
}
