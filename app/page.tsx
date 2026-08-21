import { getPortfolio, HomePageView } from "@/features/portfolio";

export default function Home() {
  const portfolio = getPortfolio();
  return <HomePageView portfolio={portfolio} />;
}
