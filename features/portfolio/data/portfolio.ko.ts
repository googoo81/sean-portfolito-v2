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
      situation:
        "단백질 쉐이크 시장(약 5.8조)에서도 경쟁사는 맛·가성비·영양 스펙 나열이 반복되고, 배리웨이는 재구매 유도 전략이 약하다는 문제의식이 있었습니다. 페르소나 ‘김배리’(23·취준 마케터, 패션·홈트·체형 관리)에게는 스펙보다 맛의 분위기와 루틴 메시지를 얹는 편이 브랜드를 다시 떠올리게 한다는 가설을 세웠습니다. 운영 전 기획안으로서 Meta·Kakao DA·Naver SA 소재와 가정 KPI, 월 1,000만 원 미디어믹스를 함께 설계하는 것이 과제였습니다.",
      actions: [
        "플라이밀·잇더핏·꼬박꼬밥·프로티원 등 경쟁 4곳의 USP·가격대를 비교해 ‘맛×라이프스타일’ 빈틈을 찾음",
        "첫구매→휴식기→재구매 고민 여정에 맞춰 Meta(재상기)·Kakao(루틴 밀착)·Naver SA(검색·전환) 역할을 분리",
        "맛×패션 콘셉트의 인스타 릴스 1편을 제작하고, 카카오 비즈보드·네이버 파워링크 소재를 제작",
        "미디어믹스: 카카오 비즈보드 70%(700만)·네이버 파워링크 30%(각 150만×2)·인스타 릴스 온드(유료 0%)로 월 1,000만 원 안을 장표화",
        "가정 KPI 고정 — Meta 저장률 0.03~0.05%·공유률 0.3~0.5%, Naver CVR 12%+·CTR 1.5%, Kakao CPA 감소·UTM 유입·스크롤 깊이",
      ],
      result:
        "릴스 1편·카카오 비즈보드·네이버 광고 소재와, 채널 역할·예산·가정 KPI가 적힌 재구매 캠페인 기획안을 완성했습니다. 유료 예산의 70%를 카카오 리타겟에 두고 인스타는 온드 리마인드로 쓰는 구조로, ‘다시 떠올리게 하기’와 ‘다시 사게 하기’를 매체별로 나눴습니다. 회고: 운영 전이라 실측은 없지만, 기존 구매 CVR(약 11.5%)을 넘는 12%를 Naver 메인 KPI로 둔 것처럼, 소재 단계부터 성공 기준을 숫자로 고정해 둔 점이 기획안의 설득 포인트입니다.",
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
      situation:
        "첫 명품을 고민하는 2030은 브랜드·제품 정보는 쉽게 접하지만, ‘나에게 잘 맞는 선택인지’ 판단할 자기만의 기준은 부족했습니다. 시크먼트에는 실구매자의 착용·실사용 후기가 축적돼 있었지만, 커뮤니티 중심 구조와 방대한 정보량 때문에 신규 2030에게는 진입 장벽이 있었습니다. 핵심 인사이트는 “무엇을 좋아하는지는 알지만, 왜 좋아하는지는 설명하기 어렵다”였고, 시크먼트의 신뢰도 높은 실사용 정보를 첫 명품 구매자가 부담 없이 경험할 콘텐츠로 어떻게 연결할지 정의하는 것이 과제였습니다.",
      actions: [
        "광고 → 취향 테스트 → 결과 → 시크먼트 후기로 이어지는 퍼널로, 5번의 직관적 선택으로 취향 기준을 발견하는 30초 인터랙티브 테스트 PICKGAM을 기획·구현하고 인스타그램 광고 랜딩으로 연결",
        "1차: 호기심형 숏폼 CTR 5.77%로 유입력은 확인했으나 첫 화면 이탈 80%·최종 CTA 4.7% 병목을 발견 — ‘왜 지금 이 테스트를 해야 하는지’가 첫 화면에서 읽히지 않는다는 가설을 세움",
        "메시지를 ‘재미있는 취향 테스트’에서 ‘첫 명품 실패를 줄이는 테스트’로 재정의하고, 질문형 카피·문제 상황 강조·‘찐 후기 확인하기’ CTA·톤 다운·실시간 참여자 수 등 신뢰 요소를 함께 개선",
        "2차: 정보형 소재 CTR 5.77%→1.95% 하락, 호기심형 1.72%→4.67% 개선 — 후킹 강도보다 광고와 랜딩이 같은 문제를 말할 때 클릭이 난다는 판단을 도출",
      ],
      result:
        "초기 테스트 진입이라는 과제는 남았지만, 테스트를 시작한 사용자 중 최종 CTA 도달률은 26%→66%, 최종 CTA 클릭률은 4.7%→6.2%로 후반 전환 구조를 개선했습니다. 회고: 자극적인 후킹으로 CTR만 높이기보다, 광고에서 제시한 문제 → 랜딩의 참여 이유 → 결과 → CTA까지 하나의 메시지로 잇는 것이 전환에 더 중요했습니다. 유입 → 이탈 구간 확인 → 원인 가설 → 콘텐츠 개선 → 재검증으로 데이터를 기획 의사결정의 근거로 썼습니다.",
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
      situation:
        "무신사 ‘무진장 성공 기원 AI 영상 광고제’는 무진장 블랙프라이데이의 흥행을 알리는 5~30초 AI 광고를 만드는 과제였습니다. 키비주얼만 붙인 할인 고지가 아니라, 짧은 장면 안에서도 시즌 무드와 브랜드 톤이 남아야 스크롤에서 멈춘다는 가설을 세웠습니다. 맑음·우천을 오가는 스트리트 컷과 자전거·콘 같은 반복 소품으로, 이벤트 홍보 영상을 한 편의 룩처럼 읽히게 만드는 것이 목표였습니다.",
      actions: [
        "공모 요강(키비주얼 1회 이상 사용, 5~30초, AI 제작)에 맞춰 콘셉트와 컷 리스트를 설계",
        "같은 로케이션에서 날씨·의상만 바꿔 시즌 무드가 이어지도록 장면 구성",
        "오렌지 포인트(자전거·콘)로 컷 사이 시각 연결고리를 만들고 키비주얼·브랜드 컬러(#FE4900)와 맞춤",
        "KlingAI·CapCut으로 생성·편집해 무진장 홍보용 AI 광고 영상으로 완성·제출",
      ],
      result:
        "무진장 블랙프라이데이를 알리는 AI 광고 영상 1편을 제작·제출했으나 예선에서 탈락했습니다. 할인 고지보다 착용·거리 장면을 앞세워 분위기는 잡았지만, ‘무진장’ 이벤트명과 혜택이 첫 몇 초 안에 읽히지 않아 공모 목적(흥행 기원 광고)과의 정합이 약했을 가능성이 큽니다. 회고: 무드와 홍보 메시지는 레이어를 나눠야 합니다. 다음엔 초반에 이벤트·혜택을 빠르게 각인시킨 뒤 무드 컷으로 이어지게 구성을 뒤집으려 합니다.",
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