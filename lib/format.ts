export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function toTelHref(phone: string) {
  return `tel:${phone.replace(/-/g, "")}`;
}
