"use client";

import { useEffect, useRef, useState } from "react";
import {
  SOCIAL_ACTION_ICONS,
  SOCIAL_ICONS,
  type SocialIconId,
} from "@/features/portfolio/constants";
import { cn, toTelHref } from "@/lib/format";
import { blurActiveElement } from "@/lib/blur-active-element";
import { useDebouncedCallback } from "@/lib/use-debounced-callback";
import type { PortfolioContact } from "@/features/portfolio/types";

type SocialLink = {
  href: string;
  label: string;
  icon: SocialIconId;
  copyValue: string;
  copyLabel: string;
  openLabel: string;
  external?: boolean;
};

function SocialGlyph({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="icon icon--xl icon--mask"
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
      }}
    />
  );
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

export function SocialTile({
  github,
  medium,
  phone,
  email,
}: Pick<PortfolioContact, "github" | "medium" | "phone" | "email">) {
  const [copiedId, setCopiedId] = useState<SocialIconId | null>(null);
  const copiedTimer = useRef<number>(0);

  useEffect(() => {
    return () => window.clearTimeout(copiedTimer.current);
  }, []);

  useEffect(() => {
    const blurSocialFocus = () => blurActiveElement(".social-chip");

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        blurSocialFocus();
      }
    };

    window.addEventListener("pageshow", blurSocialFocus);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("pageshow", blurSocialFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const handleCopy = useDebouncedCallback((id: SocialIconId, value: string) => {
    void copyToClipboard(value)
      .then(() => {
        setCopiedId(id);
        window.clearTimeout(copiedTimer.current);
        copiedTimer.current = window.setTimeout(() => {
          setCopiedId(null);
        }, 1600);
      })
      .catch(() => {
        setCopiedId(null);
      });
  });

  const links: SocialLink[] = [
    {
      href: github,
      label: "Github",
      icon: "github",
      copyValue: github,
      copyLabel: "Github 링크 복사",
      openLabel: "Github로 이동",
      external: true,
    },
    {
      href: medium,
      label: "Medium",
      icon: "medium",
      copyValue: medium,
      copyLabel: "Medium 링크 복사",
      openLabel: "Medium으로 이동",
      external: true,
    },
    {
      href: toTelHref(phone),
      label: "Phone",
      icon: "phone",
      copyValue: phone,
      copyLabel: "전화번호 복사",
      openLabel: "전화 걸기",
    },
    {
      href: `mailto:${email}`,
      label: "Email",
      icon: "mail",
      copyValue: email,
      copyLabel: "이메일 주소 복사",
      openLabel: "이메일 보내기",
    },
  ];

  return (
    <div className="social-grid">
      {links.map((link) => {
        const copied = copiedId === link.icon;

        return (
          <div
            key={link.label}
            role="group"
            aria-label={link.label}
            className="social-chip glass-chip"
          >
            <div className="social-chip__icon">
              <SocialGlyph src={SOCIAL_ICONS[link.icon]} />
              <span className="social-chip__caption">{link.label}</span>
            </div>
            <button
              type="button"
              className="social-chip__action"
              aria-label={copied ? "copied!" : link.copyLabel}
              onClick={(event) => {
                event.currentTarget.blur();
                handleCopy(link.icon, link.copyValue);
              }}
            >
              {copied ? (
                <span className="social-chip__copied">copied!</span>
              ) : (
                <>
                  <SocialGlyph src={SOCIAL_ACTION_ICONS.copy} />
                  <span className="social-chip__caption">Copy</span>
                </>
              )}
            </button>
            <a
              href={link.href}
              aria-label={link.openLabel}
              className={cn("social-chip__action", "social-chip__action--open")}
              onClick={(event) => {
                event.currentTarget.blur();
              }}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <SocialGlyph src={SOCIAL_ACTION_ICONS.open} />
              <span className="social-chip__caption">Open</span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
