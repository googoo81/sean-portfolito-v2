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
      title: "맛을 콘텐츠로 기억시키고, 매체별 접점에서 재구매를 설계했습니다.",
      kind: "team",
      meta: "팀 프로젝트 · 운영 전 기획안 | 담당: 시장 분석 · 채널 전략 · 콘텐츠 제작 · 미디어믹스",
      tools: "Figma · CapCut · 생성형 AI",
      period: "2026.07",
      icon: "/project/variway/icon.png",
      summary:
        "시장 분석부터 매체별 콘텐츠와 미디어믹스까지 혼자 구조화한 전략 기획 프로젝트입니다. 단백질 쉐이크의 재구매 접점을 채널 역할에 맞게 나누고, 맛과 일상 루틴을 콘텐츠로 옮겼습니다.",
      problemLabel: "Market Analysis",
      problemLead:
        "비슷한 ‘고단백’ 메시지 속에서, 다시 찾게 될 이유를 설계해야 했습니다.",
      problem:
        "단백질 쉐이크 시장은 경쟁 브랜드와 메시지가 겹쳐 차별화가 어렵고, Variway 역시 제품 USP와 재구매 이유가 뚜렷하지 않았습니다. 플라이밀·프로티원 등 경쟁사 조사를 통해 스펙·가성비 나열이 반복되는 패턴을 확인했고, 단순 ‘고단백’보다 맛·일상 루틴·재구매 상황을 축으로 콘텐츠를 설계하는 방향을 도출했습니다. 분석 → 발견한 패턴 → 전략으로 이어지는 판단이 이 프로젝트의 출발점이었습니다.",
      strategyLabel: "Strategy",
      strategyLead:
        "단백질 쉐이크가 필요한 상황별로 메시지를 나누고, 매체 역할에 맞게 콘텐츠 전략을 분리했습니다.",
      strategy:
        "이후 실행은 이 상황 축이 각 매체로 흘러가도록 설계했습니다. 검색에서는 전환, DA에서는 재인지, Owned에서는 맛과 무드를 경험시키는 역할로 이어집니다.",
      strategyPoints: [
        "출근 및 오피스 간식 상황",
        "체형 관리 및 식단 루틴",
        "가공된 단백질 맛에 대한 거부감",
        "맛있어서 다시 찾게 되는 경험 경험",
      ],
      executionLabel: "Channel Strategy",
      execution: [],
      channels: [
        {
          name: "Naver SA",
          role: "구매 의도가 높은 검색 사용자를 전환으로 연결",
          items: [
            "검색 의도 기반 키워드 분석",
            "브랜드 키워드와 카테고리 키워드 구분",
            "‘오피스 간식’, ‘출근길 단백질’ 등 상황형 검색어 고려",
            "전환에 가까운 수요를 받아내는 접점으로 설계",
          ],
        },
        {
          name: "Kakao Bizboard / DA",
          role: "직접 검색하지 않은 사용자에게 제품을 다시 인지",
          items: [
            "맛과 일상 상황을 짧고 직관적인 메시지로 전달",
            "웹 방문 및 리타겟팅 중심 역할",
            "검색 전 단계의 상기·재방문을 담당",
          ],
        },
        {
          name: "Instagram Owned",
          role: "브랜드 무드와 제품 사용 상황을 콘텐츠로 경험",
          items: [
            "Reel / Story 중심 구성",
            "저장·공유와 자사몰 유입을 염두에 둔 콘텐츠",
            "광고비 없이 브랜드 경험을 쌓는 온드 접점",
          ],
        },
      ],
      creative: {
        label: "Reel Creative",
        lead: "브랜드 무드를 혼자 분석해 콘셉트로 옮기고, 실제 릴스까지 제작했습니다.",
        body: "Carousel보다 Reel을 우선해, 맛×패션 무드가 짧은 영상 안에서도 읽히도록 설계했습니다. 상단 목업·영상이 그 결과물입니다.",
        flow: [
          "무드 분석",
          "핵심 메시지 정의",
          "영상 컨셉",
          "장면 구성",
          "최종 릴스 제작",
        ],
      },
      mediaMix: {
        label: "Media Mix",
        budget: "총 예산 1,000만 원 · 2주 기준",
        rationale:
          "검색으로 살 준비가 된 수요와, 아직 검색하지 않은 재인지 수요를 나눠 담았습니다. 유료는 전환·리타겟에 두고, 무드와 경험은 Owned로 운영해 예산 효율과 브랜드 경험을 동시에 가져가려 했습니다.",
        items: [
          {
            channel: "Kakao Bizboard",
            share: "70%",
            role: "웹 방문 및 리타겟팅",
            notes: [
              "아직 검색하지 않은 사용자에게 맛을 다시 상기",
              "유료 예산의 중심을 재방문·전환 직전 접점에 배치",
            ],
          },
          {
            channel: "Naver Powerlink",
            share: "30%",
            role: "브랜드·카테고리 검색 수요 확보",
            notes: [
              "구매 의도가 드러난 검색을 전환으로 연결",
              "상황형·카테고리 키워드로 유입 질을 설계",
            ],
          },
          {
            channel: "Instagram Owned",
            share: "0% 유료",
            role: "별도 광고비 없이 콘텐츠 운영",
            notes: [
              "릴스·스토리로 맛과 루틴 무드를 경험",
              "저장·공유와 자사몰 유입을 목표로 운영",
            ],
          },
        ],
      },
      closing: {
        kind: "points",
        label: "Project Point",
        items: [
          "경쟁 시장 분석을 통해 브랜드 메시지 방향 도출",
          "검색 의도에 따라 SA 키워드 구조화",
          "DA / Owned 매체별 콘텐츠 역할 정의",
          "브랜드 무드 분석 후 Reel 콘텐츠 직접 제작",
          "총 1,000만 원 규모 미디어믹스 설계",
        ],
        body: "시장 분석 → 전략 → 채널 → 콘텐츠 → 미디어믹스를 하나의 흐름으로 설계했습니다. 이 프로젝트에서 보여주고 싶은 것은 단일 성과 수치가 아니라, 재구매 접점을 혼자 구조화할 수 있는 전략 기획 역량입니다.",
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
      title: "첫 명품 선택의 불안을 취향 탐색 경험으로 바꿨습니다.",
      kind: "team",
      meta: "팀 프로젝트 · 인스타그램 광고 집행 | 담당: 콘텐츠 전략 · 경험 설계 · 광고·랜딩 개선",
      tools: "GA4 · Meta Ads · Cursor",
      period: "2026.08",
      icon: "/project/chicment/icon.png",
      summary:
        "첫 명품 구매를 고려하는 2030 여성은 브랜드와 가격 정보는 충분히 접하지만, 자신에게 맞는 선택 기준을 찾기 어려웠습니다. 단순 정보 제공 대신 취향을 직접 발견하는 인터랙티브 콘텐츠로 풀고, 결과에서 시크먼트의 실사용 후기로 연결했습니다.",
      problemLead:
        "끌리는 제품은 있지만, 왜 나에게 맞는지 설명하기 어렵다.",
      problem:
        "2030 명품 입문층은 후기와 정보를 여러 채널에서 탐색하지만, 정보가 파편화되어 있고 광고성 콘텐츠도 많아 선택 확신을 얻기 어렵습니다. 문제는 정보가 부족해서가 아니라, 자신에게 맞는 선택 기준이 없다는 점이었습니다.",
      strategyLead:
        "정보를 더 주는 대신, 자신의 취향 기준을 먼저 발견하게 한다.",
      strategy:
        "타깃은 첫 명품 구매를 고려하는 2030 여성입니다. 호기심으로 테스트에 들어오게 하고, 취향 발견 경험을 준 뒤, 결과 페이지에서 실제 후기를 확인하고 싶게 만드는 콘텐츠 전환을 설계했습니다.",
      strategyFlow: [
        "숏폼 광고",
        "5문항 인터랙티브 테스트",
        "16개 취향 유형 결과",
        "시크먼트 실사용 후기 콘텐츠",
      ],
      strategyPoints: [
        "호기심을 통해 테스트 진입",
        "취향 발견 경험 제공",
        "결과 페이지에서 실제 후기 확인 욕구로 연결",
      ],
      execution: [
        "명품 입문 소비자의 구매 고민을 조사해 ‘선택 기준 부족’을 핵심 문제로 정의",
        "5개 질문 · 16개 결과 유형의 인터랙티브 테스트(PICKGAM) 기획",
        "광고 → 테스트 → 결과 → 후기로 이어지는 랜딩 경험 기획·제작",
        "Meta 광고용 숏폼 소재 기획으로 테스트 진입 유도",
        "1차 성과를 분석하고 테스트 시작 전 이탈이 가장 큰 병목임을 확인",
        "첫 화면 카피·CTA·타깃 조건을 고쳐 2차 개선 실행",
      ],
      closing: {
        kind: "outcome",
        label: "Optimization",
        before: {
          title: "Before · 1차",
          metrics: [
            { label: "방문", value: "547" },
            { label: "테스트 시작", value: "121" },
            { label: "테스트 시작 전 이탈", value: "약 79%" },
            { label: "시작자 기준 CTA 도달률", value: "31.4%" },
          ],
          insight:
            "광고 클릭 자체보다, 랜딩 첫 화면에서 ‘왜 지금 이 테스트를 해야 하는지’가 충분히 전달되지 않은 것이 주요 병목이었습니다.",
        },
        after: {
          title: "After · 2차 개선",
          items: [
            "첫 명품 실패 방지 메시지 강화",
            "참여 이유가 보이는 서브카피 추가",
            "실시간 참여자 수 등 사회적 증거 추가",
            "CTA 카피 개선",
            "타깃 조건 재설정",
          ],
        },
        body: "광고 CTR만 보는 것이 아니라, 유입 이후 행동 데이터로 병목을 찾아 메시지·CTA·타깃을 다시 설계했습니다. 이 프로젝트의 핵심은 최종 수치 하나가 아니라, 성과를 읽고 개선까지 실행한 과정입니다.",
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
