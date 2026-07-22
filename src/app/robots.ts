import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/control-room", "/api", "/keystatic"],
    },
    sitemap: "https://tanbuidesigns.com/sitemap.xml",
  };
}
