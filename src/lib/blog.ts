import { readFile } from "node:fs/promises";
import path from "node:path";

import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../../keystatic.config";

export const blogReader = createReader(process.cwd(), keystaticConfig);

export async function getPublishedBlogPosts() {
  const posts = await blogReader.collections.blog.all();

  return posts
    .filter((post) => !post.entry.draft)
    .sort(
      (first, second) =>
        new Date(second.entry.publishedDate).getTime() -
        new Date(first.entry.publishedDate).getTime()
    );
}

export async function getPublishedBlogPost(slug: string) {
  const post = await blogReader.collections.blog.read(slug);
  return post && !post.draft ? post : null;
}

export async function getReadingTime(slug: string) {
  const source = await readFile(
    path.join(process.cwd(), "content", "blog", slug, "body.mdoc"),
    "utf8"
  );
  const words = source
    .replace(/\[[^\]]+\]\([^\)]+\)/g, " ")
    .replace(/[#*_>`~\-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function getBlogCoverPath(value: string | null) {
  if (!value) return null;
  return value.startsWith("/") ? value : `/blog/covers/${value}`;
}
