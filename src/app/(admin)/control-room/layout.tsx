import type { Metadata } from "next";

import { enforceControlRoomRuntimePolicy } from "@/lib/control-room/runtime/control-room-policy";

export const metadata: Metadata = {
  title: "TBD Control Room | Internal Prototype",
  description: "A private local prototype for reviewing website health and growth information.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ControlRoomLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  enforceControlRoomRuntimePolicy();

  return children;
}
