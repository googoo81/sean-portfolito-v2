import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={cn("bento-grid", className)}>{children}</div>;
}

type BentoCardProps = {
  as?: "section" | "article" | "div";
  id?: string;
  children?: ReactNode;
  className?: string;
};

export function BentoCard({
  as: Comp = "section",
  id,
  children,
  className,
}: BentoCardProps) {
  return (
    <Comp
      id={id}
      className={cn(
        "bento-card flex h-full min-h-[12rem] min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface sm:rounded-[2rem] xl:min-h-0",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
