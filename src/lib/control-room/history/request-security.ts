import "server-only";

import { createControlRoomAuth, isAuthorisedControlRoomSession } from "@/lib/control-room/auth/auth";
import { getControlRoomAuthConfiguration } from "@/lib/control-room/auth/configuration";
import { classifyControlRoomHost } from "@/lib/control-room/auth/host-policy";

const MAX_FORM_BYTES = 8_192;

export type WriteAuthorisation = { ok: true } | { ok: false; status: 400 | 401 | 403 | 404 | 413 | 415 };

function expectedOrigin(request: Request): string | null {
  const host = request.headers.get("host");
  const classification = classifyControlRoomHost(process.env.NODE_ENV, host);
  if (classification === "denied" || !host) return null;
  return `${classification === "production" ? "https" : "http"}://${host.toLowerCase()}`;
}

export async function authoriseControlRoomWrite(request: Request): Promise<WriteAuthorisation> {
  const hostClassification = classifyControlRoomHost(process.env.NODE_ENV, request.headers.get("host"));
  if (hostClassification === "denied") return { ok: false, status: 404 };
  const origin = request.headers.get("origin");
  if (!origin || origin !== expectedOrigin(request)) return { ok: false, status: 403 };
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/x-www-form-urlencoded")) return { ok: false, status: 415 };
  const contentLength = Number(request.headers.get("content-length"));
  if (!Number.isFinite(contentLength) || contentLength < 1) return { ok: false, status: 400 };
  if (contentLength > MAX_FORM_BYTES) return { ok: false, status: 413 };
  if (hostClassification === "development") return { ok: true };

  const configuration = getControlRoomAuthConfiguration();
  if (configuration.status !== "ready") return { ok: false, status: 403 };
  try {
    const auth = createControlRoomAuth(configuration);
    const session = await auth.api.getSession({ headers: request.headers });
    return isAuthorisedControlRoomSession(session, configuration.allowedEmail) ? { ok: true } : { ok: false, status: 401 };
  } catch {
    return { ok: false, status: 401 };
  }
}

export function boundedFormValue(form: FormData, name: string, maximum: number): string | null {
  const value = form.get(name);
  if (typeof value !== "string") return null;
  const normalized = value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return normalized && normalized.length <= maximum ? normalized : null;
}

export function isUuid(value: string | null): value is string {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));
}
