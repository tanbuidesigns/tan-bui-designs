import type { Metadata } from "next";

import UrbanEatClient from "./UrbanEatClient";

export const metadata: Metadata = {
  title: "Urban Eat Case Study | FMCG Packaging & Brand Design | Tan Bui Designs",
  description:
    "A real-world FMCG case study showing Urban Eat packaging, brand craft, retail activation, campaign design, sub-brand work and pitch presentation design by Tan Bui.",
  alternates: {
    canonical: "/work/urban-eat",
  },
};

export default function UrbanEatPage() {
  return <UrbanEatClient />;
}