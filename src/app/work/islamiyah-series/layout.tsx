import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Islamiyah Series Case Study | Publication and Educational Design",
  description:
    "The Islamiyah Series case study: a connected publication, branding and interactive learning system designed by Tan Bui.",
  alternates: { canonical: "/work/islamiyah-series" },
};

export default function IslamiyahSeriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
