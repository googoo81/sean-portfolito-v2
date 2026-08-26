import { notFound } from "next/navigation";
import { getPortfolio, getProjectBySlug } from "@/features/portfolio";
import { ProjectDetailView } from "@/features/portfolio/components/work/project-detail-view";
import {
  TrafficLights,
  WorkHistoryNav,
} from "@/features/portfolio/components/work/projects-chrome";

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
  const { projects } = getPortfolio();
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <header className="projects-overlay__titlebar projects-overlay__titlebar--with-index">
        <TrafficLights closeHref="/" />
        <WorkHistoryNav />
        <p className="projects-overlay__title">
          {project.shortTitle}
        </p>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ProjectDetailView project={project} projects={projects} />
      </div>
    </main>
  );
}
