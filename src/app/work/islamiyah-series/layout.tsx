import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Islamiyah Series Case Study | Publication and Educational Design | Tan Bui Designs",
  },
  description:
    "The Islamiyah Series case study: a connected publication, branding and interactive learning system designed by Tan Bui.",
  alternates: { canonical: "/work/islamiyah-series" },
  openGraph: {
    type: "article",
    url: "/work/islamiyah-series",
    title: "Islamiyah Series Case Study | Publication and Educational Design",
    description:
      "A connected publication, branding and interactive learning system designed by Tan Bui.",
    images: [
      {
        url: "/social/islamiyah-series-case-study.png",
        width: 1200,
        height: 630,
        alt: "Islamiyah Series publication and educational design case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamiyah Series Case Study | Publication and Educational Design",
    description:
      "A connected publication, branding and interactive learning system designed by Tan Bui.",
    images: ["/social/islamiyah-series-case-study.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      name: "Islamiyah Series Case Study",
      url: "https://tanbuidesigns.com/work/islamiyah-series",
      description:
        "A connected publication, branding and interactive learning system designed by Tan Bui.",
      image: "https://tanbuidesigns.com/social/islamiyah-series-case-study.png",
      creator: {
        "@type": "Person",
        name: "Tan Bui",
        url: "https://tanbuidesigns.com/about",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Work", item: "https://tanbuidesigns.com/work" },
        { "@type": "ListItem", position: 2, name: "Islamiyah Series", item: "https://tanbuidesigns.com/work/islamiyah-series" },
      ],
    },
  ],
};

export default function IslamiyahSeriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
