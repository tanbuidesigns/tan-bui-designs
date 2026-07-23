import { projects } from "@/data/projects";

export type BlogPromoMediaKey = "islamiyah-series-featured" | "project-services";

export type BlogPromoImage = {
  src: string;
  alt: string;
  label: string;
};

export type BlogPromoMedia = {
  images: readonly BlogPromoImage[];
  representative: boolean;
};

const islamiyah = projects.find((project) => project.slug === "islamiyah-series");

if (!islamiyah || islamiyah.featuredImages.length !== 3) {
  throw new Error("The Islamiyah Series promo requires exactly three featured images.");
}

const media: Record<BlogPromoMediaKey, BlogPromoMedia> = {
  "islamiyah-series-featured": {
    images: islamiyah.featuredImages.map((src, index) => ({
      src,
      alt: `Islamiyah Series design work, image ${index + 1} of 3`,
      label: `Image ${index + 1} of 3`,
    })),
    representative: false,
  },
  "project-services": {
    images: [
      { src: "/blog/promo/project-product-design.png", alt: "Product design workspace with prototype sketches, tools and material samples", label: "Image 1 of 3: Product design" },
      { src: "/blog/promo/project-ui-ux-design.png", alt: "Illustrative interface design workspace with a screen and design-system modules", label: "Image 2 of 3: UI/UX design" },
      { src: "/blog/promo/project-website-design.png", alt: "Illustrative website design workspace with a desktop screen and layout modules", label: "Image 3 of 3: Website design" },
    ],
    representative: true,
  },
};

export function getBlogPromoMedia(key: BlogPromoMediaKey): BlogPromoMedia {
  return media[key];
}

export function isBlogPromoMediaKey(value: string): value is BlogPromoMediaKey {
  return value in media;
}
