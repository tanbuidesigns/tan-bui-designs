import type { Config } from "@markdoc/markdoc";
import { Accordion, AccordionGroup, Card, CardGrid, MediaPromo } from "@/components/blog/BlogArticleBlocks";

const internalHref = ["/contact", "/work/islamiyah-series"];

export const blogMarkdocConfig: Config = {
  tags: {
    card_grid: { render: "CardGrid" },
    card: { render: "Card", attributes: { title: { type: String, required: true } } },
    accordion_group: { render: "AccordionGroup" },
    accordion: { render: "Accordion", attributes: { question: { type: String, required: true } } },
    media_promo: { render: "MediaPromo", attributes: {
      mediaKey: { type: String, required: true, matches: ["islamiyah-series-featured", "project-services"] },
      eyebrow: { type: String, required: true }, title: { type: String, required: true },
      href: { type: String, required: true, matches: internalHref }, linkLabel: { type: String, required: true },
      icon: { type: String, required: true, matches: ["learning-system", "conversation"] },
      variant: { type: String, required: true, matches: ["case-study", "project-enquiry"], render: false },
    } },
  },
};

export const blogMarkdocComponents = { CardGrid, Card, AccordionGroup, Accordion, MediaPromo };
