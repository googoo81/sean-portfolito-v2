import { ExternalLink } from "@/components/ui";
import { toTelHref } from "@/lib/format";

type SocialLink = {
  href: string;
  label: string;
  icon: "github" | "medium" | "phone" | "mail";
  external?: boolean;
};

type SocialTileProps = {
  github: string;
  medium: string;
  phone: string;
  email: string;
};

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  const className = "size-5";

  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84a9.5 9.5 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (icon === "medium") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M4.07 7.35a.66.66 0 0 0-.21-.55L2.2 4.9V4.5h5.9l4.56 10 4.01-10h5.63v.4l-1.62 1.55a.4.4 0 0 0-.15.38v9.64c0 .1.04.2.15.38l1.58 1.55v.4h-8.03v-.4l1.64-1.59c.16-.16.16-.21.16-.38V8.43l-4.56 11.57h-.62L6.2 8.43v7.76c-.04.3.06.61.28.83l1.81 2.2v.4H2v-.4l1.81-2.2a.97.97 0 0 0 .26-.83V7.35Z" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3c0 .8-.7 1.5-1.6 1.5C9.5 19 5 14.5 5 6.1 5 5.2 5.7 4.5 6.5 4.5Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function SocialTile({ github, medium, phone, email }: SocialTileProps) {
  const links: SocialLink[] = [
    { href: github, label: "Github", icon: "github", external: true },
    { href: medium, label: "Medium", icon: "medium", external: true },
    { href: toTelHref(phone), label: "Phone", icon: "phone" },
    { href: `mailto:${email}`, label: "Email", icon: "mail" },
  ];

  return (
    <div className="grid h-full min-h-[16rem] grid-cols-2 grid-rows-2 gap-2.5 p-3 xl:min-h-0">
      {links.map((link) => {
        const className =
          "flex items-center justify-center rounded-[1.35rem] bg-soft text-foreground transition-colors hover:bg-soft-hover";

        if (link.external) {
          return (
            <ExternalLink
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className={className}
            >
              <SocialIcon icon={link.icon} />
            </ExternalLink>
          );
        }

        return (
          <a key={link.label} href={link.href} aria-label={link.label} className={className}>
            <SocialIcon icon={link.icon} />
          </a>
        );
      })}
    </div>
  );
}
