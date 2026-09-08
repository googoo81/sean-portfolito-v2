import type { StackItem } from "@/features/portfolio/types";
import type { Locale } from "@/lib/locale";

const STACK_ICON_DIR = "/svg/stack";

type StackBase = Omit<StackItem, "note">;

const STACK_BASE = [
  {
    id: "figma",
    label: "Figma",
    icon: `${STACK_ICON_DIR}/figma.svg`,
    themed: false,
  },
  {
    id: "notion",
    label: "Notion",
    icon: `${STACK_ICON_DIR}/notion.svg`,
    themed: true,
  },
  {
    id: "slack",
    label: "Slack",
    icon: `${STACK_ICON_DIR}/slack.svg`,
    themed: false,
  },
  {
    id: "capcut",
    label: "CapCut",
    icon: `${STACK_ICON_DIR}/capcut.svg`,
    themed: true,
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    icon: `${STACK_ICON_DIR}/chatgpt.svg`,
    themed: true,
  },
  {
    id: "cursor",
    label: "Cursor",
    icon: `${STACK_ICON_DIR}/cursor.svg`,
    themed: false,
  },
] as const satisfies readonly StackBase[];

const STACK_NOTES: Record<Locale, Record<(typeof STACK_BASE)[number]["id"], string>> = {
  ko: {
    figma:
      "인스타그램 캐러셀, 광고 소재, 발표 자료와 콘텐츠 레이아웃을 제작할 수 있습니다.\n정보의 우선순위와 시선의 흐름을 고려하여 화면을 구성합니다.",
    notion:
      "시장조사, 콘텐츠 기획안, 프로젝트 진행 상황과 피드백을 정리하여 팀원들과 공유할 수 있습니다.\n맡은 작업과 수정 사항을 문서화하며 협업합니다.",
    slack:
      "프로젝트 일정과 피드백을 빠르게 주고받으며 팀과 실시간으로 협업할 수 있습니다.\n채널별로 논의를 정리하고 작업 맥락이 끊기지 않게 공유합니다.",
    capcut:
      "숏폼 영상과 광고 콘텐츠를 직접 편집할 수 있습니다.\n컷 구성, 자막, 음악, 전환 효과를 활용하여 기획한 콘텐츠를 영상 결과물로 제작합니다.",
    chatgpt:
      "아이디어 확장, 카피 초안, 리서치 정리를 빠르게 진행할 수 있습니다.\n기획 방향을 다듬고 여러 시안을 비교하며 콘텐츠를 구체화합니다.",
    cursor:
      "기획한 화면과 인터랙션을 직접 코드로 구현할 수 있습니다.\n아이디어가 실제 웹 결과물로 이어지도록 제작 과정까지 연결합니다.",
  },
  en: {
    figma:
      "I design Instagram carousels, ad creatives, decks, and content layouts.\nScreens are structured around information priority and visual flow.",
    notion:
      "I organize market research, content briefs, progress, and feedback for the team.\nTasks and revisions stay documented so collaboration stays clear.",
    slack:
      "I collaborate in real time on schedules and feedback with the team.\nDiscussions stay organized by channel so context never drops.",
    capcut:
      "I edit short-form video and ad content directly.\nCuts, captions, music, and transitions turn planned concepts into finished videos.",
    chatgpt:
      "I move faster on ideation, copy drafts, and research synthesis.\nDirections get refined by comparing options until the content is concrete.",
    cursor:
      "I implement planned screens and interactions in code.\nIdeas connect all the way through to a working web result.",
  },
};

export function getStackItems(locale: Locale): readonly StackItem[] {
  const notes = STACK_NOTES[locale];
  return STACK_BASE.map((item) => ({
    ...item,
    note: notes[item.id],
  }));
}

/** @deprecated Prefer getStackItems(locale). Kept for transitional imports. */
export const STACK_ITEMS = getStackItems("ko");
