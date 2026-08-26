import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return <p className={cn("prose", className)}>{children}</p>;
}
