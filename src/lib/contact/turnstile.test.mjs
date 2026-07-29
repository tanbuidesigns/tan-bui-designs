import assert from "node:assert/strict";
import test from "node:test";

import {
  MAXIMUM_TURNSTILE_TOKEN_LENGTH,
  isValidTurnstileResult,
  verifyContactTurnstile,
} from "./turnstile.ts";
import {
  CONTACT_TURNSTILE_ACTION,
  CONTACT_TURNSTILE_HOSTNAME,
} from "./turnstile-config.ts";

test("accepts only a successful result for the contact action and production host", () => {
  assert.equal(
    isValidTurnstileResult({
      success: true,
      action: CONTACT_TURNSTILE_ACTION,
      hostname: CONTACT_TURNSTILE_HOSTNAME,
    }),
    true,
  );
  assert.equal(
    isValidTurnstileResult({
      success: true,
      action: "another-action",
      hostname: CONTACT_TURNSTILE_HOSTNAME,
    }),
    false,
  );
  assert.equal(
    isValidTurnstileResult({
      success: true,
      action: CONTACT_TURNSTILE_ACTION,
      hostname: "localhost",
    }),
    false,
  );
});

test("posts the token to siteverify without retaining the requester address", async () => {
  let requestBody = "";
  const verified = await verifyContactTurnstile({
    token: "verified-token",
    secret: "server-secret",
    remoteIp: "192.0.2.8",
    fetcher: async (_input, init) => {
      requestBody = String(init?.body ?? "");
      return Response.json({
        success: true,
        action: CONTACT_TURNSTILE_ACTION,
        hostname: CONTACT_TURNSTILE_HOSTNAME,
      });
    },
  });

  assert.equal(verified, true);
  const body = new URLSearchParams(requestBody);
  assert.equal(body.get("response"), "verified-token");
  assert.equal(body.get("remoteip"), "192.0.2.8");
});

test("fails closed for missing configuration, oversized tokens and provider errors", async () => {
  const oversizedToken = "x".repeat(MAXIMUM_TURNSTILE_TOKEN_LENGTH + 1);
  const unexpectedFetch = async () => {
    throw new Error("fetch should not run");
  };

  assert.equal(
    await verifyContactTurnstile({
      token: "token",
      secret: undefined,
      remoteIp: null,
      fetcher: unexpectedFetch,
    }),
    false,
  );
  assert.equal(
    await verifyContactTurnstile({
      token: oversizedToken,
      secret: "secret",
      remoteIp: null,
      fetcher: unexpectedFetch,
    }),
    false,
  );
  assert.equal(
    await verifyContactTurnstile({
      token: "token",
      secret: "secret",
      remoteIp: null,
      fetcher: async () => new Response(null, { status: 503 }),
    }),
    false,
  );
});
