import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tan Bui",
  description:
    "Learn about Tan Bui's 15+ years of multidisciplinary design experience across print, branding, packaging, publications, websites, exhibitions and digital experiences.",
  alternates: { canonical: "/about" },
  twitter: {
    card: "summary_large_image",
    title: "About Tan Bui | Tan Bui Designs",
    description:
      "15+ years of multidisciplinary design experience across print, branding, packaging, publications, websites, exhibitions and digital experiences.",
    images: ["/social/tan-bui-designs.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
