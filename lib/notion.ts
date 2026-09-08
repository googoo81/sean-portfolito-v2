import { parsePageId } from "notion-utils";

export function notionPageIdFromUrl(url: string): string | null {
  return parsePageId(url) ?? null;
}

export function isNotionUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return (
      host === "notion.site" ||
      host.endsWith(".notion.site") ||
      host === "www.notion.so" ||
      host === "notion.so"
    );
  } catch {
    return false;
  }
}

export function notionStaticPath(pageId: string) {
  const compact = pageId.replaceAll("-", "");
  return `/notion/${compact}.json`;
}
