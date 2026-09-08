export const NOTION_HASH = "#notion";

const INDEX_KEY = "__historyIdx";
const ROOT_KEY = "__notionRoot";

let highWater = 0;
let overlayRootIdx = 0;

function currentState(): Record<string, unknown> {
  const state = window.history.state;
  return state && typeof state === "object" ? { ...state } : {};
}

function readIndex(state: Record<string, unknown>) {
  return typeof state[INDEX_KEY] === "number" ? state[INDEX_KEY] : 0;
}

export function getNotionHistoryIndex() {
  return readIndex(currentState());
}

export function isNotionHash(hash = window.location.hash) {
  return hash === NOTION_HASH || hash.startsWith(`${NOTION_HASH}/`);
}

export function parseNotionPageId(hash = window.location.hash) {
  if (!hash.startsWith(`${NOTION_HASH}/`)) {
    return undefined;
  }

  return hash.slice(NOTION_HASH.length + 1) || undefined;
}

function stampHistoryIndex() {
  const state = currentState();
  const idx = readIndex(state);
  if (idx > 0) {
    highWater = Math.max(highWater, idx);
    return idx;
  }

  const next = highWater + 1;
  highWater = next;
  history.replaceState({ ...state, [INDEX_KEY]: next }, "");
  return next;
}

export function beginNotionSession() {
  overlayRootIdx = stampHistoryIndex();
}

export function writeNotionHash(pageId: string) {
  const compact = pageId.replaceAll("-", "");
  const next = `${NOTION_HASH}/${compact}`;
  if (window.location.hash === next) {
    return;
  }

  const idx = getNotionHistoryIndex() + 1;
  highWater = idx;
  history.pushState(
    { ...currentState(), [INDEX_KEY]: idx, [ROOT_KEY]: overlayRootIdx },
    "",
    next,
  );
}

export function restoreNotionSession() {
  const state = currentState();
  if (typeof state[ROOT_KEY] === "number") {
    overlayRootIdx = state[ROOT_KEY];
  }

  highWater = Math.max(highWater, getNotionHistoryIndex());
}

export function closeNotionHistory() {
  if (!isNotionHash()) {
    return;
  }

  const delta = getNotionHistoryIndex() - overlayRootIdx;
  if (delta > 0) {
    history.go(-delta);
    return;
  }

  clearNotionHash();
}

export function clearNotionHash() {
  if (!isNotionHash()) {
    return;
  }

  const state = currentState();
  delete state[ROOT_KEY];
  history.replaceState(
    state,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
}

export function canNotionBack() {
  return isNotionHash() && getNotionHistoryIndex() > overlayRootIdx;
}

export function canNotionForward() {
  return getNotionHistoryIndex() < highWater;
}
