"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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

export function DeviceMockup({ project, className }: DeviceMockupProps) {
  const config = getProjectMockup(project);
  const lite = useLiteMotion();
  const pointer = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!config) {
    return <ProjectVisual project={project} className={className} />;
  }

  const showCanvas = mounted && !lite;

  return (
    <div
      className={`device-mockup${className ? ` ${className}` : ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        pointer.current = { x: 0, y: 0 };
      }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
          y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        };
      }}
    >
      {showCanvas ? (
        <DeviceCanvas config={config} pointer={pointer} animate={hover} />
      ) : (
        <ProjectVisual project={project} />
      )}
    </div>
  );
}
