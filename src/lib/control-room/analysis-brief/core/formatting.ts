const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/g;
const WINDOWS_PATH = /\b[A-Za-z]:\\(?:[^\s<>:"|?*]+\\)*[^\s<>:"|?*]*/g;

export function boundedEvidenceText(value: string, maximum = 2_000): string {
  const safe = value
    .replace(CONTROL_CHARACTERS, " ")
    .replace(WINDOWS_PATH, "[local path removed]")
    .replace(/\b(?:javascript|data):[^\s)]*/gi, "[unsafe link removed]")
    .replace(/[<>]/g, "")
    .trim();
  return safe.length <= maximum ? safe : `${safe.slice(0, maximum - 1).trimEnd()}…`;
}

export function safeLocalPagePath(value: string): string {
  const safe = boundedEvidenceText(value, 500);
  return /^\/(?!\/)[^\\]*$/.test(safe) ? safe : "[invalid local path]";
}

export function markdownText(value: string): string {
  return boundedEvidenceText(value).replace(/[\\`*_{}[\]()#+!|]/g, "\\$&");
}

export function metric(value: number | null | undefined): string {
  return value == null ? "Not available" : new Intl.NumberFormat("en-GB", { maximumFractionDigits: 3 }).format(value);
}

export function byteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}
