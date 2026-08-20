export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "");
}

export function toTelHref(phone: string) {
  return `tel:${phone.replace(/-/g, "")}`;
}
