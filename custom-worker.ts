// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore The OpenNext worker is generated before Wrangler bundles this entry point.
import generatedWorker from "./.open-next/worker.js";

const CONTROL_ROOM_CACHE_CONTROL =
  "private, no-store, max-age=0, must-revalidate";
const CONTROL_ROOM_PRODUCTION_HOST = "dashboard.tanbuidesigns.com";

const DASHBOARD_ASSET_PATHS = new Set([
  "/apple-icon.png",
  "/favicon.ico",
  "/icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/manifest.webmanifest",
]);

type WorkerEnvironment = Record<string, unknown>;

type WorkerExecutionContext = {
  passThroughOnException(): void;
  waitUntil(promise: Promise<unknown>): void;
};

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

function concealedNotFound() {
  return withPrivateResponseHeaders(new Response(null, { status: 404 }));
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
      return response;
    }

    return withPrivateResponseHeaders(response);
  },
};

export default controlRoomWorker;
