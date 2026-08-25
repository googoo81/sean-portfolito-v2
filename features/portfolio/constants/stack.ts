import type { StackItem } from "@/features/portfolio/types";

const STACK_ICON_DIR = "/images/stack";

export const STACK_ITEMS = [
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
] as const satisfies readonly StackItem[];
