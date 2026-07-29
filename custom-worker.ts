// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore The OpenNext worker is generated before Wrangler bundles this entry point.
import generatedWorker from "./.open-next/worker.js";
import {
  capturePageSpeedWithDependencies,
  captureSearchComparisonWithDependencies,
} from "./src/lib/control-room/history/capture-service";
import { writePortableControlRoomBackup } from "./src/lib/control-room/backups/r2-backup";
import { D1ControlRoomHistoryRepository } from "./src/lib/control-room/history/d1-repository";
import {
  resolveScheduledControlRoomTask,
  scheduledCaptureIdentity,
  type ScheduledControlRoomTask,
} from "./src/lib/control-room/history/scheduled-capture";
import { normalizeWorkerVersionMetadata } from "./src/lib/control-room/history/worker-provenance";

const CONTROL_ROOM_CACHE_CONTROL =
  "private, no-store, max-age=0, must-revalidate";
const CONTROL_ROOM_PRODUCTION_HOST = "dashboard.tanbuidesigns.com";
const PUBLIC_PRODUCTION_HOST = "tanbuidesigns.com";
const PUBLIC_WWW_HOST = "www.tanbuidesigns.com";
const CONTACT_API_PATH = "/api/contact";

const DASHBOARD_ASSET_PATHS = new Set([
  "/apple-icon.png",
  "/favicon.ico",
  "/icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/manifest.webmanifest",
]);

type WorkerEnvironment = CloudflareEnv;
type WorkerExecutionContext = ExecutionContext;

type GeneratedFetch = (
  request: Request,
  environment: WorkerEnvironment,
  context: WorkerExecutionContext,
) => Response | Promise<Response>;

const generatedFetch = generatedWorker.fetch as GeneratedFetch;

function isDashboardHost(request: Request) {
  const host = request.headers.get("host")?.toLowerCase();
  if (!host) return false;
  if (host === CONTROL_ROOM_PRODUCTION_HOST) return true;

  const portPrefix = `${CONTROL_ROOM_PRODUCTION_HOST}:`;
  if (!host.startsWith(portPrefix)) return false;

  const portValue = host.slice(portPrefix.length);
  if (!/^\d{1,5}$/.test(portValue)) return false;
  const port = Number(portValue);
  return Number.isInteger(port) && port >= 1 && port <= 65_535;
}

