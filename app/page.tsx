import { getPortfolio, PortfolioPage } from "@/features/portfolio";

export default function Home() {
  const portfolio = getPortfolio();

  return <PortfolioPage portfolio={portfolio} />;
}
