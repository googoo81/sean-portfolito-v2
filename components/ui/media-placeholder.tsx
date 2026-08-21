import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type MediaPlaceholderProps = {
  label: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
  children?: ReactNode;
};

const aspectClass = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
} as const;

/** Soft image slot — reads as media frame, not form field */
export function MediaPlaceholder({
  label,
  aspect = "video",
  className,
  children,
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex w-full items-end overflow-hidden bg-[#dfe6e1]",
        aspectClass[aspect],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.45),transparent_55%),linear-gradient(160deg,#e8eee9_0%,#d2dbd5_100%)]" />
      <div className="relative z-10 w-full p-4 sm:p-5">
        <p className="max-w-[90%] text-[11px] leading-snug text-foreground/45 sm:text-xs">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}
