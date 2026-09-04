export function blurActiveElement(within?: string) {
  const active = document.activeElement;
  if (!(active instanceof HTMLElement)) {
    return;
  }

  if (within && !active.closest(within)) {
    return;
  }

  active.blur();
}
