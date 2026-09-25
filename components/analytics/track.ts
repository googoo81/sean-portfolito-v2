import { sendGAEvent } from "@next/third-parties/google";

const SITE_HOST = "seanportfolio.dothome.co.kr";

function clip(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 100);
}

export function trackPortfolioEvent(
  name: string,
  params: Record<string, string>,
) {
  if (typeof window === "undefined" || window.location.hostname !== SITE_HOST) {
    return;
  }

  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    payload[key] = clip(value);
  }

  sendGAEvent("event", name, payload);
}
