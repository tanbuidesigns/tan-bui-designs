"use client";

import { createAuthClient } from "better-auth/react";

export const controlRoomAuthClient = createAuthClient({
  basePath: "/api/auth",
});
