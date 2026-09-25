import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";
import { ExternalLink } from "./external-link";

function ArrowLinkBody({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="arrow-link__text">{children}</span>
      <span className="arrow-link__mark" aria-hidden>
        ↗
      </span>
    </>
  );
}

type ArrowLinkAnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

type ArrowLinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  children: ReactNode;
};

export function ArrowLink(props: ArrowLinkAnchorProps | ArrowLinkButtonProps) {
  if (props.href) {
    const { href, children, className } = props;

    return (
      <ExternalLink href={href} className={cn("arrow-link", className)}>
        <ArrowLinkBody>{children}</ArrowLinkBody>
      </ExternalLink>
    );
  }

  const { children, className, type = "button", ...rest } = props;

  return (
    <button type={type} className={cn("arrow-link", className)} {...rest}>
      <ArrowLinkBody>{children}</ArrowLinkBody>
    </button>
  );
}
