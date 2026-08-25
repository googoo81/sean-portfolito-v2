import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/ui";
import { getPortfolio, getProjectBySlug } from "@/features/portfolio";
import { MotionPreference } from "@/features/portfolio/components/motion-preference";
import { ProjectArticle } from "@/features/portfolio/components/project-article";
import { ProjectVisual } from "@/features/portfolio/components/project-visual";

export function generateStaticParams() {
  return getPortfolio().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "송현우 | 콘텐츠 마케터" };
  }

  return {
    title: `${project.shortTitle} | 송현우`,
    description: project.title,
  };
}

export default async function WorkPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <MotionPreference />
      <ThemeToggle className="fixed top-5 right-5 z-50" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/"
          className="text-sm text-muted transition-opacity hover:text-foreground"
        >
          ← Home
        </Link>
        <div className="mt-8 h-64 overflow-hidden rounded-[2rem] bg-surface sm:h-80">
          <ProjectVisual className="min-h-full" />
        </div>
        <div className="mt-10">
          <ProjectArticle project={project} />
        </div>
      </main>
    </>
  );
}
