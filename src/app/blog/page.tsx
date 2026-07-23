import type { Metadata } from "next";
import Link from "next/link";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import ArtworkCTA from "@/components/ArtworkCTA";
import BlogCover from "@/components/blog/BlogCover";
import styles from "@/components/blog/Blog.module.css";
import WideShell from "@/components/ui/WideShell";
import { formatBlogDate, getBlogCoverPath, getPublishedBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Tan Bui Designs",
  description: "Practical writing from Tan Bui about design craft, production, websites, creative technology and making complex work clearer.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Tan Bui Designs",
    description: "Writing about design craft, production, websites and creative technology.",
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
      <section className="relative isolate overflow-clip bg-[#08090b] py-14 text-white sm:py-16 lg:py-20">
        <ArtworkBackground variant="hero" />
        <WideShell className="relative z-10">
          <AnimatedLabel tone="dark" className="mb-5 text-white/52">BLOG</AnimatedLabel>
          <AnimatedHeadline as="h1" tone="dark" className="max-w-5xl text-5xl sm:text-6xl lg:text-7xl">
            Ideas shaped by experience
          </AnimatedHeadline>
        </WideShell>
      </section>

      {featured ? (
        <section className="bg-[#f4f4f1] py-10 sm:py-14 lg:py-16" aria-label="Articles">
          <WideShell>
            <article className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
              <Link href={`/blog/${featured.slug}`} className="group grid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset lg:grid-cols-[1.15fr_0.85fr]">
                <BlogCover
                  src={getBlogCoverPath(featured.entry.cover)}
                  alt={featured.entry.coverAlt}
                  artwork={featured.entry.coverArtwork}
                  priority
                  sizes="(max-width: 1023px) calc(100vw - 32px), 56vw"
                  className="aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]"
                />
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <AnimatedLabel className="mb-5">Featured article</AnimatedLabel>
                  <h2 className={`${styles.cardTitle} text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl`}>
                    {featured.entry.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">{featured.entry.excerpt}</p>
                  <ArticleDates published={featured.entry.publishedDate} updated={featured.entry.updatedDate} />
                  <span className="mt-7 inline-flex items-center gap-3 text-sm font-semibold">
                    Read article <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </article>

            {supporting.length ? (
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {supporting.map((post) => (
                  <article key={post.slug} className="group overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.045)]">
                    <Link href={`/blog/${post.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset">
                      <BlogCover src={getBlogCoverPath(post.entry.cover)} alt={post.entry.coverAlt} sizes="(max-width: 767px) calc(100vw - 32px), 48vw" className="aspect-[16/10]" />
                      <div className="p-7 sm:p-8">
                        <h2 className={`${styles.cardTitle} text-3xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-4xl`}>{post.entry.title}</h2>
                        <p className="mt-5 max-w-2xl leading-relaxed text-gray-600">{post.entry.excerpt}</p>
                        <ArticleDates published={post.entry.publishedDate} updated={post.entry.updatedDate} />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : null}
          </WideShell>
        </section>
      ) : null}

      <ArtworkCTA
        label="LOOKING FORWARD"
        heading="The work continues"
        headingChunks={["The work", "continues"]}
        body="Tan Bui Designs is my long-term creative home. A place to create meaningful work, explore new ideas and help organisations communicate more clearly."
        buttonLabel="Start a Conversation"
      />
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
