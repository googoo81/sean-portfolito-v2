"use client";

import { useCallback, useEffect, useRef } from "react";

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay = 300,
) {
  const callbackRef = useRef(callback);
  const timerRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return useCallback(
    (...args: Args) => {
      if (lockedRef.current) {
        return;
      }

      lockedRef.current = true;
      callbackRef.current(...args);
      timerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
      }, delay);
    },
    [delay],
  );
}
