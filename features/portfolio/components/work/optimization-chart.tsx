"use client";

import { useEffect, useRef, useState } from "react";
import "@/components/charts/bklit-utilities.css";
import { FunnelChart } from "@/components/charts/funnel-chart";
import type { ProjectComparison } from "@/features/portfolio/types";

function scrollParent(element: HTMLElement | null) {
  let node = element?.parentElement ?? null;

  while (node) {
    const { overflowY } = getComputedStyle(node);
    if (
      /(auto|scroll)/.test(overflowY) &&
      node.scrollHeight > node.clientHeight + 1
    ) {
      return node;
    }
    node = node.parentElement;
  }

  return null;
}

function useDrawWhenVisible() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: scrollParent(element), threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

type OptimizationChartProps = {
  comparison: ProjectComparison;
};

function count(value: number, unit: string) {
  return `${Math.round(value).toLocaleString("en-US")}${unit}`;
}

function FunnelColumn({
  label,
  color,
  unit,
  values,
  visible,
}: {
  label: string;
  color: string;
  unit: string;
  values: { label: string; value: number }[];
  visible: boolean;
}) {
  return (
    <div className="article__funnel">
      <p className="article__compare-label">{label}</p>
      {visible ? (
      <FunnelChart
        className="bklit-chart"
        color={color}
        data={values.map((stage) => ({
          label: stage.label,
          value: stage.value,
          displayValue: count(stage.value, unit),
        }))}
        edges="curved"
        formatPercentage={(pct) => `${pct.toFixed(1)}%`}
        gap={8}
        labelLayout="grouped"
        layers={2}
        orientation="horizontal"
      />
      ) : (
        <div className="article__funnel-canvas" />
      )}
    </div>
  );
}

export function OptimizationChart({ comparison }: OptimizationChartProps) {
  const unit = comparison.unit ?? "";
  const { ref, visible } = useDrawWhenVisible();

  return (
    <figure className="article__chart" ref={ref}>
      <div className="article__funnels">
        <FunnelColumn
          color="var(--chart-1)"
          label={comparison.beforeLabel}
          unit={unit}
          values={comparison.rows.map((row) => ({
            label: row.label,
            value: row.before,
          }))}
          visible={visible}
        />
        <FunnelColumn
          color="var(--chart-1)"
          label={comparison.afterLabel}
          unit={unit}
          values={comparison.rows.map((row) => ({
            label: row.label,
            value: row.after,
          }))}
          visible={visible}
        />
      </div>
    </figure>
  );
}
