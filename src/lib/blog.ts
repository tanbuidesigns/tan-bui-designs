import { blogPosts } from "@/data/blog.generated";

export async function getPublishedBlogPosts() {
  return [...blogPosts]
    .filter((post) => !post.entry.draft)
    .sort(
      (first, second) =>
        new Date(second.entry.publishedDate).getTime() -
        new Date(first.entry.publishedDate).getTime()
    );
}

export async function getPublishedBlogPost(slug: string) {
  const post = blogPosts.find((item) => item.slug === slug)?.entry;
  return post && !post.draft ? post : null;
}

export async function getReadingTime(slug: string) {
  const source = blogPosts.find((item) => item.slug === slug)?.entry.bodySource;
  if (!source) return 1;
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
