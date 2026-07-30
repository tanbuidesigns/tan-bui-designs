export function normalizeContactSourcePath(value: unknown): string {
  if (typeof value !== "string") return "/contact";
  const path = value.trim();
  if (!path || path.length > 300 || path.startsWith("//") || path.startsWith("/control-room") || !/^\/[A-Za-z0-9/_-]*$/.test(path)) return "/contact";
  return path;
}
