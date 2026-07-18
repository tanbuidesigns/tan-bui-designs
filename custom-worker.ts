// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore The OpenNext worker is generated before Wrangler bundles this entry point.
import generatedWorker from "./.open-next/worker.js";

const CONTROL_ROOM_CACHE_CONTROL =
  "private, no-store, max-age=0, must-revalidate";

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

function isPrivateControlRoomRequest(request: Request) {
  const pathname = new URL(request.url).pathname;

  return (
    pathname === "/control-room" ||
    pathname.startsWith("/control-room/") ||
    pathname === "/api/auth" ||
    pathname.startsWith("/api/auth/")
  );
}

const controlRoomWorker = {
  async fetch(
    request: Request,
    environment: WorkerEnvironment,
    context: WorkerExecutionContext,
  ) {
    const response = await generatedFetch(request, environment, context);

    if (!isPrivateControlRoomRequest(request)) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.set("Cache-Control", CONTROL_ROOM_CACHE_CONTROL);
    headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default controlRoomWorker;
