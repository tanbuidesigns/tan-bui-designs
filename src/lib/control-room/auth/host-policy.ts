import "server-only";

export const CONTROL_ROOM_PRODUCTION_HOST = "dashboard.tanbuidesigns.com" as const;

const MAX_HOST_HEADER_LENGTH = 300;
const HOSTNAME_PATTERN = /^[a-z0-9.-]+$/;

function validPort(value: string | undefined): boolean {
  if (value === undefined) return true;
  if (!/^\d{1,5}$/.test(value)) return false;
  const port = Number(value);
  return Number.isInteger(port) && port >= 1 && port <= 65_535;
}

export function normalizeRequestHost(value: string | null | undefined): string | null {
  if (!value || value.length > MAX_HOST_HEADER_LENGTH) return null;
  if (/[\s,\/@\\]/.test(value) || value.includes("://")) return null;

  if (value.startsWith("[")) {
    const match = /^\[([0-9a-f:]+)\](?::(\d{1,5}))?$/i.exec(value);
    if (!match || !validPort(match[2]) || !match[1].includes(":")) return null;
    return match[1].toLowerCase();
  }

  const match = /^([^:]+)(?::(\d{1,5}))?$/.exec(value);
  if (!match || !validPort(match[2])) return null;
  const hostname = match[1].toLowerCase();
  if (!hostname || hostname.length > 253 || !HOSTNAME_PATTERN.test(hostname)) return null;
  if (hostname.startsWith(".") || hostname.endsWith(".") || hostname.includes("..")) return null;
  return hostname;
}

export function isDevelopmentHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

export function classifyControlRoomHost(
  nodeEnvironment: string | undefined,
  rawHost: string | null | undefined,
): "development" | "production" | "denied" {
  const hostname = normalizeRequestHost(rawHost);
  if (!hostname) return "denied";
  if (nodeEnvironment === "development") return isDevelopmentHost(hostname) ? "development" : "denied";
  if (nodeEnvironment === "production" && hostname === CONTROL_ROOM_PRODUCTION_HOST) return "production";
  return "denied";
}
