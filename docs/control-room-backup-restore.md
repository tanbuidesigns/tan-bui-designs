# Control Room backup and restore validation

## Backup design

The production Worker writes a private portable Control Room backup every Sunday at 07:13 UTC to the `tan-bui-control-room-backups` R2 bucket. The bucket has no public domain or public route. Each run writes a dated immutable-style archive key and refreshes `control-room/v1/latest.json`.

The backup contains every application-owned Control Room table, including restricted Search Console query rows and personal lead records. It must therefore remain private. The JSON envelope records the database schema version, table inventory, per-table and total row counts, sensitivity, generation time and a SHA-256 payload digest. R2 also verifies the SHA-256 checksum of the complete uploaded object. The Worker reads the archived object back and validates the envelope before reporting success.

Cloudflare D1 Time Travel remains the first recovery option for recent operational mistakes. The R2 files provide longer-lived, portable evidence; they do not make an in-place production restore automatic.

## Download and validate an archive

Use an explicit path outside the repository for the downloaded restricted file. Do not commit it.

```powershell
npx wrangler r2 object get tan-bui-control-room-backups/control-room/v1/latest.json --file C:\tmp\tan-bui-control-room-latest.json
npm run validate:control-room-backup -- C:\tmp\tan-bui-control-room-latest.json
```

The validator fails closed when JSON, format, schema metadata, table ordering, row counts or the payload digest do not match.

## Disposable restore validation

Never test a restore against production. Generate SQL only from a validated archive:

```powershell
npm run validate:control-room-backup -- C:\tmp\tan-bui-control-room-latest.json C:\tmp\tan-bui-control-room-restore.sql
```

Then create a disposable local D1 state, apply the source-controlled migrations and import the generated SQL:

```powershell
npx wrangler d1 migrations apply tan-bui-control-room --local
npx wrangler d1 execute tan-bui-control-room --local --file C:\tmp\tan-bui-control-room-restore.sql
npx wrangler d1 execute tan-bui-control-room --local --command "PRAGMA foreign_key_check; SELECT schema_version FROM cr_schema_metadata WHERE schema_key = 'control_room_history_schema';"
```

Confirm that `PRAGMA foreign_key_check` returns no rows, the schema version equals the archive, and representative History, Reports, Leads and Evidence views render against the disposable data. Delete the downloaded JSON and generated SQL securely after the exercise if they are no longer required.

## Production recovery gate

An in-place D1 Time Travel restore is destructive. Before any production restore:

1. Record the current Time Travel bookmark so the restore can be undone.
2. Confirm the incident cannot be fixed by restoring the previous Worker version alone.
3. Validate the intended R2 archive and complete the disposable restore exercise above.
4. Stop or disable write paths for the maintenance window.
5. Obtain the owner's explicit approval for the exact production restore point.
6. Restore D1, redeploy the matching application schema if required, and verify public and private routes.
7. Record the recovery as a confirmed change event.

Do not expose the R2 bucket, add a public custom domain, send archive files by email or place downloaded backups inside the repository.
