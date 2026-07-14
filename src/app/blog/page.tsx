import type { Metadata } from "next";
import Link from "next/link";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import BlogCover from "@/components/blog/BlogCover";
import styles from "@/components/blog/Blog.module.css";
import WideShell from "@/components/ui/WideShell";
import { formatBlogDate, getBlogCoverPath, getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Tan Bui Designs",
  description:
    "Practical writing from Tan Bui about design craft, production, websites, creative technology and making complex work clearer.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Tan Bui Designs",
    description:
      "Writing about design craft, production, websites and creative technology.",
    type: "website",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const featured = posts.find((post) => post.entry.featured) ?? posts[0];
  const supporting = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-black">
      <section className="relative isolate overflow-clip bg-[#08090b] py-20 text-white sm:py-24 lg:py-28">
        <ArtworkBackground variant="hero" />
        <WideShell className="relative z-10">
          <AnimatedLabel tone="dark" className="mb-7 text-white/52">Blog</AnimatedLabel>
          <AnimatedHeadline as="h1" tone="dark" className="max-w-6xl text-5xl sm:text-6xl lg:text-8xl">
            Ideas shaped by making things properly.
          </AnimatedHeadline>
          <p className="mt-9 max-w-3xl text-lg leading-relaxed text-white/68 sm:text-xl">
            Practical thoughts on design, production, websites, creative tools
            and the judgement needed to turn fast-moving ideas into useful work.
          </p>
        </WideShell>
      </section>

      {featured ? (
        <section className="py-14 sm:py-20 lg:py-24" aria-labelledby="featured-article-title">
          <WideShell>
            <Link href={`/blog/${featured.slug}`} className="group grid gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-14">
              <BlogCover
                src={getBlogCoverPath(featured.entry.cover)}
                alt={featured.entry.coverAlt}
                priority
                sizes="(max-width: 1023px) calc(100vw - 32px), 58vw"
                className="aspect-[16/10] rounded-[1.35rem]"
              />
              <div>
                <AnimatedLabel className="mb-5">Featured article</AnimatedLabel>
                <h2 id="featured-article-title" className={`${styles.cardTitle} text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl`}>
                  {featured.entry.title}
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-gray-600">
                  {featured.entry.excerpt}
                </p>
                <ArticleDates published={featured.entry.publishedDate} updated={featured.entry.updatedDate} />
                <span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold">
                  Read article <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </WideShell>
        </section>
      ) : null}

      {supporting.length ? (
        <section className="border-t border-black/8 bg-[#f4f4f1] py-16 sm:py-20 lg:py-24" aria-labelledby="latest-writing-title">
          <WideShell>
            <AnimatedHeadline as="h2" id="latest-writing-title" className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
              More from the notebook.
            </AnimatedHeadline>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {supporting.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block rounded-[1.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-6">
                    <BlogCover
                      src={getBlogCoverPath(post.entry.cover)}
                      alt={post.entry.coverAlt}
                      sizes="(max-width: 767px) calc(100vw - 32px), 48vw"
                      className="aspect-[16/10] rounded-[1.35rem]"
                    />
                    <div className="pt-7">
                      <h2 className={`${styles.cardTitle} text-3xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-4xl`}>
                        {post.entry.title}
                      </h2>
                      <p className="mt-5 max-w-2xl leading-relaxed text-gray-600">{post.entry.excerpt}</p>
                      <ArticleDates published={post.entry.publishedDate} updated={post.entry.updatedDate} />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </WideShell>
        </section>
      ) : null}
    </main>
  );
}

function ArticleDates({ published, updated }: { published: string; updated: string }) {
  return (
    <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-gray-500">
      Published <time dateTime={published}>{formatBlogDate(published)}</time>
      <> · Updated <time dateTime={updated}>{formatBlogDate(updated)}</time></>
    </p>
  );
}
