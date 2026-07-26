import type { Metadata } from "next";

import UrbanEatClient from "./UrbanEatClient";

export const metadata: Metadata = {
  title: {
    absolute: "Urban Eat Case Study | FMCG Packaging & Brand Design | Tan Bui Designs",
  },
  description:
    "A real-world FMCG case study showing Urban Eat packaging, brand craft, retail activation, campaign design, sub-brand work and pitch presentation design by Tan Bui.",
  alternates: {
    canonical: "/work/urban-eat",
  },
  openGraph: {
    type: "article",
    url: "/work/urban-eat",
    title: "Urban Eat Case Study | FMCG Packaging & Brand Design",
    description:
      "Urban Eat packaging, brand craft, retail activation, campaign design, sub-brand work and pitch presentation design by Tan Bui.",
    images: [
      {
        url: "/social/urban-eat-case-study.png",
        width: 1200,
        height: 630,
        alt: "Urban Eat packaging and brand design case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Eat Case Study | FMCG Packaging & Brand Design",
    description:
      "Urban Eat packaging, brand craft, retail activation and campaign design by Tan Bui.",
    images: ["/social/urban-eat-case-study.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      name: "Urban Eat Case Study",
      url: "https://tanbuidesigns.com/work/urban-eat",
      description:
        "Urban Eat packaging, brand craft, retail activation, campaign design, sub-brand work and pitch presentation design by Tan Bui.",
      image: "https://tanbuidesigns.com/social/urban-eat-case-study.png",
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
        { "@type": "ListItem", position: 2, name: "Urban Eat", item: "https://tanbuidesigns.com/work/urban-eat" },
      ],
    },
  ],
};

export default function UrbanEatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <UrbanEatClient />
    </>
  );
}
