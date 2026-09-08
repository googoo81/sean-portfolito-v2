import { isNotionUrl, notionPageIdFromUrl, notionStaticPath } from "@/lib/notion";
import type { Portfolio } from "@/features/portfolio/types";

export type NotionTab = {
  pageId: string;
  url: string;
  title: string;
  iconUrl?: string;
};

function compactId(pageId: string) {
  return pageId.replaceAll("-", "");
}

const TAB_TITLES: Record<string, string> = {
  "3a68c8fcce8a81d58004feb295854713": "Sionic AI",
  "3a68c8fcce8a813ab4d4da80aca3bdcc": "웅진씽크빅",
  "3a68c8fcce8a81a48a74c7b99185ed70": "광주소프트웨어마이스터고등학교",
};

function dashedId(pageId: string) {
  const compact = compactId(pageId);
  if (compact.length !== 32) {
    return pageId;
  }
  return `${compact.slice(0, 8)}-${compact.slice(8, 12)}-${compact.slice(12, 16)}-${compact.slice(16, 20)}-${compact.slice(20)}`;
}

export function collectNotionTabs(portfolio: Portfolio): NotionTab[] {
  const tabs: NotionTab[] = [];
  const seen = new Set<string>();

  const push = (url: string | undefined, fallbackTitle: string) => {
    if (!url || !isNotionUrl(url)) {
      return;
    }
    const id = notionPageIdFromUrl(url);
    if (!id) {
      return;
    }
    const pageId = compactId(id);
    if (seen.has(pageId)) {
      return;
    }
    seen.add(pageId);
    tabs.push({
      pageId,
      url,
      title: TAB_TITLES[pageId] ?? fallbackTitle,
    });
  };

  for (const item of portfolio.histories) {
    push(item.href, item.company);
  }
  for (const item of portfolio.education) {
    push(item.href, item.school);
  }

  return tabs;
}

type NotionRecordMap = {
  block?: Record<
    string,
    {
      value?: {
        value?: {
          type?: string;
          properties?: { title?: string[][] };
          format?: { page_icon?: string };
        };
      };
    }
  >;
  signed_urls?: Record<string, string>;
};

export async function loadNotionTabMeta(
  pageId: string,
): Promise<{ title?: string; iconUrl?: string }> {
  const response = await fetch(notionStaticPath(pageId));
  if (!response.ok) {
    return {};
  }

  const map = (await response.json()) as NotionRecordMap;
  const dashed = dashedId(pageId);
  const page =
    map.block?.[dashed]?.value?.value ??
    map.block?.[pageId]?.value?.value ??
    Object.values(map.block ?? {})
      .map((entry) => entry.value?.value)
      .find((value) => value?.type === "page");

  const title = page?.properties?.title?.[0]?.[0]?.trim();
  const iconKey = page?.format?.page_icon;
  const iconUrl =
    iconKey && map.signed_urls?.[iconKey]
      ? map.signed_urls[iconKey]
      : undefined;

  return {
    ...(title ? { title } : {}),
    ...(iconUrl ? { iconUrl } : {}),
  };
}
