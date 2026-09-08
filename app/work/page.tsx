import { LocaleProvider } from "@/features/portfolio/i18n";
import { WorkIndexClient } from "@/features/portfolio/components/work/work-index-client";

export const metadata = {
  title: "Projects | 송현우",
  description: "송현우의 프로젝트 목록",
};

export default function WorkIndexPage() {
  return (
    <LocaleProvider>
      <WorkIndexClient />
    </LocaleProvider>
  );
}
