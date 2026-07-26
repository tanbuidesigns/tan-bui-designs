import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected Tan Bui Designs case studies across brand systems, publication design, packaging, digital experiences and visual storytelling.",
  alternates: { canonical: "/work" },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work | Tan Bui Designs",
    description:
      "Selected case studies across brand systems, publication design, packaging, digital experiences and visual storytelling.",
    images: ["/social/tan-bui-designs.png"],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
