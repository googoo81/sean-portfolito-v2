import type { HistoryItem } from "@/features/portfolio/types";

type HistoryItemBlockProps = {
  item: HistoryItem;
};

export function HistoryItemBlock({ item }: HistoryItemBlockProps) {
  return (
    <article>
      <h3 className="text-lg font-semibold text-foreground">{item.company}</h3>
      <p className="mt-2 text-sm text-muted">
        Role: {item.role}
        <span className="mx-2 text-line">|</span>
        {item.period}
      </p>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted sm:text-base">
        {item.summary.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  );
}
