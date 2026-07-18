import ControlRoomGoogleSignIn from "@/components/control-room/ControlRoomGoogleSignIn";
import { getControlRoomAuthConfiguration } from "@/lib/control-room/auth/configuration";

type SignInPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ControlRoomSignInPage({
  searchParams,
}: SignInPageProps) {
  const { error } = await searchParams;
  const configurationReady =
    getControlRoomAuthConfiguration().status === "ready";
  const unauthorised = error === "unauthorised";
  const hasGenericError = Boolean(error) && !unauthorised;

  return (
    <main className="tbds-private-control-room flex min-h-screen items-center justify-center overflow-x-clip bg-[#0b0c0f] px-5 py-12 text-white sm:px-8">
      <section
        aria-labelledby="control-room-sign-in-title"
        className="relative w-full max-w-xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111216] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:p-10"
      >
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[image:var(--tbds-accent-gradient)] opacity-20 blur-3xl"
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Private workspace
          </p>
          <h1
            id="control-room-sign-in-title"
            className="mt-4 text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-5xl"
          >
            Tan Bui Designs Control Room
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/62 sm:text-base">
            This private area is limited to one authorised Google account.
          </p>

          {unauthorised ? (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white/72"
            >
              This Google account is not authorised.
            </p>
          ) : null}
          {hasGenericError || !configurationReady ? (
            <p
              role="alert"
              className="mt-6 rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm text-white/72"
            >
              Private sign-in is not available yet. Please try again later.
            </p>
          ) : null}

          <ControlRoomGoogleSignIn disabled={!configurationReady} />
        </div>
      </section>
    </main>
  );
}
