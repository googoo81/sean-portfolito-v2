import Image from "next/image";
import { BentoCard } from "@/components/ui";

const PROFILE_PHOTOS = {
  dark: "/Image/profile/dark.webp",
  light: "/Image/profile/light.webp",
} as const;

type ProfileTileProps = {
  className?: string;
  name: string;
};

export function ProfileTile({ className, name }: ProfileTileProps) {
  return (
    <BentoCard className={className}>
      <div
        className="relative h-full min-h-[12rem] flex-1"
        role="img"
        aria-label={`${name} 프로필 사진`}
      >
        <Image
          src={PROFILE_PHOTOS.dark}
          alt=""
          fill
          priority
          sizes="(orientation: landscape) 25vw, 100vw"
          draggable={false}
          className="profile-tile__photo profile-tile__photo--dark object-cover object-right opacity-100 in-data-[theme=light]:opacity-0"
        />
        <Image
          src={PROFILE_PHOTOS.light}
          alt=""
          fill
          sizes="(orientation: landscape) 25vw, 100vw"
          draggable={false}
          className="profile-tile__photo profile-tile__photo--light object-cover object-left opacity-0 in-data-[theme=light]:opacity-100"
        />
      </div>
    </BentoCard>
  );
}