function canonicalPublicRedirect(requestUrl: URL) {
  const isPublicHost =
    requestUrl.hostname === PUBLIC_PRODUCTION_HOST ||
    requestUrl.hostname === PUBLIC_WWW_HOST;

  if (!isPublicHost) return null;
  if (
    requestUrl.protocol === "https:" &&
    requestUrl.hostname === PUBLIC_PRODUCTION_HOST
  ) {
    return null;
  }

  const destination = new URL(requestUrl);
  destination.protocol = "https:";
  destination.hostname = PUBLIC_PRODUCTION_HOST;
  destination.port = "";

  return new Response(null, {
    status: 308,
    headers: {
      Location: destination.toString(),
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function isPrivateControlRoomPath(pathname: string) {
  return (
    pathname === "/control-room" ||
    pathname.startsWith("/control-room/") ||
    pathname === "/api/auth" ||
    pathname.startsWith("/api/auth/")
  );
}

function isDashboardAssetPath(pathname: string) {
  return (
    pathname.startsWith("/_next/static/") ||
    DASHBOARD_ASSET_PATHS.has(pathname)
  );
}

function withPrivateResponseHeaders(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", CONTROL_ROOM_CACHE_CONTROL);
  headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet",
  );
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function withPublicResponseHeaders(response: Response, requestUrl: URL) {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", "frame-ancestors 'self'");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "SAMEORIGIN");

  if (requestUrl.protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function concealedNotFound() {
  return withPrivateResponseHeaders(new Response(null, { status: 404 }));
}

async function purgeExpiredClosedLeads(
  database: D1Database,
  now: string,
) {
  const maximumBatches = 10;
  const rowsPerBatch = 100;
  let deleted = 0;

  for (let batch = 0; batch < maximumBatches; batch += 1) {
    const result = await database
      .prepare(
        `DELETE FROM cr_leads
        WHERE id IN (
          SELECT id FROM cr_leads
          WHERE status = 'closed' AND retention_delete_after <= ?
          ORDER BY retention_delete_after ASC
          LIMIT ?
        )`,
      )
      .bind(now, rowsPerBatch)
      .run();
    const batchDeleted = result.meta.changes ?? 0;
    deleted += batchDeleted;
    if (batchDeleted < rowsPerBatch) break;
  }

  console.log(
    JSON.stringify({
      event: "lead_retention_completed",
      deleted,
      completedAt: now,
    }),
  );
}

async function runScheduledControlRoomTask(
  task: ScheduledControlRoomTask,
  scheduledTime: number,
  environment: WorkerEnvironment,
) {
  if (task.kind === "lead-retention") {
    await purgeExpiredClosedLeads(
      environment.CONTROL_ROOM_DB,
      new Date(scheduledTime).toISOString(),
    );
    return;
  }

  if (task.kind === "portable-backup") {
    const result = await writePortableControlRoomBackup({
      database: environment.CONTROL_ROOM_DB,
      bucket: environment.CONTROL_ROOM_BACKUPS,
      generatedAt: new Date(scheduledTime).toISOString(),
    });
    console.log(JSON.stringify({
      event: "control_room_portable_backup_completed",
      key: result.key,
      rowCount: result.rowCount,
      schemaVersion: result.schemaVersion,
      size: result.size,
      completedAt: new Date().toISOString(),
    }));
    return;
  }

  const identity = await scheduledCaptureIdentity(task, scheduledTime);
  const dependencies = {
    repository: new D1ControlRoomHistoryRepository(environment.CONTROL_ROOM_DB),
    workerProvenance: normalizeWorkerVersionMetadata(environment.CF_VERSION_METADATA),
  };
  const outcome = task.kind === "search-comparison"
    ? await captureSearchComparisonWithDependencies(dependencies, {
        runId: identity.runId,
        idempotencyKey: identity.idempotencyKey,
        startedAt: identity.startedAt,
        triggerKind: "scheduled",
        periodId: task.periodId,
      })
    : await capturePageSpeedWithDependencies(dependencies, {
        runId: identity.runId,
        idempotencyKey: identity.idempotencyKey,
        startedAt: identity.startedAt,
        triggerKind: "scheduled",
        targetId: task.targetId,
        strategy: task.strategy,
      });

  console.log(JSON.stringify({
    event: "control_room_scheduled_capture_completed",
    task: task.kind,
    runId: outcome.status === "storage-unavailable" ? identity.runId : outcome.runId,
    outcome: outcome.status,
    completedAt: new Date().toISOString(),
  }));
}

function dashboardRootRedirect(requestUrl: URL) {
  return withPrivateResponseHeaders(
    new Response(null, {
      status: 307,
      headers: { Location: `/control-room${requestUrl.search}` },
    }),
  );
}

const controlRoomWorker = {
  async fetch(
    request: Request,
    environment: WorkerEnvironment,
    context: WorkerExecutionContext,
  ) {
    const requestUrl = new URL(request.url);
    const requestUsesDashboardHost = isDashboardHost(request);
    const publicRedirect = canonicalPublicRedirect(requestUrl);

    if (publicRedirect) return publicRedirect;

    if (
      request.method === "POST" &&
      requestUrl.pathname === CONTACT_API_PATH
    ) {
      const rateLimitKey =
        request.headers.get("CF-Connecting-IP") ?? "unidentified-requester";
      const rateLimit = await environment.CONTACT_RATE_LIMITER.limit({
        key: rateLimitKey,
      });
      if (!rateLimit.success) {
        return withPublicResponseHeaders(
          Response.json(
            { success: false },
            {
              status: 429,
              headers: {
                "Cache-Control": "no-store",
                "Retry-After": "60",
              },
            },
          ),
          requestUrl,
        );
      }
    }

    if (requestUsesDashboardHost && requestUrl.pathname === "/") {
      return request.method === "GET" || request.method === "HEAD"
        ? dashboardRootRedirect(requestUrl)
        : concealedNotFound();
    }

    if (
      requestUsesDashboardHost &&
      !isPrivateControlRoomPath(requestUrl.pathname) &&
      !isDashboardAssetPath(requestUrl.pathname)
    ) {
      return concealedNotFound();
    }

    const response = await generatedFetch(request, environment, context);

    if (!isPrivateControlRoomPath(requestUrl.pathname)) {
      return withPublicResponseHeaders(response, requestUrl);
    }

    return withPrivateResponseHeaders(response);
  },
  async scheduled(
    controller: ScheduledController,
    environment: WorkerEnvironment,
    context: WorkerExecutionContext,
  ) {
    const task = resolveScheduledControlRoomTask(controller.cron);
    if (!task) {
      console.warn(JSON.stringify({
        event: "control_room_unknown_cron",
        cron: controller.cron,
        scheduledTime: controller.scheduledTime,
      }));
      controller.noRetry();
      return;
    }

    context.waitUntil(runScheduledControlRoomTask(task, controller.scheduledTime, environment).catch(() => {
      console.error(JSON.stringify({
        event: "control_room_scheduled_task_failed",
        task: task.kind,
        scheduledTime: controller.scheduledTime,
      }));
      throw new Error("The scheduled Control Room task failed.");
    }));
  },
} satisfies ExportedHandler<WorkerEnvironment>;

export default controlRoomWorker;
