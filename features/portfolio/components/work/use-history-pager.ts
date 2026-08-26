"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Options = {
  persist?: boolean;
};

let persistedSteps = 0;
let skipReset = false;

function navigationIndex() {
  const nav = (window as Window & { navigation?: { currentEntry?: { index: number } } })
    .navigation;
  return nav?.currentEntry?.index;
}

export function useHistoryPager({ persist = false }: Options = {}) {
  const navDirection = useRef<"back" | "forward" | null>(null);
  const lastIndex = useRef<number | null>(null);
  const [forwardSteps, setForwardSteps] = useState(() => {
    if (!persist) {
      return 0;
    }

    if (skipReset) {
      skipReset = false;
      return persistedSteps;
    }

    persistedSteps = 0;
    return 0;
  });

  const remember = useCallback(
    (steps: number) => {
      if (persist) {
        persistedSteps = steps;
      }

      return steps;
    },
    [persist],
  );

  const reset = useCallback(() => {
    remember(0);
    setForwardSteps(0);
  }, [remember]);

  const back = useCallback(() => {
    navDirection.current = "back";
    if (persist) {
      skipReset = true;
    }

    setForwardSteps((steps) => remember(steps + 1));
    history.back();
  }, [persist, remember]);

  const forward = useCallback(() => {
    if (forwardSteps === 0) {
      return;
    }

    navDirection.current = "forward";
    if (persist) {
      skipReset = true;
    }

    setForwardSteps((steps) => remember(Math.max(0, steps - 1)));
    history.forward();
  }, [forwardSteps, persist, remember]);

  const syncPopState = useCallback(() => {
    if (persist) {
      skipReset = true;
    }

    if (navDirection.current === "back" || navDirection.current === "forward") {
      navDirection.current = null;
      lastIndex.current = navigationIndex() ?? lastIndex.current;
      return;
    }

    const idx = navigationIndex();
    const prev = lastIndex.current;
    lastIndex.current = idx ?? prev;

    if (idx != null && prev != null && idx > prev) {
      setForwardSteps((steps) => remember(Math.max(0, steps - 1)));
      return;
    }

    setForwardSteps((steps) => remember(steps + 1));
  }, [persist, remember]);

  useEffect(() => {
    lastIndex.current = navigationIndex() ?? lastIndex.current;
    window.addEventListener("popstate", syncPopState);
    return () => window.removeEventListener("popstate", syncPopState);
  }, [syncPopState]);

  return useMemo(
    () => ({
      canForward: forwardSteps > 0,
      back,
      forward,
      reset,
      syncPopState,
    }),
    [back, forward, forwardSteps, reset, syncPopState],
  );
}
