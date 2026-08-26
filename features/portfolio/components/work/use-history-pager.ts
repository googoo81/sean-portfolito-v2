"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type Options = {
  persist?: boolean;
};

let persistedSteps = 0;
let skipReset = false;

export function useHistoryPager({ persist = false }: Options = {}) {
  const navDirection = useRef<"back" | "forward" | null>(null);
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
    if (navDirection.current === "back" || navDirection.current === "forward") {
      navDirection.current = null;
      return;
    }

    setForwardSteps((steps) => remember(steps + 1));
  }, [remember]);

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
