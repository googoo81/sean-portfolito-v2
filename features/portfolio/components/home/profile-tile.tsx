import { BentoCard } from "@/components/ui";
import type { PortfolioContact } from "@/features/portfolio/types";

type ProfileTileProps = {
  contact: PortfolioContact;
  headline: string;
  className?: string;
};

export function ProfileTile({ contact, headline, className }: ProfileTileProps) {
  const initial = contact.name.charAt(0);

  return (
    <BentoCard className={className}>
      <div className="flex h-full min-h-[12rem] flex-col p-5 sm:p-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div
            className="glass-chip flex size-20 items-center justify-center rounded-full text-2xl font-medium text-foreground sm:size-24"
            aria-hidden
          >
            {initial}
          </div>
          <div>
            <p className="text-lg font-medium tracking-tight">{contact.name}</p>
            <p className="mt-1 text-sm text-muted">{headline}</p>
          </div>
        </div>
        <p className="text-center text-xs text-muted">프로필 이미지</p>
      </div>
    </BentoCard>
  );
}
