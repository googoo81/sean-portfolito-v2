import Link from "next/link";
import { BentoCard } from "@/components/ui";

type ProjectsGridCellProps = {
  className?: string;
};

export function ProjectsGridCell({ className }: ProjectsGridCellProps) {
  return (
    <BentoCard className={className}>
      <Link
        href="/work"
        aria-label="모든 프로젝트"
        className="flex h-full min-h-[12rem] cursor-pointer flex-col items-center justify-center gap-4 p-5"
      >
        <p className="text-sm font-medium tracking-[0.18em] text-foreground uppercase">
          Projects.
        </p>
        <span
          className="bento-projects__go flex size-10 items-center justify-center rounded-full border border-line bg-soft text-foreground"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7" />
            <path d="M9 7h8v8" />
          </svg>
        </span>
      </Link>
    </BentoCard>
  );
}
