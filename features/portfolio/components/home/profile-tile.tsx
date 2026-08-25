import { BentoCard } from "@/components/ui";

const PROFILE_PHOTOS = {
  dark: "/Image/profile/dark.png",
  light: "/Image/profile/light.png",
} as const;

type ProfileTileProps = {
  className?: string;
  name: string;
};

export function ProfileTile({ className, name }: ProfileTileProps) {
  return (
    <BentoCard className={className}>
      <div
        className="relative h-full flex-1"
        role="img"
        aria-label={`${name} 프로필 사진`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROFILE_PHOTOS.dark}
          alt=""
          width={1774}
          height={887}
          draggable={false}
          className="profile-tile__photo profile-tile__photo--dark absolute inset-0 size-full object-cover object-right opacity-100 in-data-[theme=light]:opacity-0"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROFILE_PHOTOS.light}
          alt=""
          width={1774}
          height={887}
          draggable={false}
          className="profile-tile__photo profile-tile__photo--light absolute inset-0 size-full object-cover object-left opacity-0 in-data-[theme=light]:opacity-100"
        />
      </div>
    </BentoCard>
  );
}
