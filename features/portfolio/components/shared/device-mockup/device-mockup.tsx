"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";
import { getProjectMockup } from "@/features/portfolio/lib/get-project-mockup";
import { useLiteMotion } from "@/lib/use-lite-motion";
import { ProjectVisual } from "../project-visual";
import type { Project } from "@/features/portfolio/types";

const DeviceCanvas = dynamic(() => import("./device-canvas"), {
  ssr: false,
});

type DeviceMockupProps = {
  project: Project;
  className?: string;
};

const TILT_X = 10;
const TILT_Y = 14;

function canFollowPointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function DeviceMockup({ project, className }: DeviceMockupProps) {
  const config = getProjectMockup(project);
  const lite = useLiteMotion();
  const faceRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetTilt = () => {
    const face = faceRef.current;
    if (!face) {
      return;
    }

    face.style.setProperty("--tilt-x", "0deg");
    face.style.setProperty("--tilt-y", "0deg");
    face.style.setProperty("--tilt-s", "1");
    face.style.setProperty("--glare-x", "50%");
    face.style.setProperty("--glare-y", "50%");
  };

  const showCanvas = Boolean(config) && mounted && !lite;

  return (
    <div
      className={cn(
        "device-mockup",
        hover && !lite && "is-tilting",
        className,
      )}
      onPointerEnter={(event) => {
        if (lite || !canFollowPointer()) {
          return;
        }

        setHover(true);
        const face = faceRef.current;
        face?.style.setProperty("--tilt-s", "1.035");
        const rect = event.currentTarget.getBoundingClientRect();
        face?.style.setProperty(
          "--glare-x",
          `${((event.clientX - rect.left) / rect.width) * 100}%`,
        );
        face?.style.setProperty(
          "--glare-y",
          `${((event.clientY - rect.top) / rect.height) * 100}%`,
        );
      }}
      onPointerLeave={() => {
        setHover(false);
        pointer.current = { x: 0, y: 0 };
        resetTilt();
      }}
      onPointerMove={(event) => {
        if (lite || !canFollowPointer()) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        pointer.current = { x: px, y: -py };

        const face = faceRef.current;
        if (!face) {
          return;
        }

        face.style.setProperty("--tilt-x", `${(-py * TILT_X).toFixed(2)}deg`);
        face.style.setProperty("--tilt-y", `${(px * TILT_Y).toFixed(2)}deg`);
        face.style.setProperty("--glare-x", `${((px + 1) / 2) * 100}%`);
        face.style.setProperty("--glare-y", `${((py + 1) / 2) * 100}%`);
      }}
    >
      {showCanvas && config ? (
        <DeviceCanvas config={config} pointer={pointer} animate={hover} />
      ) : (
        <div ref={faceRef} className="device-mockup__face">
          <ProjectVisual project={project} />
          <span className="device-mockup__glare" aria-hidden />
        </div>
      )}
    </div>
  );
}
