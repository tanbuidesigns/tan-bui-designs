import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected Tan Bui Designs case studies across brand systems, publication design, packaging, digital experiences and visual storytelling.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
