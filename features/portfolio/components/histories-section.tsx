import { Section } from "@/components/ui";
import { HistoryItemBlock } from "./history-item-block";
import type { HistoryItem } from "@/features/portfolio/types";

type HistoriesSectionProps = {
  histories: HistoryItem[];
};

export function HistoriesSection({ histories }: HistoriesSectionProps) {
  return (
    <Section id="histories" title="Histories.">
      <div className="space-y-12">
        {histories.map((item) => (
          <HistoryItemBlock key={item.company} item={item} />
        ))}
      </div>
    </Section>
  );
}
