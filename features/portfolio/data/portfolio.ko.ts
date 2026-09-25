import { getStackItems } from "@/features/portfolio/constants";
import type { Portfolio } from "@/features/portfolio/types";

export const portfolioKo: Portfolio = {
  intro: {
    headline: "기획한 아이디어를\n직접 구현하는 마케터",
    subhead: "전략에서 콘텐츠, 실행까지 한 흐름으로 설계합니다.",
    process: ["Strategy", "Content", "Execution"],
    closing:
      "분석에서 끝나는 것이 아니라 타깃과 채널에 맞는 콘텐츠가 실제 결과물로 이어지는 과정까지 직접 설계합니다.",
    pairs: [
      ["Planning", "Visual"],
      ["Copy", "Development"],
    ],
  },
  contact: {
    name: "송현우",
    phone: "010-9052-4780",
    email: "officialhyeanwoo@gmail.com",
    github: "https://github.com/googoo81",
    linkedin:
      "https://www.linkedin.com/in/%ED%98%84%EC%9A%B0-%EC%86%A1-a058b528a/",
  },
  stack: getStackItems("ko"),
  featuredSlug: "chicment",
  skills: [
    {
      label: "브랜드 분석",
      description:
        "브랜드와 경쟁사의 제품, 콘텐츠, 고객 반응을 조사하여 브랜드가 가진 특징과 차별점을 찾습니다.\n분석한 내용을 단순히 나열하기보다 타깃과 콘텐츠 전략으로 연결하고자 합니다.",
    },
    {
      label: "브랜드 리서치",
      description:
        "타깃의 관심사와 라이프스타일을 바탕으로 콘텐츠의 주제와 메시지를 설정합니다.\n브랜드가 전달하려는 내용을 사용자가 쉽게 이해하고 관심을 가질 수 있는 콘셉트로 정리합니다.",
    },
    {
      label: "이미지 콘텐츠",
      description:
        "Figma와 생성형 AI를 활용하여 카드뉴스, 인스타그램 캐러셀, 광고 소재 등을 제작할 수 있습니다.\n콘텐츠의 흐름과 이미지 배치를 고려하여 브랜드 메시지를 시각적으로 전달합니다.",
    },
    {
      label: "숏폼 콘텐츠",
      description:
        "콘텐츠의 콘셉트부터 장면 구성, 스토리보드, 카피까지 기획할 수 있습니다.\n이미지와 영상이 자연스럽게 이어지고 사용자가 끝까지 볼 수 있는 흐름을 고민합니다.",
    },
    {
      label: "스토리텔링",
      description:
        "브랜드 소개에서 제품과 채널, 사용자 행동으로 이어지는 콘텐츠 흐름을 설계합니다.\n각 이미지와 문장이 따로 보이지 않고 하나의 이야기로 연결되도록 구성합니다.",
    },
    {
      label: "카피라이팅",
      description:
        "콘텐츠의 목적과 채널에 맞게 제목, 본문, CTA 문구를 작성합니다.\n사용자가 콘텐츠를 본 뒤 어떤 행동을 해야 하는지 명확하게 전달하고자 합니다.",
    },
  ],
  projects: [
    {
      slug: "bareway",
      shortTitle: "배리웨이",
      title: "맛별 코디로, 다시 떠올릴 맛을 릴스로 만들었습니다.",
      kind: "team",
      meta: "팀 프로젝트(5인) · 운영 전 기획안 | 담당: 릴스 제작",
      tools: "Figma · CapCut · 생성형 AI",
      period: "2026.07",
      icon: "/project/variway/icon.png",
      summary:
        "맛으로 다시 기억하고, 출근 전 한 끼와 검색으로 다시 선택하게 한 2주 기획안입니다.",
      problemLabel: "Market Analysis",
      problemLead:
        "할인 메시지 속에서, 산 사람이 다시 떠올릴 이유가 없었습니다.",
      problem:
        "플라이밀·프로티원처럼 스펙과 할인으로 말하는 시장에서, 배리웨이를 다시 살 이유가 전달되지 않았습니다.",
      strategyLabel: "Strategy",
      strategyLead: "맛으로 다시 기억하고, 루틴으로 다시 선택하게 했습니다.",
      strategy:
        "인스타그램은 맛을 다시 보여주고, 카카오는 출근 전 한 끼를 제안하고, 네이버는 검색을 구매로 잇습니다.",
      strategyPoints: [],
      executionLabel: "Channel Strategy",
      execution: [],
      channels: [
        {
          name: "Instagram Owned",
          role: "맛과 패키지를 다시 기억하게 함",
          items: [
            "릴스 ‘맛별 코디 모음.zip’",
            "패키지 색과 패션 코디를 연결하고, 다른 맛을 제안",
          ],
        },
        {
          name: "Kakao Bizboard",
          role: "출근 전 한 끼라는 새 이유를 제안",
          items: ["‘출근 전 단 게 땡긴다면?’", "‘가볍게 챙기는 데일리 프로틴’"],
        },
        {
          name: "Naver Powerlink",
          role: "검색을 상세페이지와 구매로 연결",
          items: [
            "‘풍부한 식이섬유 단백질쉐이크’",
            "‘끝까지 맛있는 배리웨이 쉐이크’",
          ],
        },
      ],
      creative: {
        label: "Reel Creative",
        lead: "릴스 ‘맛별 코디 모음.zip’을 제작했습니다.",
        body: "단백질 광고처럼 보이지 않게, 패키지 색과 패션 코디를 맞춰 취향을 고르는 콘텐츠로 만들었습니다.\n이미 먹어본 맛을 다시 떠올리게 하고, 아직 안 먹어본 맛으로 이어지게 했습니다.\n딸기, 말차, 초코, 커피 순으로 프레임을 쌓아, 파우치 위로 코디가 들어오게 이었습니다.",
      },
      mediaMix: {
        label: "Media Mix",
        budget: "2주 · 1,000만 원",
        rationale:
          "맛 상기는 광고비 없이 두고, 유료는 출근 상황과 검색 전환에 뒀습니다.",
        items: [
          {
            channel: "Kakao Bizboard",
            share: "70%",
            role: "기존 접점에 다시 노출",
            notes: ["700만 원 · 웹 방문과 채널 친구에게 재노출"],
          },
          {
            channel: "Naver Powerlink",
            share: "30%",
            role: "검색을 구매로 연결",
            notes: ["300만 원 · 소재 두 개, 각 15%"],
          },
          {
            channel: "Instagram Owned",
            share: "0% 유료",
            role: "팔로워에게 맛을 상기",
            notes: ["유료 0원 · 맛별 코디 릴스"],
          },
        ],
      },
      closing: {
        kind: "points",
        label: "Project Point",
        items: [],
      },
      deck: false,
      cover: {
        src: "/project/variway/mockup.webp",
        alt: "배리웨이 인스타그램 릴스 목업",
        fit: "contain",
      },
      video: "/project/variway/main.mp4",
      videoFormat: "reels",
      links: [
        {
          label: "캠페인 기획안 (PDF)",
          href: "/project/variway/ppt.pdf",
        },
      ],
    },
    {
      slug: "chicment",
      shortTitle: "시크먼트",
      title: "첫 명품 선택의 불안을 취향 탐색 경험으로 바꿨습니다.",
      kind: "team",
      meta: "팀 프로젝트(6인) · Meta 광고 집행 | 담당: 랜딩페이지 기획·디자인·제작 · Meta 광고 세팅 · GA4 연동·분석",
      tools: "GA4 · Meta Ads · Cursor",
      period: "2026.08–09",
      reading: "result-first",
      result: "후기 이동 26.6% → 67.4%",
      featuredStat: {
        lead: "테스트 시작은 줄었습니다.",
        label: "최종 CTA 전환율",
        beforeName: "1차",
        afterName: "2차",
        before: "26.6%",
        after: "67.4%",
      },
      icon: "/project/chicment/icon.png",
      summary:
        "5문항 테스트로 취향 기준을 발견하게 하고, 결과에서 시크먼트 실사용 후기로 연결했습니다.",
      problemLead: "끌리는 제품은 있지만, 왜 나에게 맞는지 설명하기 어렵다.",
      problem:
        "2030 명품 입문층은 상품과 가격은 비교할 수 있지만, 자신에게 맞는 선택 기준이 없었습니다.",
      strategyLead:
        "정보를 더 주는 대신, 자신의 취향 기준을 먼저 발견하게 한다.",
      strategy: "타깃은 첫 명품을 앞둔 2030 여성입니다.",
      strategyFlow: [
        "숏폼 광고",
        "5문항 인터랙티브 테스트",
        "16개 취향 유형 결과",
        "시크먼트 실사용 후기 콘텐츠",
      ],
      strategyPoints: [],
      execution: [],
      channels: [
        {
          name: "랜딩페이지",
          role: "직접 담당 · 2차에 바꾼 것",
          items: [
            "헤드카피 ‘재미로 해보는’ → ‘첫 명품 실패 방지!’",
            "첫 화면에 실시간 ‘N명이 참여했어요’",
            "CTA ‘시크먼트 실제 후기’ → ‘찐 후기 확인하기’",
          ],
        },
        {
          name: "Meta 광고 · GA4",
          role: "직접 담당 · 세팅·분석",
          items: [
            "1차 지출 소재1 86,501원 · 소재2 5,849원\n낮은 소재는 일찍 중단. GA4로 방문 → 시작 → 후기 측정",
            "1차 반응의 약 78%가 25–34세\n2차 타깃을 24–32세 여성으로 좁힘",
          ],
        },
      ],
      mediaMix: {
        label: "Ad Test",
        budget: "총 25만 원 · 1차 10만 원 · 2차 15만 원",
        rationale:
          "숏폼 A는 2차에서 설명조로 무거워져 클릭이 줄었습니다.\n숏폼 B는 실패 불안이라는 약속이 랜딩과 맞아 클릭이 늘었습니다.\n전체 방문은 535명에서 527명으로 거의 같았습니다.",
        items: [
          {
            channel: "숏폼 A",
            share: "CTR 5.77% → 1.95%",
            role: "효율 하락",
            notes: ["CPC 167원 → 403원 · 랜딩 조회 501회 → 14회"],
          },
          {
            channel: "숏폼 B",
            share: "CTR 1.72% → 4.67%",
            role: "효율 상승",
            notes: ["노출 699회 → 11,934회 · 랜딩 조회 7회 → 497회"],
          },
        ],
      },
      closing: {
        kind: "outcome",
        label: "Optimization",
        comparison: {
          beforeLabel: "1차 · 8.20–8.24",
          afterLabel: "2차 · 9.1–9.3",
          unit: "명",
          rows: [
            { label: "방문", before: 535, after: 527 },
            { label: "테스트 시작", before: 94, after: 46 },
            { label: "후기 이동", before: 25, after: 31 },
          ],
        },
        body: "시작한 사람이 후기까지 가는 비율은 26.6%에서 67.4%로 올랐고, 테스트 중간 이탈은 69명에서 15명으로 줄었습니다.\n시작 전 이탈은 82.4%에서 91.3%로 커져, 첫 화면의 진입 장벽은 풀지 못했습니다.",
      },
      cover: {
        src: "/project/chicment/mockup.webp",
        alt: "시크먼트 PICKGAM 인터랙티브 콘텐츠 목업",
        fit: "contain",
      },
      detailHero: false,
      links: [
        {
          label: "PICKGAM 랜딩 — 나의 명품 취향 테스트",
          href: "https://loving44.dothome.co.kr/",
        },
        {
          label: "프로젝트 발표자료 (PDF)",
          href: "/project/chicment/ppt.pdf",
        },
      ],
    },
    {
      slug: "musinsa",
      shortTitle: "무신사",
      title: "어떤 계절도 무신사와 함께, 한 거리의 영상으로 만들었습니다.",
      kind: "personal",
      meta: "개인 프로젝트(공모전) · 예선 탈락 | 담당: 콘셉트 · AI 영상 연출 · 편집",
      tools: "GPT · KlingAI · CapCut",
      period: "2026.06",
      icon: "/project/musinsa/icon.png",
      summary:
        "‘무진장 싸다’를 알리되, 여름 계절감과 주황 톤으로 릴스에 남길 영상을 만들었습니다.",
      strategyLabel: "Concept",
      strategyLead: "여름의 계절감으로, 흐름을 잡았습니다.",
      strategy:
        "초여름의 푸른 잎, 장마의 우산, 한여름의 한낮, 늦여름의 노을 순으로 이어지게 하고, 계절감에 맞게 패션을 바꿨습니다.\n오프닝은 무신사 키비주얼과 같은 톤으로 ‘어떤 계절도, 무신사와 함께.’ 텍스트 애니메이션을 넣었습니다.\n자전거·콘의 찐한 주황으로 그 톤을 거리 컷에 남겼습니다.\n한 거리에서 계절과 패션을 바꾸는 컷은 AI로 만들었습니다.",
      executionLabel: "Film",
      execution: [
        "오프닝 ‘어떤 계절도, 무신사와 함께.’",
        "엔딩 무신사 키비주얼 · ‘무진장’ · 26 Summer Black Friday · ‘역대급 할인 최대 80%’",
      ],
      creative: {
        label: "Production",
        body: "GPT로 시작·끝 프레임을 만들고, Kling에서 3초 영상을 여러 개 생성한 뒤 CapCut에서 잇고 후가공해 한 편으로 완성했습니다.",
      },
      closing: {
        kind: "points",
        label: "Key Takeaway",
        items: [],
        body: "무진장 문구로 열지 않았습니다.\n여름으로 열고, 키비주얼은 마지막에 두었습니다.",
      },
      deck: false,
      links: [
        {
          label: "유튜브 쇼츠",
          href: "https://www.youtube.com/shorts/DldJFvz1tWQ",
        },
      ],
      cover: {
        src: "/project/musinsa/mockup.webp",
        alt: "무신사 무진장 AI 광고 영상 목업",
        fit: "contain",
      },
      video: "/project/musinsa/main.mp4",
      videoFormat: "reels",
    },
  ],
  histories: [
    {
      company: "Sionic AI",
      role: "FrontEnd Developer, Designer",
      period: "2024.10.02 – 2025.02.07",
      href: "https://night-sunday-f95.notion.site/In-Sionic-3a68c8fcce8a81d58004feb295854713",
    },
    {
      company: "웅진씽크빅",
      role: "FrontEnd Developer",
      period: "2025.03.12 – 2025.11.30",
      href: "https://night-sunday-f95.notion.site/In-3a68c8fcce8a813ab4d4da80aca3bdcc",
    },
    {
      company: "SPARTACLUB · 내일배움캠프",
      role: "Student",
      period: "2026.04.20 – 2026.09.14",
      projectsFilter: "team",
    },
  ],
  education: [
    {
      school: "광주소프트웨어마이스터고등학교",
      period: "2022.03 – 2025.02",
      href: "https://night-sunday-f95.notion.site/In-School-3a68c8fcce8a81a48a74c7b99185ed70",
    },
  ],
  certificates: [
    {
      name: "정보처리산업기사",
      date: "2024.03.15",
    },
  ],
};
