import "server-only";

import { notFound } from "next/navigation";

export type ControlRoomMode = "development-only" | "access-protected-production";

export const controlRoomRuntimePolicy = {
  activeMode: "development-only" as const satisfies ControlRoomMode,
  futureSupportedMode: "access-protected-production" as const satisfies ControlRoomMode,
  productionAvailable: false,
  description: "Local development access only. Production always returns notFound().",
};

export function enforceControlRoomRuntimePolicy(): void {
  if (process.env.NODE_ENV === "production") notFound();
}
