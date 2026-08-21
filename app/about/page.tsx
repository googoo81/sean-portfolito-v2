import type { Metadata } from "next";
import { AboutPageView, getPortfolio } from "@/features/portfolio";

export const metadata: Metadata = {
  title: "Story",
  description:
    "개발·디자인에서 콘텐츠 마케팅으로. 기획과 제작을 연결하는 마케터 송현우의 이야기.",
};

export default function AboutPage() {
  const portfolio = getPortfolio();
  return <AboutPageView portfolio={portfolio} />;
}
