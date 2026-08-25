const HASH_ROOT = "stack";

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

export function writeNotesHash(itemId: string) {
  const hash = `#${HASH_ROOT}/${itemId}`;
  if (window.location.hash === hash) {
    return;
  }

  history.replaceState(null, "", notesUrl(hash));
}

export function clearNotesHash() {
  const raw = window.location.hash.replace(/^#/, "");
  if (raw !== HASH_ROOT && !raw.startsWith(`${HASH_ROOT}/`)) {
    return;
  }

  history.replaceState(null, "", notesUrl(""));
}
