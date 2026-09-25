"use client";

import { Bar } from "@/components/charts/bar";
import { BarChart } from "@/components/charts/bar-chart";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { useLiteMotion } from "@/lib/use-lite-motion";
import type { Project } from "@/features/portfolio/types";
import "@/components/charts/bklit-utilities.css";

type FeaturedStat = NonNullable<Project["featuredStat"]>;

function rateOf(value: string) {
  const rate = Number.parseFloat(value);
  return Number.isFinite(rate) ? rate : 0;
}

export function FeaturedRateChart({ stat }: { stat: FeaturedStat }) {
  const liteMotion = useLiteMotion();
  const before = rateOf(stat.before);
  const after = rateOf(stat.after);

  return (
    <div className="project-tile__chart-plot">
      <BarChart
        animationDuration={800}
        aspectRatio="3.2 / 1"
        barGap={0.28}
        className="bklit-chart project-tile__bklit"
        data={[
          { name: stat.beforeName, rate: before },
          { name: stat.afterName, rate: after },
        ]}
        margin={{ top: 0, right: 72, bottom: 0, left: 36 }}
        orientation="horizontal"
        valueMax={100}
      >
        <Bar
          animate={!liteMotion}
          dataKey="rate"
          endLabel={(value) => `${value}%`}
          fadedOpacity={1}
          fill="color-mix(in srgb, var(--foreground) 28%, transparent)"
          fillAt={(index) => (index === 1 ? "#fd763f" : undefined)}
          lineCap={8}
        />
        <BarYAxis />
      </BarChart>
    </div>
  );
}
