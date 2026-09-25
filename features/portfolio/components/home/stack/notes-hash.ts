import { currentHistoryState } from "../overlay-history";

const HASH_ROOT = "stack";
const SESSION_KEY = "__notesOverlay";

let notesPushed = false;

function notesUrl(hash: string) {
  return `${window.location.pathname}${window.location.search}${hash}`;
}

export function parseNotesHash(): string | undefined {
  const raw = window.location.hash.replace(/^#/, "");
  if (raw !== HASH_ROOT && !raw.startsWith(`${HASH_ROOT}/`)) {
    return undefined;
  }

  return raw.slice(HASH_ROOT.length).replace(/^\//, "");
}

export function isNotesHash() {
  return parseNotesHash() !== undefined;
}

export function writeNotesHash(itemId: string) {
  const hash = `#${HASH_ROOT}/${itemId}`;
  if (window.location.hash === hash) {
    return;
  }

  const state = currentHistoryState();
  const url = notesUrl(hash);
  if (isNotesHash()) {
    history.replaceState({ ...state, [SESSION_KEY]: 1 }, "", url);
    return;
  }

  notesPushed = true;
  history.pushState({ ...state, [SESSION_KEY]: 1 }, "", url);
}

export function closeNotesHistory() {
  if (!isNotesHash()) {
    return;
  }

  if (notesPushed) {
    notesPushed = false;
    history.back();
    return;
  }

  clearNotesHash();
}

export function syncNotesSession() {
  notesPushed = Boolean(currentHistoryState()[SESSION_KEY]);
}

export function clearNotesHash() {
  const raw = window.location.hash.replace(/^#/, "");
  if (raw !== HASH_ROOT && !raw.startsWith(`${HASH_ROOT}/`)) {
    return;
  }

  const state = currentHistoryState();
  delete state[SESSION_KEY];
  notesPushed = false;
  history.replaceState(state, "", notesUrl(""));
}
