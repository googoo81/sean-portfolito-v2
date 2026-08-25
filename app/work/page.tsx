import Link from "next/link";
import { ThemeToggle } from "@/components/ui";
import { getPortfolio } from "@/features/portfolio";
import { ProjectTileCompact } from "@/features/portfolio/components/home/projects/project-tile-compact";

export const metadata = {
  title: "Projects | 송현우",
  description: "송현우의 프로젝트 목록",
};

export default function WorkIndexPage() {
  const { projects } = getPortfolio();

  return (
    <>
      <ThemeToggle className="fixed top-5 right-5 z-50" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/"
          className="glass-chip inline-flex rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Home
        </Link>
        <p className="mt-8 text-xs font-medium tracking-[0.18em] text-muted uppercase">
          Projects.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectTileCompact key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
