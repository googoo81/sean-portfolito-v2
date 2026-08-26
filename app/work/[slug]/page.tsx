import { notFound } from "next/navigation";
import { getPortfolio, getProjectBySlug } from "@/features/portfolio";
import { ProjectDetailView } from "@/features/portfolio/components/work/project-detail-view";
import { WorkWindow } from "@/features/portfolio/components/work/projects-chrome";

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
    <WorkWindow title={project.shortTitle}>
      <ProjectDetailView project={project} projects={projects} />
    </WorkWindow>
  );
}
