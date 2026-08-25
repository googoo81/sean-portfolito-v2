import type { StackItem } from "@/features/portfolio/types";

const STACK_ICON_DIR = "/images/stack";

export const STACK_ITEMS = [
  {
    id: "figma",
    label: "Figma",
    icon: `${STACK_ICON_DIR}/figma.svg`,
    themed: false,
    note: "인스타그램 캐러셀, 광고 소재, 발표 자료와 콘텐츠 레이아웃을 제작할 수 있습니다.\n정보의 우선순위와 시선의 흐름을 고려하여 화면을 구성합니다.",
  },
  {
    id: "notion",
    label: "Notion",
    icon: `${STACK_ICON_DIR}/notion.svg`,
    themed: true,
    note: "시장조사, 콘텐츠 기획안, 프로젝트 진행 상황과 피드백을 정리하여 팀원들과 공유할 수 있습니다.\n맡은 작업과 수정 사항을 문서화하며 협업합니다.",
  },
  {
    id: "slack",
    label: "Slack",
    icon: `${STACK_ICON_DIR}/slack.svg`,
    themed: false,
    note: "프로젝트 일정과 피드백을 빠르게 주고받으며 팀과 실시간으로 협업할 수 있습니다.\n채널별로 논의를 정리하고 작업 맥락이 끊기지 않게 공유합니다.",
  },
  {
    id: "capcut",
    label: "CapCut",
    icon: `${STACK_ICON_DIR}/capcut.svg`,
    themed: true,
    note: "숏폼 영상과 광고 콘텐츠를 직접 편집할 수 있습니다.\n컷 구성, 자막, 음악, 전환 효과를 활용하여 기획한 콘텐츠를 영상 결과물로 제작합니다.",
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    icon: `${STACK_ICON_DIR}/chatgpt.svg`,
    themed: true,
    note: "아이디어 확장, 카피 초안, 리서치 정리를 빠르게 진행할 수 있습니다.\n기획 방향을 다듬고 여러 시안을 비교하며 콘텐츠를 구체화합니다.",
  },
  {
    id: "cursor",
    label: "Cursor",
    icon: `${STACK_ICON_DIR}/cursor.svg`,
    themed: false,
    note: "기획한 화면과 인터랙션을 직접 코드로 구현할 수 있습니다.\n아이디어가 실제 웹 결과물로 이어지도록 제작 과정까지 연결합니다.",
  },
] as const satisfies readonly StackItem[];
