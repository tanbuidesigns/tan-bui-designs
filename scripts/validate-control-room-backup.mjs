import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { portableBackupRestoreSql, validatePortableControlRoomBackup } from "../src/lib/control-room/backups/portable-backup.ts";

const backupPath = process.argv[2];
const sqlOutputPath = process.argv[3];

if (!backupPath) {
  throw new Error("Usage: npm run validate:control-room-backup -- <backup.json> [restore.sql]");
}

const inputPath = resolve(backupPath);
const backup = await validatePortableControlRoomBackup(await readFile(inputPath, "utf8"));

if (sqlOutputPath) {
  const outputPath = resolve(sqlOutputPath);
  await writeFile(outputPath, portableBackupRestoreSql(backup), "utf8");
  console.log(`Validated backup and wrote disposable restore SQL: ${outputPath}`);
} else {
  console.log(`Validated backup: schema ${backup.databaseSchemaVersion}, ${backup.totalRowCount} rows, generated ${backup.generatedAt}.`);
}
