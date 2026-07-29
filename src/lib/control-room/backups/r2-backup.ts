import { createPortableControlRoomBackup, validatePortableControlRoomBackup, type PortableBackupDatabase } from "./portable-backup";

export async function writePortableControlRoomBackup(input: {
  database: PortableBackupDatabase;
  bucket: R2Bucket;
  generatedAt: string;
}): Promise<{ key: string; rowCount: number; schemaVersion: number; size: number }> {
  const created = await createPortableControlRoomBackup(input.database, input.generatedAt);
  const date = new Date(input.generatedAt);
  const key = `control-room/v1/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}/${String(date.getUTCDate()).padStart(2, "0")}/backup-${input.generatedAt.replaceAll(":", "-")}.json`;
  const options: R2PutOptions = {
    httpMetadata: { contentType: "application/json; charset=utf-8" },
    customMetadata: {
      format: created.backup.format,
      formatVersion: String(created.backup.formatVersion),
      schemaVersion: String(created.backup.databaseSchemaVersion),
      sensitivity: created.backup.sensitivity,
      generatedAt: created.backup.generatedAt,
      rowCount: String(created.backup.totalRowCount),
    },
    sha256: created.sha256,
  };

  const archived = await input.bucket.put(key, created.text, options);
  if (!archived) throw new Error("The archive backup write was rejected.");
  const latest = await input.bucket.put("control-room/v1/latest.json", created.text, options);
  if (!latest) throw new Error("The latest backup pointer write was rejected.");

  const verificationObject = await input.bucket.get(key);
  if (!verificationObject) throw new Error("The archive backup could not be read for verification.");
  const verified = await validatePortableControlRoomBackup(await verificationObject.text());
  if (verified.integrity.payloadDigest !== created.backup.integrity.payloadDigest) throw new Error("The archived backup digest does not match the generated backup.");

  return {
    key,
    rowCount: verified.totalRowCount,
    schemaVersion: verified.databaseSchemaVersion,
    size: archived.size,
  };
}
