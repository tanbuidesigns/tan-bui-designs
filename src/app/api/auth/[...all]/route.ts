import { toNextJsHandler } from "better-auth/next-js";

import { classifyControlRoomHost } from "@/lib/control-room/auth/host-policy";
import { createControlRoomAuth } from "@/lib/control-room/auth/auth";
import { getControlRoomAuthConfiguration } from "@/lib/control-room/auth/configuration";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function concealedNotFound() {
  return withPrivateResponseHeaders(new Response(null, { status: 404 }));
}

function unavailable() {
  return withPrivateResponseHeaders(new Response(null, { status: 503 }));
}

function sanitiseProxyHeaders(request: Request) {
  const headers = new Headers(request.headers);
  headers.delete("forwarded");
  headers.delete("x-forwarded-host");
  headers.delete("x-forwarded-proto");
  return new Request(request, { headers });
}

async function handleAuthRequest(request: Request) {
  const hostClassification = classifyControlRoomHost(
    process.env.NODE_ENV,
    request.headers.get("host"),
  );
  if (hostClassification === "denied") return concealedNotFound();

  const configuration = getControlRoomAuthConfiguration();
  if (configuration.status !== "ready") return unavailable();

  try {
    const auth = createControlRoomAuth(configuration);
    const handlers = toNextJsHandler(auth);
    const handler = request.method === "GET" ? handlers.GET : handlers.POST;
    const response = await handler(sanitiseProxyHeaders(request));
    return withPrivateResponseHeaders(response);
  } catch {
    return unavailable();
  }
}

export async function GET(request: Request) {
  return handleAuthRequest(request);
}

export async function POST(request: Request) {
  return handleAuthRequest(request);
}
