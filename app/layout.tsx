import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-ibm-plex-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "송현우 | 콘텐츠 마케터",
    template: "%s | 송현우",
  },
  description:
    "기획한 아이디어를 직접 구현하는 마케터 송현우. 브랜드 분석부터 이미지·영상·카피 제작까지 연결합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${ibmPlexSansKr.variable} h-full antialiased`}
    >
      <body className="page-atmosphere min-h-full flex flex-col font-sans text-foreground">
        <div className="noise-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
