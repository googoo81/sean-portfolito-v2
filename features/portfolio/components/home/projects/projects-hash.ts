export const PROJECTS_HASH = "#projects";

export function isProjectsHash(hash = window.location.hash) {
  return hash === PROJECTS_HASH || hash.startsWith(`${PROJECTS_HASH}/`);
}

export function parseProjectsSlug(hash = window.location.hash) {
  if (!hash.startsWith(`${PROJECTS_HASH}/`)) {
    return undefined;
  }

  return decodeURIComponent(hash.slice(PROJECTS_HASH.length + 1));
}

export function writeProjectsListHash() {
  if (window.location.hash !== PROJECTS_HASH) {
    history.pushState(null, "", PROJECTS_HASH);
  }
}

export function writeProjectsDetailHash(slug: string) {
  const next = `${PROJECTS_HASH}/${encodeURIComponent(slug)}`;
  if (window.location.hash !== next) {
    history.pushState(null, "", next);
  }
}

export function clearProjectsHash() {
  if (isProjectsHash()) {
    history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }
}
