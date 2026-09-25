import { createOverlayHistory } from "../overlay-history";

export const NOTION_HASH = "#notion";

export function isNotionHash(hash = window.location.hash) {
  return hash === NOTION_HASH || hash.startsWith(`${NOTION_HASH}/`);
}

export function parseNotionPageId(hash = window.location.hash) {
  if (!hash.startsWith(`${NOTION_HASH}/`)) {
    return undefined;
  }

  return hash.slice(NOTION_HASH.length + 1) || undefined;
}

const history = createOverlayHistory("__notionRoot", isNotionHash);

export const beginNotionSession = history.begin;
export const restoreNotionSession = history.restore;
export const closeNotionHistory = history.close;
export const clearNotionHash = history.clear;
export const canNotionBack = history.canBack;
export const canNotionForward = history.canForward;

export function writeNotionHash(pageId: string) {
  const compact = pageId.replaceAll("-", "");
  history.write(`${NOTION_HASH}/${compact}`);
}
