import { STACK_ITEMS } from "@/features/portfolio/constants";
import type { Portfolio } from "@/features/portfolio/types";

export const portfolio: Portfolio = {
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
    medium: "https://medium.com/@beautiful-tuna",
  },
  stack: STACK_ITEMS,
  featuredSlug: "bareway",
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
      slug: "bareway",      shortTitle: "배리웨이",
      title: "월 1,000만 원 미디어믹스로 설계한 재구매 캠페인",
      meta: "팀 프로젝트 · 운영 전 기획안 | 담당: 콘텐츠 전략 · 릴스/광고 소재 · 디자인",
      tools: "Figma · CapCut · 생성형 AI",
      period: "2026.07",
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
      slug: "musinsa",
      shortTitle: "무신사",
      title: "무진장 블랙프라이데이 흥행을 위한 AI 광고 영상",
      meta: "개인 프로젝트(공모전) · 예선 탈락 | 담당: 콘셉트 · AI 영상 연출 · 편집",
      tools: "CapCut · KlingAI",
      period: "2026.06",
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
    },
    {
      company: "웅진씽크빅",
      role: "FrontEnd Developer",
      period: "2025.03.12 – 2025.11.30",
    },
    {
      company: "SPARTACLUB · 내일배움캠프",
      role: "Student",
      period: "2026.04.20 – 2026.09.14",
    },
  ],
  education: [
    {
      school: "광주소프트웨어마이스터고등학교",
      period: "2022.03 – 2025.02",
    },
  ],
  certificates: [
    {
      name: "정보처리산업기사",
      date: "2024.03.15",
    },
  ],
};
