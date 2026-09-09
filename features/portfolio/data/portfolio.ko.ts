import { getStackItems } from "@/features/portfolio/constants";
import type { Portfolio } from "@/features/portfolio/types";

export const portfolioKo: Portfolio = {
  intro: {
    headline: "기획한 아이디어를\n직접 구현하는 마케터",
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
      title: "월 1,000만 원 미디어믹스로 설계한 재구매 캠페인",
      kind: "team",
      meta: "팀 프로젝트 · 운영 전 기획안 | 담당: 콘텐츠 전략 · 릴스/광고 소재 · 디자인",
      tools: "Figma · CapCut · 생성형 AI",
      period: "2026.07",
      icon: "/project/variway/icon.png",
      problem:
        "단백질 쉐이크 시장(약 5.8조)에서도 경쟁사는 맛·가성비·영양 스펙 나열이 반복되고 있었습니다. 배리웨이는 첫구매 이후 브랜드를 다시 떠올리게 하고 재구매로 이어갈 메시지·매체 구조가 약했고, ‘무엇을 살지’보다 ‘왜 다시 마실지’를 말해 줄 콘텐츠 전략이 필요했습니다.",
      strategy:
        "페르소나 ‘김배리’(23·취준 마케터, 패션·홈트·체형 관리) 기준으로, 스펙 나열 대신 맛의 분위기와 루틴 메시지를 얹으면 브랜드 상기가 쉬워진다는 방향을 잡았습니다. 첫구매→휴식기→재구매 여정에 맞춰 Meta는 재상기, Kakao는 루틴 밀착, Naver SA는 검색·전환을 맡기고, 월 1,000만 원 예산에서 ‘다시 떠올리게 하기’와 ‘다시 사게 하기’를 매체별로 나누는 미디어믹스를 전제로 기획안을 세웠습니다.",
      execution: [
        "플라이밀·잇더핏·꼬박꼬밥·프로티원 등 경쟁 4곳의 USP·가격대를 비교해 ‘맛×라이프스타일’ 빈틈을 정리",
        "맛×패션 콘셉트의 인스타 릴스 1편과 카카오 비즈보드·네이버 파워링크 소재를 제작",
        "미디어믹스 장표화 — 카카오 비즈보드 70%(700만), 네이버 파워링크 30%(각 150만×2), 인스타 릴스 온드(유료 0%)",
        "채널별 가정 KPI를 소재 단계부터 고정 — Meta 저장·공유, Naver CVR·CTR, Kakao CPA·UTM·스크롤 깊이",
      ],
      closing: {
        kind: "points",
        label: "Project Point",
        items: [
          "시장 분석을 통한 재구매 전략 도출",
          "매체별 사용자 의도에 맞는 소재 전략",
          "SA 키워드 구조화",
          "DA 및 Owned 콘텐츠 기획",
          "예산 기반 미디어믹스 설계",
        ],
      },
      cover: {
        src: "/project/variway/mockup.png",
        alt: "배리웨이 인스타그램 릴스 목업",
        fit: "contain",
      },
      video: "/project/variway/main.mov",
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
      title:
        "첫 명품 구매자의 막연한 취향을 선택 기준으로 바꾼 인터랙티브 콘텐츠",
      kind: "team",
      meta: "팀 프로젝트 · 인스타그램 광고 집행 | 담당: 콘텐츠 전략 · 인터랙티브 기획 · 광고·랜딩 개선",
      tools: "GA4 · Meta Ads · Cursor",
      period: "2026.08",
      icon: "/project/chicment/icon.png",
      problem:
        "첫 명품을 고민하는 2030은 브랜드·제품 정보는 쉽게 접하지만, ‘나에게 잘 맞는 선택인지’ 판단할 자기만의 기준은 부족했습니다. 시크먼트에는 실구매자의 착용·실사용 후기가 축적돼 있었지만, 커뮤니티 중심 구조와 방대한 정보량 때문에 신규 사용자에게는 진입 장벽이 있었습니다. 핵심 문제는 “무엇을 좋아하는지는 알지만, 왜 좋아하는지는 설명하기 어렵다”는 간극을 콘텐츠로 어떻게 메울지였습니다.",
      strategy:
        "제품을 일방적으로 추천하기보다, 사용자가 직접 고르며 취향 기준을 발견하는 30초 인터랙티브 테스트 PICKGAM으로 진입점을 만들기로 했습니다. 광고 → 취향 테스트 → 결과 → 시크먼트 실사용 후기로 이어지는 퍼널을 전제로, 테스트의 재미를 시크먼트 탐색으로 자연스럽게 넘기는 메시지 연속성을 전략의 축으로 두었습니다.",
      execution: [
        "5번의 직관적 선택으로 취향 기준을 드러내는 PICKGAM 랜딩을 기획·구현하고 인스타그램 광고와 연결",
        "1차 집행에서 호기심형 숏폼 CTR 5.77%로 유입은 확인했으나, 첫 화면 이탈 80%·최종 CTA 4.7% 병목을 발견",
        "원인을 ‘왜 지금 이 테스트를 해야 하는지’가 첫 화면에 안 읽힌다는 가설로 정리하고, 메시지를 ‘재미있는 취향 테스트’에서 ‘첫 명품 실패를 줄이는 테스트’로 재정의",
        "질문형 카피·문제 상황 강조·‘찐 후기 확인하기’ CTA·톤 다운·실시간 참여자 수 등 신뢰 요소를 반영한 2차 랜딩·소재 개선",
        "2차에서 정보형 CTR 5.77%→1.95%, 호기심형 1.72%→4.67%로 갈라진 결과를 비교해 후킹 강도보다 광고–랜딩 메시지 연결이 클릭을 만든다는 판단을 도출",
      ],
      closing: {
        kind: "outcome",
        body: "테스트 시작 이후 최종 CTA 도달률은 26%→66%, 최종 CTA 클릭률은 4.7%→6.2%로 후반 전환이 개선되었습니다. 초기 진입 장벽은 과제로 남겼지만, 광고에서 제시한 문제 → 랜딩의 참여 이유 → 결과 → CTA를 하나의 메시지로 잇는 편이 전환에 더 중요하다는 점을 확인했습니다. 유입 → 이탈 구간 확인 → 원인 가설 → 콘텐츠 개선 → 재검증으로 데이터를 기획 의사결정의 근거로 사용했습니다.",
      },
      cover: {
        src: "/project/chicment/mockup.png",
        alt: "시크먼트 PICKGAM 인터랙티브 콘텐츠 목업",
        fit: "contain",
      },
      links: [
        {
          label: "PICKGAM 랜딩 — 나의 명품 취향 테스트",
          href: "https://loving44.dothome.co.kr/",
        },
        {
          label: "시크먼트 신규고객 유입 프로젝트",
          href: "/project/chicment/ppt.pdf",
        },
      ],
    },
    {
      slug: "musinsa",
      shortTitle: "무신사",
      title: "무진장 블랙프라이데이 흥행을 위한 AI 광고 영상",
      kind: "personal",
      meta: "개인 프로젝트(공모전) · 예선 탈락 | 담당: 콘셉트 · AI 영상 연출 · 편집",
      tools: "CapCut · KlingAI",
      period: "2026.06",
      icon: "/project/musinsa/icon.png",
      problem:
        "무신사 ‘무진장 성공 기원 AI 영상 광고제’는 무진장 블랙프라이데이를 알리는 5~30초 AI 광고를 요구했습니다. 키비주얼만 붙인 할인 고지는 스크롤에서 멈추기 어렵고, 짧은 장면 안에서도 시즌 무드와 브랜드 톤이 남아야 흥행 메시지와 분위기를 동시에 전달할 수 있다고 봤습니다.",
      strategy:
        "이벤트 홍보 영상을 한 편의 룩처럼 읽히게 만드는 방향을 잡았습니다. 같은 로케이션에서 맑음·우천과 의상만 바꿔 시즌 무드를 이어 가고, 자전거·콘 등 오렌지 포인트로 컷을 연결해 키비주얼·브랜드 컬러(#FE4900)와 맞추기로 했습니다.",
      execution: [
        "공모 요강(키비주얼 1회 이상, 5~30초, AI 제작)에 맞춰 콘셉트와 컷 리스트를 설계",
        "날씨·의상 변화로 연속성을 유지하는 스트리트 장면을 구성하고 반복 소품으로 시각 연결고리를 배치",
        "KlingAI·CapCut으로 생성·편집해 무진장 홍보용 AI 광고 영상 1편을 완성·제출",
      ],
      closing: {
        kind: "points",
        label: "Key Takeaway",
        items: [
          "짧은 광고에서도 시즌 무드와 브랜드 톤을 끊기지 않게 잇는 컷 설계",
          "키비주얼·브랜드 컬러와 정렬된 소품·포인트 컬러 운용",
          "AI 생성·편집 파이프라인으로 콘셉트부터 완성본까지 단독 제작",
          "다음 작업 기준 — 초반에 이벤트·혜택을 각인시킨 뒤 무드 컷으로 이어가는 메시지 레이어 분리",
        ],
      },
      cover: {
        src: "/project/musinsa/mockup.png",
        alt: "무신사 무진장 AI 광고 영상 목업",
        fit: "contain",
      },
      video: "/project/musinsa/main.mov",
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
