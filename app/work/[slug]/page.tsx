import { notFound } from "next/navigation";
import { getPortfolio, getProjectBySlug } from "@/features/portfolio";
import { LocaleProvider } from "@/features/portfolio/i18n";
import { WorkDetailClient } from "@/features/portfolio/components/work/work-detail-client";

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

  if (!getProjectBySlug(slug)) {
    notFound();
  }

  return (
    <LocaleProvider>
      <WorkDetailClient slug={slug} />
    </LocaleProvider>
  );
}
