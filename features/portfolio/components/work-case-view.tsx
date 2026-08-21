import Link from "next/link";
import { ExternalLink, Prose } from "@/components/ui";
import { FadeIn } from "@/components/ui/fade-in";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { SiteShell } from "./site-shell";
import type { PortfolioContact, Project } from "@/features/portfolio/types";

type WorkCaseViewProps = {
  project: Project;
  contact: PortfolioContact;
};

/** Case study — media first, process copy last */
export function WorkCaseView({ project, contact }: WorkCaseViewProps) {
  const { media } = project;

  return (
    <SiteShell contact={contact}>
      <article className="pb-8 pt-12 sm:pt-16">
        <FadeIn>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ← Works
          </Link>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {project.shortTitle}
              </h1>
              <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
                {project.title}
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-3 text-[11px] tracking-wide text-muted">
              {media.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn className="mt-10">
          <MediaPlaceholder
            label={media.coverLabel}
            aspect="wide"
            className="min-h-[280px] border-0 sm:min-h-[440px]"
          />
        </FadeIn>

        {media.galleryLabels && media.galleryLabels.length > 0 ? (
          <FadeIn className="mt-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {media.galleryLabels.map((label) => (
                <MediaPlaceholder
                  key={label}
                  label={label}
                  aspect="portrait"
                  className="border-0"
                />
              ))}
            </div>
          </FadeIn>
        ) : null}

        {media.videoPosterLabel ? (
          <FadeIn className="mt-6">
            <MediaPlaceholder
              label={media.videoPosterLabel}
              aspect="video"
              className="border-0"
            />
          </FadeIn>
        ) : null}

        {project.links && project.links.length > 0 ? (
          <FadeIn className="mt-8">
            <ul className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <li key={link.href}>
                  <ExternalLink
                    href={link.href}
                    className="text-sm border-b border-foreground pb-0.5"
                  >
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </FadeIn>
        ) : null}

        <div className="mt-20 grid max-w-3xl gap-12 border-t border-line pt-14 sm:gap-16">
          <FadeIn>
            <h2 className="text-sm font-medium text-foreground">Brief</h2>
            <Prose className="mt-3">{project.situation}</Prose>
          </FadeIn>
          <FadeIn>
            <h2 className="text-sm font-medium text-foreground">What I made</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted sm:text-base">
              {project.actions.map((action) => (
                <li key={action} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              {project.tools} · {project.period}
            </p>
          </FadeIn>
          <FadeIn>
            <h2 className="text-sm font-medium text-foreground">Takeaway</h2>
            <Prose className="mt-3">{project.result}</Prose>
          </FadeIn>
        </div>
      </article>
    </SiteShell>
  );
}
