import { cn } from "@/lib/format";

type ProjectVisualProps = {
  className?: string;
};

export function ProjectVisual({ className }: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[16rem] items-center justify-center bg-soft",
        className,
      )}
    >
      <p className="text-sm text-muted">미리보기 이미지</p>
    </div>
  );
}
