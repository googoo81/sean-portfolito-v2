import { ExternalLink } from "@/components/ui";
import { SOCIAL_ICONS, type SocialIconId } from "@/features/portfolio/constants";
import { toTelHref } from "@/lib/format";
import type { PortfolioContact } from "@/features/portfolio/types";

type SocialLink = {
  href: string;
  label: string;
  icon: SocialIconId;
  external?: boolean;
};

function SocialGlyph({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="size-5 bg-current"
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}

export function SocialTile({
  github,
  medium,
  phone,
  email,
}: Pick<PortfolioContact, "github" | "medium" | "phone" | "email">) {
  const links: SocialLink[] = [
    { href: github, label: "Github", icon: "github", external: true },
    { href: medium, label: "Medium", icon: "medium", external: true },
    { href: toTelHref(phone), label: "Phone", icon: "phone" },
    { href: `mailto:${email}`, label: "Email", icon: "mail" },
  ];

  return (
    <div className="grid h-full min-h-64 grid-cols-2 grid-rows-2 gap-2.5 p-3 xl:min-h-0">
      {links.map((link) => {
        const className =
          "glass-chip flex items-center justify-center rounded-[1.35rem] text-foreground transition-colors hover:bg-soft-hover";
        const icon = <SocialGlyph src={SOCIAL_ICONS[link.icon]} />;

        if (link.external) {
          return (
            <ExternalLink
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className={className}
            >
              {icon}
            </ExternalLink>
          );
        }

        return (
          <a key={link.label} href={link.href} aria-label={link.label} className={className}>
            {icon}
          </a>
        );
      })}
    </div>
  );
}
