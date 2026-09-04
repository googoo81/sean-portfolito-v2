"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/format";

type ProjectVideoProps = {
  src: string;
  label: string;
  className?: string;
  interactive?: boolean;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ProjectVideo({
  src,
  label,
  className,
  interactive = false,
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const scrubbing = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !interactive) {
      return;
    }

    const onTime = () => {
      if (scrubbing.current) {
        return;
      }
      setCurrent(video.currentTime);
      if (video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };
    const onMeta = () => setDuration(video.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("durationchange", onMeta);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("durationchange", onMeta);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [interactive, src]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
      } catch {
        /* autoplay / user-gesture edge cases */
      }
      return;
    }

    video.pause();
  };

  const seekTo = (ratio: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) {
      return;
    }

    const next = Math.min(1, Math.max(0, ratio));
    video.currentTime = next * video.duration;
    setProgress(next);
    setCurrent(video.currentTime);
  };

  const onScrubPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    scrubbing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    seekTo((event.clientX - rect.left) / rect.width);
  };

  const onScrubPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!scrubbing.current) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    seekTo((event.clientX - rect.left) / rect.width);
  };

  const onScrubPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!scrubbing.current) {
      return;
    }
    scrubbing.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={cn(
        "project-video",
        interactive && "project-video--interactive",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onClick={interactive ? togglePlay : undefined}
      />

      {interactive ? (
        <>
          <div className="project-video__chrome">
            <button
              type="button"
              className="project-video__btn"
              aria-label={playing ? "일시정지" : "재생"}
              onClick={(event) => {
                event.stopPropagation();
                void togglePlay();
              }}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              type="button"
              className="project-video__btn"
              aria-label={muted ? "소리 켜기" : "소리 끄기"}
              onClick={(event) => {
                event.stopPropagation();
                setMuted((value) => !value);
              }}
            >
              {muted ? <MuteIcon /> : <VolumeIcon />}
            </button>
          </div>

          <div className="project-video__timeline">
            <span className="project-video__time" aria-hidden="true">
              {formatTime(current)}
            </span>
            <div
              className="project-video__scrub"
              role="slider"
              aria-label="재생 위치"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(current)}
              tabIndex={0}
              onPointerDown={onScrubPointerDown}
              onPointerMove={onScrubPointerMove}
              onPointerUp={onScrubPointerUp}
              onPointerCancel={onScrubPointerUp}
              onKeyDown={(event) => {
                const video = videoRef.current;
                if (!video || !video.duration) {
                  return;
                }
                const step = event.shiftKey ? 5 : 2;
                if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                  event.preventDefault();
                  video.currentTime = Math.min(
                    video.duration,
                    video.currentTime + step,
                  );
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                  event.preventDefault();
                  video.currentTime = Math.max(0, video.currentTime - step);
                }
              }}
            >
              <div
                className="project-video__scrub-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="project-video__time" aria-hidden="true">
              {formatTime(duration)}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 9.5v5h3.2L12 18.8V5.2L7.2 9.5H4Zm11.1 1.1 1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4-1.4 1.4 1.4 1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4-1.4 1.4-1.4-1.4-1.4Z"
      />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 9.5v5h3.2L12 18.8V5.2L7.2 9.5H4Zm10.2 1.1a2.8 2.8 0 0 1 0 2.8l-1.2-1.2a1.1 1.1 0 0 0 0-.4c0-.14.05-.28.14-.4l1.06-.8Zm2.2-2.3a5.5 5.5 0 0 1 0 7.4l-1.2-1.2a3.8 3.8 0 0 0 0-5l1.2-1.2Z"
      />
    </svg>
  );
}
