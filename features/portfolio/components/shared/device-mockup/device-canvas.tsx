"use no memo";

import { Suspense, useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { IPhone, Macbook, PhonePair } from "./devices";
import type { ProjectMockupConfig } from "@/features/portfolio/lib/get-project-mockup";
import type { Group } from "three";

type Pointer = { x: number; y: number };

type DeviceCanvasProps = {
  config: ProjectMockupConfig;
  pointer: MutableRefObject<Pointer>;
  animate: boolean;
};

function Rig({
  rest,
  pointer,
  animate,
  children,
}: {
  rest: [number, number, number];
  pointer: MutableRefObject<Pointer>;
  animate: boolean;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    const targetX = rest[0] + (animate ? pointer.current.y * 0.22 : 0);
    const targetY = rest[1] + (animate ? pointer.current.x * 0.4 : 0);
    const damp = 1 - Math.exp(-delta * 7);

    group.current.rotation.x += (targetX - group.current.rotation.x) * damp;
    group.current.rotation.y += (targetY - group.current.rotation.y) * damp;
    group.current.rotation.z = rest[2];
  });

  return (
    <group ref={group} rotation={rest}>
      {children}
    </group>
  );
}

function BlobShadow({ y, scale }: { y: number; scale: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <circleGeometry args={[scale, 24]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.38} />
    </mesh>
  );
}

function DeviceScene({ config, pointer, animate }: DeviceCanvasProps) {
  const pair = config.device === "iphone" && config.screens.length > 1;
  const rest: [number, number, number] =
    config.device === "macbook"
      ? [0.16, 0.4, 0.03]
      : pair
        ? [0.06, 0.08, 0]
        : [0.1, -0.4, 0.05];

  return (
    <>
      <ambientLight intensity={0.58} />
      <directionalLight position={[3.4, 5.2, 4]} intensity={1.85} />
      <directionalLight position={[-4, 1.2, 2.4]} intensity={0.42} />
      <Rig rest={rest} pointer={pointer} animate={animate}>
        {config.device === "macbook" ? (
          <Macbook screen={config.screens[0]} />
        ) : pair ? (
          <PhonePair screens={config.screens} />
        ) : (
          <IPhone screen={config.screens[0]} />
        )}
      </Rig>
      <BlobShadow
        y={config.device === "macbook" ? -0.12 : -1.64}
        scale={config.device === "macbook" ? 2.4 : pair ? 1.8 : 1.35}
      />
    </>
  );
}

export default function DeviceCanvas({
  config,
  pointer,
  animate,
}: DeviceCanvasProps) {
  const pair = config.device === "iphone" && config.screens.length > 1;
  const hasVideo = config.screens.some((screen) => screen.kind === "video");
  const camera =
    config.device === "macbook"
      ? { position: [0, 1.05, 7.3] as [number, number, number], fov: 28 }
      : pair
        ? { position: [0, 0.08, 6.5] as [number, number, number], fov: 32 }
        : { position: [0, 0.04, 5.5] as [number, number, number], fov: 30 };

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={camera}
      frameloop={hasVideo || animate ? "always" : "demand"}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <DeviceScene config={config} pointer={pointer} animate={animate} />
      </Suspense>
    </Canvas>
  );
}
