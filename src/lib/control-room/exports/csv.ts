function spreadsheetSafe(value: string): string {
  const normalized = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  return /^[\t\r\n ]*[=+\-@]/.test(normalized) ? `'${normalized}` : normalized;
}

export function csvCell(value: string | number | boolean | null): string {
  const safeValue = spreadsheetSafe(value === null ? "" : String(value));
  return `"${safeValue.replaceAll('"', '""')}"`;
}

export function buildCsv(
  headers: readonly string[],
  rows: readonly (readonly (string | number | boolean | null)[])[],
): string {
  const lines = [headers, ...rows].map((row) => row.map(csvCell).join(","));
  return `\uFEFF${lines.join("\r\n")}\r\n`;
}
