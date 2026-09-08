const SOCIAL_ICON_DIR = "/svg/about";
const SOCIAL_ACTION_DIR = "/svg/actions";

export const SOCIAL_ICONS = {
  github: `${SOCIAL_ICON_DIR}/github.svg`,
  linkedin: `${SOCIAL_ICON_DIR}/linkedin.svg`,
  phone: `${SOCIAL_ICON_DIR}/phone.svg`,
  mail: `${SOCIAL_ICON_DIR}/mail.svg`,
} as const;

export const SOCIAL_ACTION_ICONS = {
  copy: `${SOCIAL_ACTION_DIR}/copy.svg`,
  open: `${SOCIAL_ACTION_DIR}/open.svg`,
} as const;

export type SocialIconId = keyof typeof SOCIAL_ICONS;
