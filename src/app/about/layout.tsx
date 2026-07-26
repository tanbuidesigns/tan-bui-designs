import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tan Bui",
  description:
    "Learn about Tan Bui's 15+ years of multidisciplinary design experience across print, branding, packaging, publications, websites, exhibitions and digital experiences.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
