import "server-only";

import { betterAuth } from "better-auth";
import { google, verifyGoogleIdToken } from "better-auth/social-providers";

import type { ReadyControlRoomAuthConfiguration } from "./configuration";

export const CONTROL_ROOM_SESSION_SECONDS = 8 * 60 * 60;
export const CONTROL_ROOM_SESSION_VERSION = "task6-google-v1";
export const CONTROL_ROOM_GOOGLE_SCOPES = [
  "openid",
  "email",
  "profile",
] as const;

function exactEmailMatch(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left.toLowerCase());
  const rightBytes = encoder.encode(right.toLowerCase());
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return difference === 0;
}

function getAllowedHosts(nodeEnvironment: string | undefined) {
  return nodeEnvironment === "production"
    ? ["dashboard.tanbuidesigns.com"]
    : ["localhost:*", "127.0.0.1:*", "[::1]:*"];
}

export function createControlRoomAuth(
  configuration: ReadyControlRoomAuthConfiguration,
  nodeEnvironment = process.env.NODE_ENV,
) {
  const googleProvider = google({
    clientId: configuration.googleClientId,
    clientSecret: configuration.googleClientSecret,
    disableDefaultScope: true,
    scope: [...CONTROL_ROOM_GOOGLE_SCOPES],
    accessType: "online",
    prompt: "select_account",
  });

  return betterAuth({
    appName: "Tan Bui Designs Control Room",
    secret: configuration.betterAuthSecret,
    baseURL: {
      allowedHosts: getAllowedHosts(nodeEnvironment),
      protocol: nodeEnvironment === "production" ? "https" : "http",
    },
    basePath: "/api/auth",
    trustedOrigins:
      nodeEnvironment === "production"
        ? ["https://dashboard.tanbuidesigns.com"]
        : ["http://localhost:*", "http://127.0.0.1:*", "http://[::1]:*"],
    socialProviders: {
      google: {
        clientId: configuration.googleClientId,
        clientSecret: configuration.googleClientSecret,
        disableDefaultScope: true,
        scope: [...CONTROL_ROOM_GOOGLE_SCOPES],
        accessType: "online",
        prompt: "select_account",
        getUserInfo: async (tokens) => {
          if (!tokens.idToken) return null;
          const verifiedClaims = await verifyGoogleIdToken({
            token: tokens.idToken,
            audience: configuration.googleClientId,
          });
          if (
            !verifiedClaims ||
            verifiedClaims.email_verified !== true ||
            typeof verifiedClaims.email !== "string" ||
            !exactEmailMatch(verifiedClaims.email, configuration.allowedEmail)
          ) {
            return null;
          }

          const profile = await googleProvider.getUserInfo(tokens);
          if (!profile?.user.emailVerified || !profile.user.email) return null;
          if (!exactEmailMatch(profile.user.email, configuration.allowedEmail)) {
            return null;
          }
          return profile;
        },
      },
    },
    session: {
      expiresIn: CONTROL_ROOM_SESSION_SECONDS,
      updateAge: CONTROL_ROOM_SESSION_SECONDS,
      disableSessionRefresh: true,
      cookieCache: {
        enabled: true,
        maxAge: CONTROL_ROOM_SESSION_SECONDS,
        strategy: "jwe",
        refreshCache: false,
        version: CONTROL_ROOM_SESSION_VERSION,
      },
    },
    account: {
      storeStateStrategy: "cookie",
      storeAccountCookie: true,
      accountLinking: {
        enabled: false,
      },
    },
    advanced: {
      useSecureCookies: nodeEnvironment === "production",
      trustedProxyHeaders: false,
      crossSubDomainCookies: { enabled: false },
      cookiePrefix: "tbds-control-room",
      defaultCookieAttributes: {
        httpOnly: true,
        secure: nodeEnvironment === "production",
        sameSite: "lax",
        path: "/",
      },
    },
    onAPIError: {
      errorURL: "/control-room/sign-in?error=authentication",
    },
    logger: { disabled: true },
    telemetry: { enabled: false },
  });
}

export type ControlRoomAuth = ReturnType<typeof createControlRoomAuth>;

export function isAuthorisedControlRoomSession(
  session: Awaited<ReturnType<ControlRoomAuth["api"]["getSession"]>>,
  allowedEmail: string,
) {
  return Boolean(
    session &&
      session.user.emailVerified === true &&
      exactEmailMatch(session.user.email, allowedEmail),
  );
}
