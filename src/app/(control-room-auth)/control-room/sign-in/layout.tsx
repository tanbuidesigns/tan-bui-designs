import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { classifyControlRoomHost } from "@/lib/control-room/auth/host-policy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Control Room sign in | Tan Bui Designs",
  description: "Private Control Room authentication.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
  },
};

export default async function ControlRoomSignInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  if (
    classifyControlRoomHost(
      process.env.NODE_ENV,
      requestHeaders.get("host"),
    ) === "denied"
  ) {
    notFound();
  }

  return children;
}
