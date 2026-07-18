"use client";

import { useState } from "react";

import { controlRoomAuthClient } from "@/lib/control-room/auth/auth-client";

export default function ControlRoomGoogleSignIn({
  disabled,
}: {
  disabled: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function continueWithGoogle() {
    if (disabled || pending) return;
    setPending(true);
    setFailed(false);

    try {
      await controlRoomAuthClient.signOut();
      const result = await controlRoomAuthClient.signIn.social({
        provider: "google",
        callbackURL: "/control-room",
        errorCallbackURL: "/control-room/sign-in?error=authentication",
      });
      if (result.error) setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-7">
      <button
        type="button"
        disabled={disabled || pending}
        onClick={continueWithGoogle}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-white/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#111216] disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
      >
        {pending ? "Opening Google sign-in…" : "Continue with Google"}
      </button>
      {failed ? (
        <p role="alert" className="mt-3 text-sm text-white/58">
          Sign-in could not be started. Please try again.
        </p>
      ) : null}
    </div>
  );
}
