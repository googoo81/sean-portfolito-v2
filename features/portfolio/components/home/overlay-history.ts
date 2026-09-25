const INDEX_KEY = "__historyIdx";

export function currentHistoryState(): Record<string, unknown> {
  const state = window.history.state;
  return state && typeof state === "object" ? { ...state } : {};
}

function readIndex(state: Record<string, unknown>) {
  return typeof state[INDEX_KEY] === "number" ? state[INDEX_KEY] : 0;
}

export function createOverlayHistory(
  rootKey: string,
  matches: (hash?: string) => boolean,
) {
  let highWater = 0;
  let overlayRootIdx = 0;

  function historyIndex() {
    return readIndex(currentHistoryState());
  }

  function stampHistoryIndex() {
    const state = currentHistoryState();
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

  function begin() {
    overlayRootIdx = stampHistoryIndex();
  }

  function write(hash: string) {
    if (window.location.hash === hash) {
      return;
    }

    const idx = historyIndex() + 1;
    highWater = idx;
    history.pushState(
      { ...currentHistoryState(), [INDEX_KEY]: idx, [rootKey]: overlayRootIdx },
      "",
      hash,
    );
  }

  function restore() {
    const state = currentHistoryState();
    if (typeof state[rootKey] === "number") {
      overlayRootIdx = state[rootKey];
    }

    highWater = Math.max(highWater, historyIndex());
  }

  function clear() {
    if (!matches()) {
      return;
    }

    const state = currentHistoryState();
    delete state[rootKey];
    history.replaceState(
      state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }

  function close() {
    if (!matches()) {
      return;
    }

    const delta = historyIndex() - overlayRootIdx;
    if (delta > 0) {
      history.go(-delta);
      return;
    }

    clear();
  }

  function canBack() {
    return matches() && historyIndex() > overlayRootIdx;
  }

  function canForward() {
    return historyIndex() < highWater;
  }

  return { begin, write, restore, close, clear, canBack, canForward };
}
