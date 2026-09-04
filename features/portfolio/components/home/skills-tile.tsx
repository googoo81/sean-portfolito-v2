"use client";

import { useState } from "react";
import { cn } from "@/lib/format";
import type { SkillItem } from "@/features/portfolio/types";

const DEFAULT_SKILL = "브랜드 분석";

type SkillsTileProps = {
  skills: readonly SkillItem[];
};

export function SkillsTile({ skills }: SkillsTileProps) {
  const [activeLabel, setActiveLabel] = useState(
    () =>
      skills.find((skill) => skill.label === DEFAULT_SKILL)?.label ??
      skills[0]?.label,
  );
  const active =
    skills.find((skill) => skill.label === activeLabel) ?? skills[0];

  if (!active) {
    return null;
  }

  return (
    <div className="skill-panel">
      <div className="skill-header">
        <p className="eyebrow skill-header__title">🛠️ Skills.</p>
        <div className="skill-tabs" role="radiogroup" aria-label="Skills">
          {skills.map((skill, index) => {
            const selected = skill.label === active.label;

            return (
              <button
                key={skill.label}
                type="button"
                role="radio"
                aria-checked={selected}
                className={cn("skill-tab", selected && "is-active")}
                style={{ zIndex: selected ? skills.length + 2 : index + 1 }}
                onClick={() => setActiveLabel(skill.label)}
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
