/**
 * Fetches public Notion pages into public/notion/*.json for static export.
 * Run: yarn notion:fetch
 */
import { NotionAPI } from "notion-client";
import { parsePageId } from "notion-utils";
import fs from "node:fs";
import path from "node:path";

const PAGES = [
  "https://night-sunday-f95.notion.site/In-Sionic-3a68c8fcce8a81d58004feb295854713",
  "https://night-sunday-f95.notion.site/In-3a68c8fcce8a813ab4d4da80aca3bdcc",
  "https://night-sunday-f95.notion.site/In-School-3a68c8fcce8a81a48a74c7b99185ed70",
];

function pageIdFromUrl(url) {
  const pathname = new URL(url).pathname;
  return parsePageId(pathname);
}

async function main() {
  const outDir = path.join(process.cwd(), "public", "notion");
  fs.mkdirSync(outDir, { recursive: true });

  const api = new NotionAPI();

  for (const url of PAGES) {
    const pageId = pageIdFromUrl(url);
    if (!pageId) {
      console.error("Could not parse page id:", url);
      process.exitCode = 1;
      continue;
    }

    const compact = pageId.replaceAll("-", "");
    console.log(`Fetching ${pageId}...`);
    const recordMap = await api.getPage(pageId);
    const file = path.join(outDir, `${compact}.json`);
    fs.writeFileSync(file, JSON.stringify(recordMap));
    console.log(`Wrote ${path.relative(process.cwd(), file)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
