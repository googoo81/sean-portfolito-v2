import { getPortfolio } from "@/features/portfolio";
import { ProjectListView } from "@/features/portfolio/components/work/project-list-view";
import { WorkWindow } from "@/features/portfolio/components/work/projects-chrome";

export const metadata = {
  title: "Projects | 송현우",
  description: "송현우의 프로젝트 목록",
};

export default function WorkIndexPage() {
  const { projects } = getPortfolio();

  return (
    <WorkWindow title="Projects.">
      <ProjectListView projects={projects} />
    </WorkWindow>
  );
}
