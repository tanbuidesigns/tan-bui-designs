import "server-only";

import { importPKCS8, SignJWT } from "jose";

import type { IntegrationErrorKind } from "@/types/control-room";

import type { ReadySearchConsoleConfiguration } from "./search-console-config";

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
export const SEARCH_CONSOLE_READONLY_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_TIMEOUT_MS = 20_000;
const MAX_TOKEN_RESPONSE_BYTES = 1024 * 1024;

export type AccessTokenResult =
  | { ok: true; accessToken: string }
  | { ok: false; kind: IntegrationErrorKind; message: string; retryable: boolean };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readBoundedTokenResponse(response: Response): Promise<string | null> {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_TOKEN_RESPONSE_BYTES) return null;
  if (!response.body) {
    const text = await response.text();
    return new TextEncoder().encode(text).byteLength <= MAX_TOKEN_RESPONSE_BYTES ? text : null;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_TOKEN_RESPONSE_BYTES) { await reader.cancel(); return null; }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

async function createAssertion(configuration: ReadySearchConsoleConfiguration): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(now) || now < 1_500_000_000) throw new Error("invalid-clock");
  const key = await importPKCS8(configuration.privateKey, "RS256");
  const protectedHeader: { alg: "RS256"; typ: "JWT"; kid?: string } = { alg: "RS256", typ: "JWT" };
  if (configuration.privateKeyId) protectedHeader.kid = configuration.privateKeyId;
  return new SignJWT({ scope: SEARCH_CONSOLE_READONLY_SCOPE })
    .setProtectedHeader(protectedHeader)
    .setIssuer(configuration.serviceAccountEmail)
    .setAudience(TOKEN_ENDPOINT)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);
}

function mapTokenHttpError(status: number): AccessTokenResult {
  if (status === 400) return { ok: false, kind: "authentication", message: "Google rejected the service-account assertion. Review the credential and local clock.", retryable: false };
  if (status === 401) return { ok: false, kind: "authentication", message: "Google could not authenticate the service account.", retryable: false };
  if (status === 403) return { ok: false, kind: "authorization", message: "Google OAuth access or API enablement requires review.", retryable: false };
  if (status === 429) return { ok: false, kind: "quota", message: "Google OAuth quota is temporarily unavailable.", retryable: true };
  if (status >= 500) return { ok: false, kind: "upstream", message: "Google authentication is temporarily unavailable.", retryable: true };
  return { ok: false, kind: "upstream", message: "Google authentication returned an unsuccessful response.", retryable: false };
}

export async function getServiceAccountAccessToken(configuration: ReadySearchConsoleConfiguration): Promise<AccessTokenResult> {
  let assertion: string;
  try {
    assertion = await createAssertion(configuration);
  } catch {
    return { ok: false, kind: "configuration", message: "The service-account credential could not be used to sign a secure assertion.", retryable: false };
  }

  const body = new URLSearchParams();
  body.set("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  body.set("assertion", assertion);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TOKEN_TIMEOUT_MS);
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return mapTokenHttpError(response.status);
    if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return { ok: false, kind: "parsing", message: "Google authentication returned an unexpected response format.", retryable: true };
    }
    const text = await readBoundedTokenResponse(response);
    if (text === null) {
      return { ok: false, kind: "parsing", message: "Google authentication returned more data than can be processed safely.", retryable: false };
    }
    let value: unknown;
    try { value = JSON.parse(text) as unknown; } catch { return { ok: false, kind: "parsing", message: "Google authentication returned invalid JSON.", retryable: true }; }
    if (!isRecord(value) || typeof value.access_token !== "string" || !value.access_token || value.token_type !== "Bearer" || typeof value.expires_in !== "number" || !Number.isFinite(value.expires_in) || value.expires_in <= 0) {
      return { ok: false, kind: "validation", message: "Google authentication returned an incomplete token response.", retryable: false };
    }
    return { ok: true, accessToken: value.access_token };
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") return { ok: false, kind: "timeout", message: "Google authentication did not respond within 20 seconds.", retryable: true };
    return { ok: false, kind: "network", message: "Google authentication could not be reached from the server.", retryable: true };
  } finally {
    clearTimeout(timeout);
  }
}
