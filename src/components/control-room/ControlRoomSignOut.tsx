"use client";

import { useState } from "react";

import { controlRoomAuthClient } from "@/lib/control-room/auth/auth-client";

export default function ControlRoomSignOut() {
  const [pending, setPending] = useState(false);

  async function signOut() {
    if (pending) return;
    setPending(true);
    try {
      await controlRoomAuthClient.signOut();
    } finally {
      window.location.assign("/control-room/sign-in");
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="min-h-10 rounded-lg border border-white/15 px-3 text-xs font-semibold text-white/62 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-50 motion-reduce:transition-none"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
