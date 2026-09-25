import { createOverlayHistory } from "../overlay-history";

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

const history = createOverlayHistory("__projectsRoot", isProjectsHash);

export const beginProjectsSession = history.begin;
export const restoreProjectsSession = history.restore;
export const closeProjectsHistory = history.close;
export const clearProjectsHash = history.clear;
export const canProjectsBack = history.canBack;
export const canProjectsForward = history.canForward;

export function writeProjectsListHash() {
  history.write(PROJECTS_HASH);
}

export function writeProjectsDetailHash(slug: string) {
  history.write(`${PROJECTS_HASH}/${encodeURIComponent(slug)}`);
}
