import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

const ibmPlexSansKr = IBM_Plex_Sans_KR({
  variable: "--font-ibm-plex-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "송현우 | 콘텐츠 마케터",
  description:
    "기획한 아이디어를 직접 구현하는 마케터 송현우. 브랜드 분석부터 이미지·영상·카피 제작까지 연결합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${ibmPlexSansKr.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("portfolio-theme");const h=new Date().getHours();const m=t==="dark"||t==="light"?t:h>=9&&h<19?"light":"dark";document.documentElement.dataset.theme=m;document.documentElement.style.colorScheme=m}catch{document.documentElement.dataset.theme="dark"}`,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
