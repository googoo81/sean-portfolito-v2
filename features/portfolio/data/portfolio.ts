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
  featuredSlug: "sample-brand-launch",
  skills: [
    "브랜드 분석",
    "브랜드 리서치",
    "이미지 콘텐츠",
    "숏폼 콘텐츠",
    "스토리텔링",
    "카피라이팅",
  ],
  projects: [
    {
      slug: "team-sparta",
      shortTitle: "팀스파르타",
      title: "3개 세그먼트별 메시지를 설계한 팀스파르타 신규 유입 캠페인",
      meta: "팀 프로젝트 | 담당: 브랜드 분석 · 타깃 설정 · 캠페인 전략 및 소재 기획",
      tools: "Notion · Figma",
      period: "2026.05",
      situation:
        "AI·개발 교육 시장의 경쟁이 심화되는 상황에서, 팀스파르타의 강점을 단순히 나열하기보다 대학생·직무 전환 직장인·1인 창업자의 서로 다른 학습 동기와 진입 장벽에 맞춘 신규 유입 전략을 설계하는 것이 목표였습니다.",
      actions: [
        "시장 트렌드와 경쟁 교육 서비스를 분석하고 브랜드의 차별화 요소를 정리",
        "3개 세그먼트별 페르소나와 고객 여정을 설계해 학습 목적·불안 요인·매체 접점을 구분",
        "세그먼트별 핵심 메시지와 광고 소재 방향을 도출하고 발표 자료로 시각화",
        "퍼널 단계별 KPI를 설정해 광고 노출 이후의 행동을 측정할 수 있도록 구성",
      ],
      result:
        "대학생·직무 전환 직장인·1인 창업자별로 메시지와 KPI를 나눈 신규 유입 캠페인 기획안을 완성했습니다. 다만 세그먼트 설정의 일부 근거가 추정에 머물렀고, 페르소나의 취미와 생활 맥락도 실제 매체·카피 선택에 충분히 사용하지 못했습니다. 이후에는 세그먼트별 주장에 정량 데이터를 붙이고, 페르소나 항목마다 어떤 메시지와 매체 결정에 활용됐는지 함께 정리하고 있습니다.",
    },
    {
      slug: "meta-comedy",
      shortTitle: "메타코미디클럽",
      title: "온라인 관심을 공연 예매로 연결한 인스타그램 7장 카드뉴스",
      meta: "팀 프로젝트 | 담당: 브랜드 분석 · 콘텐츠 구조 설계 · 카피 · 디자인",
      tools: "Figma · 생성형 AI",
      period: "2026.06",
      situation:
        "메타코미디클럽의 온라인 콘텐츠를 접한 사용자도 공연 형식과 방문 정보를 한 번에 이해하기 어렵다는 점에 주목했습니다. 초행자가 브랜드를 이해하고 공연을 상상한 뒤 예매까지 검토할 수 있도록 사용자의 정보 탐색 순서에 맞춘 7장 카드뉴스를 기획했습니다.",
      actions: [
        "공식 SNS와 공연 정보를 분석해 브랜드의 유머, 현장성, 출연진이라는 핵심 매력 정리",
        "표지 후킹 → 브랜드 소개 → 채널 소개 → 온라인·오프라인 연결 → 공연 유형 → 첫 방문 안내 → CTA 순서로 7장 스토리라인 설계",
        "실제 코미디언 이미지와 브랜드 컬러를 활용해 공연의 현장감과 시각적 통일성 강화",
        "카드별 헤드라인·본문·CTA를 작성하고 Figma로 최종 콘텐츠 제작",
      ],
      result:
        "표지부터 브랜드 소개, 공연 유형, 첫 방문 안내까지 이어지는 7장 카드뉴스 1종을 제작했습니다. 실제 코미디언 이미지와 그린 포인트 컬러를 활용해 현장감과 시각적 통일성을 높였지만, 마지막 장의 예매 안내가 약해 사용자의 행동을 끝까지 연결하지 못했습니다. 이후에는 CTA를 먼저 정한 뒤 앞선 카드의 정보가 해당 행동으로 자연스럽게 이어지는지 점검하고 있습니다.",
      links: [
        {
          label: "인스타그램 게시물 보기",
          href: "https://www.instagram.com/p/DZeNhpsEfmM/?img_index=1",
        },
      ],
    },
    {
      slug: "bareway",
      shortTitle: "배리웨이",
      title: "제품의 맛을 데일리 스타일링으로 재해석한 재구매 콘텐츠 캠페인",
      meta: "팀 프로젝트 | 담당: 콘텐츠 전략 · 캐러셀/릴스 기획 · 디자인",
      tools: "Figma · CapCut · 생성형 AI",
      period: "2026.07",
      situation:
        "단백질 쉐이크 시장에서 영양성분과 맛을 강조하는 유사한 콘텐츠가 반복되고 있어, 기존 고객에게 배리웨이를 다시 떠올리게 할 새로운 표현 방식이 필요했습니다. 건강·체형 관리와 패션에 관심이 높은 20대 여성 고객을 타깃으로 설정하고, 제품별 맛의 이미지를 데일리 스타일링과 연결한 재구매 콘텐츠를 기획했습니다.",
      actions: [
        "경쟁 브랜드 4곳의 제품 USP와 SNS 콘텐츠 표현 방식을 비교해 차별화 기회 도출",
        "타깃 페르소나와 구매 여정을 바탕으로 브랜드 리마인드 및 재구매 접점 구체화",
        "제품별 맛의 분위기를 패션 아이템과 연결한 인스타그램 캐러셀 콘셉트 설계",
        "계절 변화와 스타일링을 활용해 기존 고객의 브랜드 회상을 유도하는 릴스 기획·제작",
        "인스타그램·카카오·네이버의 채널 역할을 구분하고 총 1,000만 원 규모의 미디어 운영안 제안",
      ],
      result:
        "제품과 패션을 연결한 인스타그램 캐러셀과 릴스 소재를 제작하고, 온드미디어와 유료 매체를 연계한 재구매 캠페인 운영안을 완성했습니다. 제품 특징을 직접 나열하기보다 타깃의 관심사 안에서 제품을 새롭게 해석할 때 브랜드만의 콘텐츠 차별점이 만들어진다는 점을 도출했습니다.",
    },
    {
      slug: "sample-brand-launch",
      shortTitle: "샘플 브랜드 런칭",
      title: "[임시] 신규 브랜드 런칭 인지 캠페인 기획",
      meta: "개인 프로젝트 | 담당: 콘텐츠 기획 · 카피 · 디자인 (placeholder)",
      tools: "Figma · Notion",
      period: "2026.08",
      situation:
        "그리드 레이아웃 확인을 위한 임시 프로젝트입니다. 실제 브랜드 런칭 캠페인 기획안이 들어갈 자리입니다.",
      actions: [
        "타깃과 채널에 맞는 메시지 방향 정리 (placeholder)",
        "SNS용 키 비주얼 및 카피 초안 작성 (placeholder)",
        "콘텐츠 일정 및 채널별 역할 구분 (placeholder)",
      ],
      result:
        "추후 실제 프로젝트 내용으로 교체 예정입니다. 현재는 2×2 Projects 그리드 채움용 placeholder입니다.",
    },
    {
      slug: "sample-shortform",
      shortTitle: "샘플 숏폼",
      title: "[임시] 브랜드 숏폼 콘텐츠 시리즈 기획",
      meta: "개인 프로젝트 | 담당: 스토리보드 · 편집 · 카피 (placeholder)",
      tools: "CapCut · Figma",
      period: "2026.08",
      situation:
        "Projects 칸 빈 슬롯을 채우기 위한 임시 항목입니다. 숏폼 시리즈 기획 및 제작 사례가 들어갈 예정입니다.",
      actions: [
        "3~5편 분량의 숏폼 콘셉트 및 훅 아이디어 도출 (placeholder)",
        "장면별 스토리보드와 자막 카피 작성 (placeholder)",
        "CapCut으로 1편 시안 편집 (placeholder)",
      ],
      result:
        "실제 작업물과 성과 지표로 업데이트할 placeholder 프로젝트입니다. 상세 페이지 구조 확인용으로 사용 중입니다.",
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
