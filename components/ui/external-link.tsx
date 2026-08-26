import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({
  href,
  children,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("external-link", className)}
      {...props}
    >
      {children}
    </a>
  );
}
