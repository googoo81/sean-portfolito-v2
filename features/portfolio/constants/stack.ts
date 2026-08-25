export const STACK_ICON_DIR = "/images/stack";

/** File names under public/images/stack — keys match portfolio.stack labels (lowercase, no spaces). */
export const STACK_ICONS = {
  figma: `${STACK_ICON_DIR}/figma.svg`,
  notion: `${STACK_ICON_DIR}/notion.svg`,
  slack: `${STACK_ICON_DIR}/slack.svg`,
  capcut: `${STACK_ICON_DIR}/capcut.svg`,
  chatgpt: `${STACK_ICON_DIR}/chatgpt.svg`,
  cursor: `${STACK_ICON_DIR}/cursor.svg`,
} as const;

export type StackIconId = keyof typeof STACK_ICONS;

export function stackIconSlug(label: string): StackIconId | string {
  return label.toLowerCase().replace(/\s+/g, "");
}

export function stackIconSrc(label: string): string {
  const slug = stackIconSlug(label);
  return STACK_ICONS[slug as StackIconId] ?? `${STACK_ICON_DIR}/${slug}.svg`;
}
