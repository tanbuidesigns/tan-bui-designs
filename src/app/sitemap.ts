import type { MetadataRoute } from "next";

import { blogPosts } from "../data/blog.generated.ts";
import { projects } from "../data/projects.ts";

const siteUrl = "https://tanbuidesigns.com";

const staticPublicRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/work",
  "/blog",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPublicRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${siteUrl}${project.href}`,
  }));

  const blogEntries = blogPosts
    .filter((post) => !post.entry.draft)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.entry.updatedDate,
    }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
