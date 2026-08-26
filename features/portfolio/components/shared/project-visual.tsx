import { cn } from "@/lib/format";

type ProjectVisualProps = {
  className?: string;
};

export function ProjectVisual({ className }: ProjectVisualProps) {
  return (
    <div className={cn("project-visual", className)}>
      <p>미리보기 이미지</p>
    </div>
  );
}
