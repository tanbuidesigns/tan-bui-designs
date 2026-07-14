import Markdoc from "@markdoc/markdoc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkCTA from "@/components/ArtworkCTA";
import BlogCover from "@/components/blog/BlogCover";
import styles from "@/components/blog/Blog.module.css";
import WideShell from "@/components/ui/WideShell";
import {
  blogReader,
  formatBlogDate,
  getBlogCoverPath,
  getPublishedBlogPost,
  getPublishedBlogPosts,
  getReadingTime,
} from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      authors: [post.author],
      images: post.cover ? [{ url: getBlogCoverPath(post.cover)!, alt: post.coverAlt }] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await blogReader.collections.blog.read(slug);
  if (!post || post.draft) notFound();

  const [{ node }, readingMinutes, allPosts] = await Promise.all([
    post.body(),
    getReadingTime(slug),
    getPublishedBlogPosts(),
  ]);
  const errors = Markdoc.validate(node);
  if (errors.length) throw new Error(`Invalid Markdoc in ${slug}`);
  const content = Markdoc.transform(node);
  const related = allPosts.filter((item) => item.slug !== slug).slice(0, 2);
  const articleUrl = `https://tanbuidesigns.com/blog/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: post.cover ? `https://tanbuidesigns.com${getBlogCoverPath(post.cover)}` : undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: { "@type": "Person", name: post.author, url: "https://tanbuidesigns.com/about" },
    publisher: { "@type": "Organization", name: "Tan Bui Designs", url: "https://tanbuidesigns.com" },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-black">
      <article>
        <header className="pt-12 sm:pt-16 lg:pt-20">
          <WideShell>
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
              <span aria-hidden="true">←</span> Back to Blog
            </Link>
            <AnimatedLabel className="mb-7 mt-10">{post.tags[0] ?? "Design thinking"}</AnimatedLabel>
            <AnimatedHeadline as="h1" className="max-w-[82rem] text-[clamp(3rem,7.5vw,7.4rem)] leading-[0.9] tracking-[-0.065em]">
              {post.title}
            </AnimatedHeadline>
            <p className="mt-9 max-w-4xl text-xl leading-relaxed text-gray-600 sm:text-2xl">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>Published <time dateTime={post.publishedDate}>{formatBlogDate(post.publishedDate)}</time></span>
              <span>Updated <time dateTime={post.updatedDate}>{formatBlogDate(post.updatedDate)}</time></span>
              <span>{readingMinutes} min read</span>
            </div>
          </WideShell>

          <WideShell className="mt-12 sm:mt-16">
            <BlogCover
              src={getBlogCoverPath(post.cover)}
              alt={post.coverAlt}
              priority
              sizes="(max-width: 1599px) calc(100vw - 32px), 1536px"
              className="aspect-[16/9] rounded-[1.35rem]"
            />
          </WideShell>
        </header>

        <WideShell className="py-16 sm:py-20 lg:py-24">
          <div className={`${styles.articleBody} mx-auto max-w-3xl`}>
            {Markdoc.renderers.react(content, React)}
          </div>
        </WideShell>

        {related.length ? (
          <aside className="border-t border-black/8 bg-[#f4f4f1] py-16 sm:py-20" aria-labelledby="related-articles-title">
            <WideShell>
              <AnimatedHeadline as="h2" id="related-articles-title" className="text-4xl sm:text-5xl">Continue reading.</AnimatedHeadline>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="group border-t border-black/15 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
                    <span className="text-xs uppercase tracking-[0.14em] text-gray-500">{item.entry.tags[0]}</span>
                    <h3 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.035em]">{item.entry.title}</h3>
                    <span className="mt-5 inline-flex text-sm font-semibold">Read article →</span>
                  </Link>
                ))}
              </div>
              <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Explore Tan Bui Designs">
                <Link href="/work" className="underline underline-offset-4">View Work</Link>
                <Link href="/about" className="underline underline-offset-4">About Tan</Link>
                <Link href="/contact" className="underline underline-offset-4">Start a project</Link>
              </nav>
            </WideShell>
          </aside>
        ) : null}
      </article>

      <ArtworkCTA
        label="Start a project"
        heading="Have an idea that needs clarity, craft and direction?"
        body="Tell me what you are trying to make, improve or explain. We can work out the useful next step from there."
        buttonLabel="Start a Conversation"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
