export type ProjectsOriginKind = "featured" | "cell";

export type ProjectsOrigin = {
  x: number;
  y: number;
  width: number;
  height: number;
  kind?: ProjectsOriginKind;
};

export function readProjectsOrigin(node: HTMLElement | null): ProjectsOrigin | null {
  const target = node?.closest<HTMLElement>(".bento-card") ?? node;
  const bounds = target?.getBoundingClientRect();
  if (!bounds || !target) {
    return null;
  }

  const attr =
    target.getAttribute("data-projects-origin") ??
    target.querySelector("[data-projects-origin]")?.getAttribute("data-projects-origin");
  const kind: ProjectsOriginKind | undefined =
    attr === "featured" || attr === "cell" ? attr : undefined;

  return {
    x: bounds.left,
    y: bounds.top,
    width: bounds.width,
    height: bounds.height,
    kind,
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
