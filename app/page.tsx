import { LocaleProvider } from "@/features/portfolio/i18n";
import { PortfolioPage } from "@/features/portfolio";

export default function Home() {
  return (
    <LocaleProvider>
      <PortfolioPage />
    </LocaleProvider>
  );
}
