"use client";

import { useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/format";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { ProjectImage } from "@/features/portfolio/types";

type InstagramCarouselProps = {
  images: readonly ProjectImage[];
  className?: string;
};

export function InstagramCarousel({
  images,
  className,
}: InstagramCarouselProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const dragRef = useRef<{ id: number; x: number } | null>(null);
  const total = images.length;

  if (total === 0) {
    return null;
  }

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(total - 1, next)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dragRef.current = { id: event.pointerId, x: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.id !== event.pointerId) {
      return;
    }

    const delta = event.clientX - drag.x;
    if (Math.abs(delta) < 40) {
      return;
    }

    go(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <div
      className={cn("project-carousel", className)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragRef.current = null;
      }}
    >
      <div
        className="project-carousel__track"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transitionDuration: reducedMotion ? "0ms" : "280ms",
        }}
      >
        {images.map((image) => (
          <figure key={image.src} className="project-carousel__slide">
            <img src={encodeURI(image.src)} alt={image.alt} draggable={false} />
          </figure>
        ))}
      </div>

      {index > 0 ? (
        <button
          type="button"
          className="project-carousel__btn project-carousel__btn--prev"
          aria-label="이전 카드"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => go(index - 1)}
        />
      ) : null}
      {index < total - 1 ? (
        <button
          type="button"
          className="project-carousel__btn project-carousel__btn--next"
          aria-label="다음 카드"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => go(index + 1)}
        />
      ) : null}

      <div className="project-carousel__dots" aria-hidden>
        {images.map((image, dot) => (
          <span
            key={image.src}
            className={cn(
              "project-carousel__dot",
              dot === index && "is-active",
            )}
          />
        ))}
      </div>
    </div>
  );
}
