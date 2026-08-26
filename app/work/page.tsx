import { getPortfolio } from "@/features/portfolio";
import { ProjectListView } from "@/features/portfolio/components/work/project-list-view";
import {
  TrafficLights,
  WorkHistoryNav,
} from "@/features/portfolio/components/work/projects-chrome";

export const metadata = {
  title: "Projects | 송현우",
  description: "송현우의 프로젝트 목록",
};

export default function WorkIndexPage() {
  const { projects } = getPortfolio();

  return (
    <main className="flex min-h-dvh flex-col bg-surface">
      <header className="projects-overlay__titlebar projects-overlay__titlebar--with-index">
        <TrafficLights closeHref="/" />
        <WorkHistoryNav />
        <p className="projects-overlay__title">Projects.</p>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ProjectListView projects={projects} />
      </div>
    </main>
  );
}
