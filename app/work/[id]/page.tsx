import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPortfolio,
  getProjectById,
  getProjectIds,
  WorkCaseView,
} from "@/features/portfolio";

type WorkPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Work | 송현우" };
  }

  return {
    title: project.shortTitle,
    description: project.title,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const { contact } = getPortfolio();

  return <WorkCaseView project={project} contact={contact} />;
}
