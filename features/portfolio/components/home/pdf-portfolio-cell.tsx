"use client";

import { BentoCard } from "@/components/ui";
import { trackPortfolioEvent } from "@/components/analytics/track";
import { useUi } from "@/features/portfolio/i18n";
import { GoArrow } from "./projects/go-arrow";

type PdfPortfolioCellProps = {
  href: string;
  className?: string;
};

export function PdfPortfolioCell({ href, className }: PdfPortfolioCellProps) {
  const ui = useUi();

  return (
    <BentoCard className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui.pdfPortfolio.open}
        className="bento-pdf__link"
        onClick={() => {
          trackPortfolioEvent("contact_click", {
            contact_method: "pdf",
            contact_action: "open",
          });
        }}
      >
        <span className="bento-pdf__copy">
          <span className="bento-pdf__title">{ui.pdfPortfolio.title}</span>
          <span className="bento-pdf__action">{ui.pdfPortfolio.action}</span>
        </span>
        <span className="bento-projects__go" aria-hidden>
          <span className="bento-projects__go-icons">
            <GoArrow />
            <GoArrow />
          </span>
        </span>
      </a>
    </BentoCard>
  );
}
