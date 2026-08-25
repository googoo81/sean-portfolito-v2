const SOCIAL_ICON_DIR = "/svg/about";

export const SOCIAL_ICONS = {
  github: `${SOCIAL_ICON_DIR}/github.svg`,
  medium: `${SOCIAL_ICON_DIR}/medium.svg`,
  phone: `${SOCIAL_ICON_DIR}/phone.svg`,
  mail: `${SOCIAL_ICON_DIR}/mail.svg`,
} as const;

export type SocialIconId = keyof typeof SOCIAL_ICONS;
