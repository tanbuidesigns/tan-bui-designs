import type { Metadata } from "next";

import UrbanEatDraftClient from "./UrbanEatDraftClient";

export const metadata: Metadata = {
  title: "Urban Eat Draft | Tan Bui Designs",
  description:
    "Private draft page for the Urban Eat case study.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function UrbanEatDraftPage() {
  return <UrbanEatDraftClient />;
}