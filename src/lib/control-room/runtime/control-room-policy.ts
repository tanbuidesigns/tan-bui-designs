import "server-only";

import { notFound, redirect } from "next/navigation";

import { classifyControlRoomHost } from "../auth/host-policy";
import { createControlRoomAuth, isAuthorisedControlRoomSession } from "../auth/auth";
import { getControlRoomAuthConfiguration } from "../auth/configuration";

export type ControlRoomMode = "development-local" | "google-auth-protected-production";
export type DevelopmentControlRoomIdentity = { authenticationSource: "local-development" };
export type GoogleControlRoomIdentity = {
  authenticationSource: "google";
  emailVerified: true;
};

export const controlRoomRuntimePolicy = {
  activeMode: (process.env.NODE_ENV === "development" ? "development-local" : "google-auth-protected-production") satisfies ControlRoomMode,
  productionPilotState: "code-ready-manual-gate" as const,
  description: "Localhost is allowed only in development. Production requires the private host, valid Better Auth configuration and an authorised Google session.",
};

export async function enforceControlRoomRuntimePolicy(
  requestHeaders: Headers,
): Promise<GoogleControlRoomIdentity | DevelopmentControlRoomIdentity> {
  const hostClassification = classifyControlRoomHost(process.env.NODE_ENV, requestHeaders.get("host"));
  if (hostClassification === "denied") notFound();
  if (hostClassification === "development") return { authenticationSource: "local-development" };

  const configuration = getControlRoomAuthConfiguration();
  if (configuration.status !== "ready") redirect("/control-room/sign-in?error=configuration");

  try {
    const auth = createControlRoomAuth(configuration);
    const session = await auth.api.getSession({ headers: requestHeaders });
    if (!session) redirect("/control-room/sign-in");
    if (!isAuthorisedControlRoomSession(session, configuration.allowedEmail)) {
      redirect("/control-room/sign-in?error=unauthorised");
    }
    return { authenticationSource: "google", emailVerified: true };
  } catch (error: unknown) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/control-room/sign-in?error=authentication");
  }
}
