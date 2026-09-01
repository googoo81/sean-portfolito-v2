import type { Project } from "@/features/portfolio/types";

export type MockupScreen = {
  src: string;
  kind: "image" | "video";
};

export type ProjectMockupConfig = {
  device: "iphone" | "macbook";
  screens: MockupScreen[];
};

function isVideoSrc(src: string) {
  return /\.(mov|mp4|webm)(?:$|\?)/i.test(src);
}

function toScreen(src: string): MockupScreen {
  return {
    src,
    kind: isVideoSrc(src) ? "video" : "image",
  };
}

export function getProjectMockup(
  project: Project,
): ProjectMockupConfig | null {
  const device = project.mockup?.device;
  if (!device) {
    return null;
  }

  if (project.mockup?.images?.length) {
    return {
      device,
      screens: project.mockup.images.map(toScreen),
    };
  }

  if (project.video) {
    return {
      device,
      screens: [toScreen(project.video)],
    };
  }

  const gallery = project.gallery ?? [];
  if (gallery.length > 0) {
    const first = gallery[0];
    const second = gallery[Math.min(6, gallery.length - 1)];
    const screens =
      device === "iphone" && second && second.src !== first.src
        ? [first.src, second.src]
        : [first.src];

    return { device, screens: screens.map(toScreen) };
  }

  if (project.cover) {
    return { device, screens: [toScreen(project.cover.src)] };
  }

  return null;
}
