"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type DragBase = {
  pointerX: number;
  pointerY: number;
};

export function useFrameDrag<TDrag extends DragBase>(
  onDrag: (drag: TDrag, dx: number, dy: number) => void,
) {
  const dragRef = useRef<TDrag | null>(null);
  const onDragRef = useRef(onDrag);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    onDragRef.current = onDrag;
  }, [onDrag]);

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      onDragRef.current(
        drag,
        event.clientX - drag.pointerX,
        event.clientY - drag.pointerY,
      );
    };

    const onPointerUp = () => {
      dragRef.current = null;
      setDragging(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const beginDrag = (
    event: PointerEvent<HTMLElement>,
    payload: TDrag,
    allowed: boolean,
  ) => {
    if (event.button !== 0 || !allowed) {
      return false;
    }

    dragRef.current = payload;
    setDragging(true);
    return true;
  };

  return { dragging, beginDrag };
}
