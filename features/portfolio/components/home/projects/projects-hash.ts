export const PROJECTS_HASH = "#projects";

const INDEX_KEY = "__historyIdx";
const ROOT_KEY = "__projectsRoot";

let highWater = 0;
let overlayRootIdx = 0;

function currentState(): Record<string, unknown> {
  const state = window.history.state;
  return state && typeof state === "object" ? { ...state } : {};
}

function readIndex(state: Record<string, unknown>) {
  return typeof state[INDEX_KEY] === "number" ? state[INDEX_KEY] : 0;
}

export function getHistoryIndex() {
  return readIndex(currentState());
}

export function getHistoryHighWater() {
  return highWater;
}

export function isProjectsHash(hash = window.location.hash) {
  return hash === PROJECTS_HASH || hash.startsWith(`${PROJECTS_HASH}/`);
}

export function parseProjectsSlug(hash = window.location.hash) {
  if (!hash.startsWith(`${PROJECTS_HASH}/`)) {
    return undefined;
  }

  return decodeURIComponent(hash.slice(PROJECTS_HASH.length + 1));
}

export function stampHistoryIndex() {
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

export function beginProjectsSession() {
  overlayRootIdx = stampHistoryIndex();
}

export function writeProjectsListHash() {
  if (window.location.hash === PROJECTS_HASH) {
    return;
  }

  const idx = getHistoryIndex() + 1;
  highWater = idx;
  history.pushState(
    { ...currentState(), [INDEX_KEY]: idx, [ROOT_KEY]: overlayRootIdx },
    "",
    PROJECTS_HASH,
  );
}

export function writeProjectsDetailHash(slug: string) {
  const next = `${PROJECTS_HASH}/${encodeURIComponent(slug)}`;
  if (window.location.hash === next) {
    return;
  }

  const idx = getHistoryIndex() + 1;
  highWater = idx;
  history.pushState(
    { ...currentState(), [INDEX_KEY]: idx, [ROOT_KEY]: overlayRootIdx },
    "",
    next,
  );
}

export function restoreProjectsSession() {
  const state = currentState();
  if (typeof state[ROOT_KEY] === "number") {
    overlayRootIdx = state[ROOT_KEY];
  }

  highWater = Math.max(highWater, getHistoryIndex());
}

export function closeProjectsHistory() {
  if (!isProjectsHash()) {
    return;
  }

  const delta = getHistoryIndex() - overlayRootIdx;
  if (delta > 0) {
    history.go(-delta);
    return;
  }

  clearProjectsHash();
}

export function clearProjectsHash() {
  if (!isProjectsHash()) {
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

export function canProjectsBack() {
  return isProjectsHash() && getHistoryIndex() > overlayRootIdx;
}

export function canProjectsForward() {
  return getHistoryIndex() < highWater;
}
