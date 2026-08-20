import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-muted sm:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
}
