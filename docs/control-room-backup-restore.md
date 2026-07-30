# Control Room local backup and restore validation

## Backup design

The protected Control Room provides an owner-authorised full JSON download at `/control-room/backups/download`. The application generates the file directly from the production D1 database only after a valid private session is confirmed. It validates the completed JSON envelope before returning it as a browser attachment.

The backup contains every application-owned Control Room table, including restricted Search Console query rows and personal lead records. It must therefore remain private. The JSON envelope records the database schema version, table inventory, per-table and total row counts, sensitivity, generation time and a SHA-256 payload digest.

Cloudflare D1 Time Travel remains the first recovery option for recent operational mistakes. The downloaded JSON provides a portable owner-controlled copy; it does not make an in-place production restore automatic. No R2 bucket, R2 subscription or scheduled cloud archive is used.

## Download and validate a backup

1. Sign in at `https://dashboard.tanbuidesigns.com`.
2. Open Operations.
3. Select **Download full backup**.
4. Move the downloaded JSON into a private encrypted local backup folder outside the repository.

Validate an explicit local path:

```powershell
npm run validate:control-room-backup -- C:\private-backups\tan-bui-control-room-backup-TIMESTAMP.json
```

The validator fails closed when JSON, format, schema metadata, table ordering, row counts or the payload digest do not match.

Keep at least one recent validated copy. A monthly download is sufficient for the current low-volume dashboard, with an additional download before and after a material database migration.

## Disposable restore validation

Never test a restore against production. Generate SQL only from a validated backup:

```powershell
npm run validate:control-room-backup -- C:\private-backups\tan-bui-control-room-backup-TIMESTAMP.json C:\tmp\tan-bui-control-room-restore.sql
```

Then create disposable local D1 state, apply the source-controlled migrations and import the generated SQL:

```powershell
npx wrangler d1 migrations apply tan-bui-control-room --local
npx wrangler d1 execute tan-bui-control-room --local --file C:\tmp\tan-bui-control-room-restore.sql
npx wrangler d1 execute tan-bui-control-room --local --command "PRAGMA foreign_key_check; SELECT schema_version FROM cr_schema_metadata WHERE schema_key = 'control_room_history_schema';"
```

Confirm that `PRAGMA foreign_key_check` returns no rows, the schema version equals the backup, and representative History, Reports, Leads and Evidence views render against the disposable data. Delete the generated SQL securely after the exercise if it is no longer required.

## Production recovery gate

An in-place D1 Time Travel restore is destructive. Before any production restore:

1. Record the current Time Travel bookmark so the restore can be undone.
2. Confirm the incident cannot be fixed by restoring the previous Worker version alone.
3. Validate the intended local backup and complete the disposable restore exercise above.
4. Stop or disable write paths for the maintenance window.
5. Obtain the owner's explicit approval for the exact production restore point.
6. Restore D1, redeploy the matching application schema if required, and verify public and private routes.
7. Record the recovery as a confirmed change event.

Do not email the backup, place it inside the repository, upload it to a public file-sharing service or leave it unencrypted on a shared computer.
