import type { Metadata } from "next";
import { headers } from "next/headers";

import { enforceControlRoomRuntimePolicy } from "@/lib/control-room/runtime/control-room-policy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "TBD Control Room | Internal Prototype",
  description: "A private local prototype for reviewing website health and growth information.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      noimageindex: true,
      nosnippet: true,
    },
  },
};

export default async function ControlRoomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  await enforceControlRoomRuntimePolicy(requestHeaders);

  return children;
}
