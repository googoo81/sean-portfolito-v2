"use no memo";

import { useLayoutEffect } from "react";
import { RoundedBox, useTexture, useVideoTexture } from "@react-three/drei";
import { fitTextureCover } from "./fit-texture";
import type { MockupScreen } from "@/features/portfolio/lib/get-project-mockup";

const PHONE = {
  body: [1.46, 3.02, 0.13] as const,
  radius: 0.18,
  screen: [1.3, 2.82] as const,
  screenZ: 0.068,
};

const MAC = {
  base: [3.9, 0.1, 2.7] as const,
  screen: [3.9, 2.48, 0.07] as const,
  display: [3.58, 2.2] as const,
};

type ScreenPlaneProps = {
  screen: MockupScreen;
  width: number;
  height: number;
  position: [number, number, number];
};

function ImageMaterial({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const texture = useTexture(encodeURI(src));

  useLayoutEffect(() => {
    fitTextureCover(texture, width, height);
  }, [texture, width, height]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function VideoMaterial({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const texture = useVideoTexture(encodeURI(src), {
    unsuspend: "canplay",
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  });

  useLayoutEffect(() => {
    fitTextureCover(texture, width, height);
  }, [texture, width, height]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function ScreenPlane({ screen, width, height, position }: ScreenPlaneProps) {
  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      {screen.kind === "video" ? (
        <VideoMaterial src={screen.src} width={width} height={height} />
      ) : (
        <ImageMaterial src={screen.src} width={width} height={height} />
      )}
    </mesh>
  );
}

export function IPhone({ screen }: { screen: MockupScreen }) {
  return (
    <group>
      <RoundedBox
        args={[...PHONE.body]}
        radius={PHONE.radius}
        smoothness={6}
        creaseAngle={0.4}
      >
        <meshStandardMaterial
          color="#c8ccd1"
          metalness={0.92}
          roughness={0.22}
        />
      </RoundedBox>
      <mesh position={[0, 0, PHONE.screenZ - 0.004]}>
        <planeGeometry args={[PHONE.screen[0] + 0.02, PHONE.screen[1] + 0.02]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      <ScreenPlane
        screen={screen}
        width={PHONE.screen[0]}
        height={PHONE.screen[1]}
        position={[0, 0, PHONE.screenZ]}
      />
      <mesh position={[0, 1.26, PHONE.screenZ + 0.002]}>
        <planeGeometry args={[0.38, 0.1]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[0, -1.28, PHONE.screenZ + 0.002]}>
        <planeGeometry args={[0.36, 0.03]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export function PhonePair({ screens }: { screens: MockupScreen[] }) {
  return (
    <group scale={0.84}>
      <group position={[-0.98, 0.08, -0.42]} rotation={[0.14, 0.58, -0.2]}>
        <IPhone screen={screens[1] ?? screens[0]} />
      </group>
      <group position={[0.72, -0.1, 0.38]} rotation={[0.05, -0.34, 0.1]}>
        <IPhone screen={screens[0]} />
      </group>
    </group>
  );
}

export function Macbook({ screen }: { screen: MockupScreen }) {
  return (
    <group>
      <RoundedBox args={[...MAC.base]} radius={0.04} smoothness={4}>
        <meshStandardMaterial
          color="#c5c5c9"
          metalness={0.9}
          roughness={0.24}
        />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.056, 0.12]}>
        <planeGeometry args={[3.5, 2.15]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.6} metalness={0.2} />
      </mesh>
      <group position={[0, 0.05, -1.32]} rotation={[-1.15, 0, 0]}>
        <RoundedBox
          args={[...MAC.screen]}
          radius={0.04}
          smoothness={4}
          position={[0, 1.24, 0]}
        >
          <meshStandardMaterial
            color="#1a1a1c"
            metalness={0.85}
            roughness={0.28}
          />
        </RoundedBox>
        <mesh position={[0, 1.24, 0.04]}>
          <planeGeometry args={[MAC.display[0] + 0.04, MAC.display[1] + 0.04]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <ScreenPlane
          screen={screen}
          width={MAC.display[0]}
          height={MAC.display[1]}
          position={[0, 1.24, 0.046]}
        />
      </group>
    </group>
  );
}
