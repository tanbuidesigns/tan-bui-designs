export const PORTABLE_BACKUP_TABLES = [
  "cr_schema_metadata",
  "cr_capture_runs",
  "cr_run_warnings",
  "cr_pagespeed_snapshots",
  "cr_pagespeed_diagnostics",
  "cr_search_snapshots",
  "cr_search_daily_rows",
  "cr_search_query_rows",
  "cr_search_page_rows",
  "cr_search_device_rows",
  "cr_change_events",
  "cr_action_evidence",
  "cr_action_workflow",
  "cr_leads",
] as const;

export type PortableBackupTableName = (typeof PORTABLE_BACKUP_TABLES)[number];
export type PortableBackupRow = Record<string, string | number | null>;

export type PortableControlRoomBackup = {
  format: "tan-bui-control-room-portable-backup";
  formatVersion: 1;
  generatedAt: string;
  sensitivity: "restricted-personal-data";
  databaseSchemaVersion: number;
  tables: readonly {
    name: PortableBackupTableName;
    rowCount: number;
    rows: readonly PortableBackupRow[];
  }[];
  totalRowCount: number;
  integrity: { algorithm: "SHA-256"; payloadDigest: string };
};

export interface PortableBackupPreparedStatement {
  bind(...values: unknown[]): PortableBackupPreparedStatement;
  all<T = PortableBackupRow>(): Promise<{ results: T[] }>;
}

export interface PortableBackupDatabase {
  prepare(query: string): PortableBackupPreparedStatement;
}

const MAXIMUM_ROWS_PER_TABLE = 10_000;

function hexadecimal(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256(value: string): Promise<string> {
  return hexadecimal(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

function backupPayload(value: Omit<PortableControlRoomBackup, "integrity">): string {
  return JSON.stringify(value);
}

export async function createPortableControlRoomBackup(
  database: PortableBackupDatabase,
  generatedAt: string,
): Promise<{ backup: PortableControlRoomBackup; text: string; sha256: string }> {
  const tables = [] as Array<PortableControlRoomBackup["tables"][number]>;
  for (const tableName of PORTABLE_BACKUP_TABLES) {
    const result = await database.prepare(`SELECT * FROM ${tableName} ORDER BY rowid ASC LIMIT ?`).bind(MAXIMUM_ROWS_PER_TABLE + 1).all<PortableBackupRow>();
    if (result.results.length > MAXIMUM_ROWS_PER_TABLE) {
      throw new Error(`Backup row limit exceeded for ${tableName}.`);
    }
    tables.push({ name: tableName, rowCount: result.results.length, rows: result.results });
  }

  const schemaMetadata = tables.find((table) => table.name === "cr_schema_metadata")?.rows.find((row) => row.schema_key === "control_room_history_schema");
  const databaseSchemaVersion = schemaMetadata?.schema_version;
  if (typeof databaseSchemaVersion !== "number" || !Number.isInteger(databaseSchemaVersion) || databaseSchemaVersion < 1) {
    throw new Error("The Control Room schema version is unavailable.");
  }

  const payload = {
    format: "tan-bui-control-room-portable-backup" as const,
    formatVersion: 1 as const,
    generatedAt,
    sensitivity: "restricted-personal-data" as const,
    databaseSchemaVersion,
    tables,
    totalRowCount: tables.reduce((total, table) => total + table.rowCount, 0),
  };
  const payloadDigest = await sha256(backupPayload(payload));
  const backup: PortableControlRoomBackup = { ...payload, integrity: { algorithm: "SHA-256", payloadDigest } };
  const text = `${JSON.stringify(backup)}\n`;
  return { backup, text, sha256: await sha256(text) };
}

function isPortableRow(value: unknown): value is PortableBackupRow {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((item) => item === null || typeof item === "string" || typeof item === "number");
}

export async function validatePortableControlRoomBackup(value: string): Promise<PortableControlRoomBackup> {
  let candidate: unknown;
  try {
    candidate = JSON.parse(value);
  } catch {
    throw new Error("Backup JSON is invalid.");
  }
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) throw new Error("Backup envelope is invalid.");
  const backup = candidate as Partial<PortableControlRoomBackup>;
  if (backup.format !== "tan-bui-control-room-portable-backup" || backup.formatVersion !== 1 || backup.sensitivity !== "restricted-personal-data") throw new Error("Backup format is unsupported.");
  if (typeof backup.generatedAt !== "string" || Number.isNaN(Date.parse(backup.generatedAt))) throw new Error("Backup generation time is invalid.");
  if (!Number.isInteger(backup.databaseSchemaVersion) || (backup.databaseSchemaVersion ?? 0) < 1) throw new Error("Backup schema version is invalid.");
  if (!Array.isArray(backup.tables) || backup.tables.length !== PORTABLE_BACKUP_TABLES.length) throw new Error("Backup table inventory is incomplete.");
  for (const [index, expectedName] of PORTABLE_BACKUP_TABLES.entries()) {
    const table = backup.tables[index];
    if (table?.name !== expectedName || !Array.isArray(table.rows) || table.rowCount !== table.rows.length || !table.rows.every(isPortableRow)) throw new Error(`Backup table is invalid: ${expectedName}.`);
  }
  const totalRowCount = backup.tables.reduce((total, table) => total + table.rowCount, 0);
  if (backup.totalRowCount !== totalRowCount) throw new Error("Backup row counts do not reconcile.");
  if (backup.integrity?.algorithm !== "SHA-256" || !/^[0-9a-f]{64}$/.test(backup.integrity.payloadDigest)) throw new Error("Backup integrity metadata is invalid.");
  const completeBackup = backup as PortableControlRoomBackup;
  const payload = {
    format: completeBackup.format,
    formatVersion: completeBackup.formatVersion,
    generatedAt: completeBackup.generatedAt,
    sensitivity: completeBackup.sensitivity,
    databaseSchemaVersion: completeBackup.databaseSchemaVersion,
    tables: completeBackup.tables,
    totalRowCount: completeBackup.totalRowCount,
  };
  if (await sha256(backupPayload(payload)) !== backup.integrity.payloadDigest) throw new Error("Backup integrity check failed.");
  return backup as PortableControlRoomBackup;
}

function sqlLiteral(value: string | number | null): string {
  if (value === null) return "NULL";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Backup contains a non-finite number.");
    return String(value);
  }
  return `'${value.replaceAll("'", "''")}'`;
}

export function portableBackupRestoreSql(backup: PortableControlRoomBackup): string {
  const reverseTables = [...PORTABLE_BACKUP_TABLES].reverse();
  const statements = ["PRAGMA foreign_keys = OFF;", "BEGIN TRANSACTION;"];
  for (const table of reverseTables) statements.push(`DELETE FROM ${table};`);
  for (const tableName of PORTABLE_BACKUP_TABLES) {
    const table = backup.tables.find((item) => item.name === tableName);
    if (!table) throw new Error(`Backup table missing: ${tableName}.`);
    for (const row of table.rows) {
      const columns = Object.keys(row);
      if (!columns.length) throw new Error(`Backup row has no columns: ${tableName}.`);
      statements.push(`INSERT INTO ${tableName} (${columns.map((column) => `"${column.replaceAll('"', '""')}"`).join(", ")}) VALUES (${columns.map((column) => sqlLiteral(row[column])).join(", ")});`);
    }
  }
  statements.push("COMMIT;", "PRAGMA foreign_keys = ON;", "PRAGMA foreign_key_check;", "");
  return statements.join("\n");
}
