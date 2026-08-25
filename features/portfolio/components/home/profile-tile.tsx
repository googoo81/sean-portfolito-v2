import { BentoCard } from "@/components/ui";

type ProfileTileProps = {
  className?: string;
};

export function ProfileTile({ className }: ProfileTileProps) {
  return (
    <BentoCard className={className}>
      <div className="flex h-full min-h-[12rem] items-center justify-center p-5 sm:p-6">
        <p className="text-sm text-muted">프로필 이미지</p>
      </div>
    </BentoCard>
  );
}
