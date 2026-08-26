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
        className="profile-tile"
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
          className="profile-tile__photo profile-tile__photo--dark"
        />
        <Image
          src={PROFILE_PHOTOS.light}
          alt=""
          fill
          sizes="(orientation: landscape) 25vw, 100vw"
          draggable={false}
          className="profile-tile__photo profile-tile__photo--light"
        />
      </div>
    </BentoCard>
  );
}
