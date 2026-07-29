import {
  CONTACT_TURNSTILE_ACTION,
  CONTACT_TURNSTILE_HOSTNAME,
} from "./turnstile-config.ts";

export const MAXIMUM_TURNSTILE_TOKEN_LENGTH = 2_048;

type TurnstileSiteverifyResponse = {
  success?: unknown;
  hostname?: unknown;
  action?: unknown;
};

export type TurnstileVerificationInput = {
  token: string;
  secret: string | undefined;
  remoteIp: string | null;
  fetcher?: typeof fetch;
};

export function isValidTurnstileResult(
  result: TurnstileSiteverifyResponse,
): boolean {
  return (
    result.success === true &&
    result.hostname === CONTACT_TURNSTILE_HOSTNAME &&
    result.action === CONTACT_TURNSTILE_ACTION
  );
}

export async function verifyContactTurnstile({
  token,
  secret,
  remoteIp,
  fetcher = fetch,
}: TurnstileVerificationInput): Promise<boolean> {
  if (
    !secret?.trim() ||
    !token ||
    token.length > MAXIMUM_TURNSTILE_TOKEN_LENGTH
  ) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!response.ok) return false;

    const result = (await response.json()) as TurnstileSiteverifyResponse;
    return isValidTurnstileResult(result);
  } catch {
    return false;
  }
}
