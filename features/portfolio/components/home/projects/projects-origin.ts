export type ProjectsOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function readProjectsOrigin(node: HTMLElement | null): ProjectsOrigin | null {
  const bounds = node?.getBoundingClientRect();
  if (!bounds) {
    return null;
  }

  return {
    x: bounds.left,
    y: bounds.top,
    width: bounds.width,
    height: bounds.height,
  };
}

export function fallbackProjectsOrigin(): ProjectsOrigin {
  return {
    x: window.innerWidth / 2 - 80,
    y: window.innerHeight / 2 - 80,
    width: 160,
    height: 160,
  };
}

export function restoreProjectsOrigin(kind: "featured" | "cell"): ProjectsOrigin {
  const node = document.querySelector<HTMLElement>(
    `[data-projects-origin="${kind}"]`,
  );
  return readProjectsOrigin(node) ?? fallbackProjectsOrigin();
}
