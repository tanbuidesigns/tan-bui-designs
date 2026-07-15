import Markdoc from "@markdoc/markdoc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import BlogCover from "@/components/blog/BlogCover";
import styles from "@/components/blog/Blog.module.css";
import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";
import {
  formatBlogDate,
  getBlogCoverPath,
  getPublishedBlogPost,
  getPublishedBlogPosts,
  getReadingTime,
} from "@/lib/blog";

export const dynamicParams = false;

const highlightedStatements: Record<string, string> = {
  "avoiding-trendslop-design-taste-ai": "Context-specific judgement still has to come from the person directing and editing the work.",
  "design-foundations-still-matter": "A polished file is not automatically a good piece of design.",
  "vibe-coding-custom-websites": "It is also very easy to build the wrong thing quickly.",
};

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
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  const [readingMinutes, allPosts] = await Promise.all([
    getReadingTime(slug),
    getPublishedBlogPosts(),
  ]);
  const node = Markdoc.parse(post.bodySource);
  const errors = Markdoc.validate(node);
  if (errors.length) throw new Error(`Invalid Markdoc in ${slug}`);
  const renderedContent = Markdoc.renderers.react(Markdoc.transform(node), React);
  const content = highlightStatement(renderedContent, highlightedStatements[slug]);
  const contentSections = groupArticleSections(content);
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
        <header className={styles.articleHeader}>
          <WideShell>
            <div className={styles.articleShell}>
              <Link href="/blog" className={styles.backLink}>Back to blog</Link>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <AnimatedHeadline as="h1" className={styles.articleTitle}>
                    {toSentenceCase(post.title)}
                  </AnimatedHeadline>

                  <p className={styles.heroExcerpt}>{post.excerpt}</p>

                  <dl className={styles.articleMeta}>
                    <div>
                      <dt>Author</dt>
                      <dd>{post.author}</dd>
                    </div>
                    <div>
                      <dt>Published</dt>
                      <dd><time dateTime={post.publishedDate}>{formatBlogDate(post.publishedDate)}</time></dd>
                    </div>
                    <div>
                      <dt>Updated</dt>
                      <dd><time dateTime={post.updatedDate}>{formatBlogDate(post.updatedDate)}</time></dd>
                    </div>
                    <div>
                      <dt>Reading time</dt>
                      <dd>{readingMinutes} min read</dd>
                    </div>
                  </dl>

                  <div className={styles.articleTags} aria-label="Article topics">
                    {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>

                <div className={styles.heroMedia}>
                  <BlogCover
                    src={getBlogCoverPath(post.cover)}
                    alt={post.coverAlt}
                    priority
                    sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 38vw, 28rem"
                    className={styles.heroCover}
                  />
                </div>
              </div>
            </div>
          </WideShell>
        </header>

        <WideShell className={styles.articleContentShell}>
          <div className={styles.articleBody}>{contentSections}</div>
        </WideShell>

        {related.length ? (
          <aside className="border-t border-black/8 bg-[#f4f4f1] py-14 sm:py-18" aria-labelledby="related-articles-title">
            <WideShell>
              <div className={styles.articleShell}>
                <AnimatedHeadline as="h2" id="related-articles-title" className="text-4xl sm:text-5xl">Continue reading</AnimatedHeadline>
                <div className="mt-9 grid gap-6 md:grid-cols-2">
                  {related.map((item) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.045)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
                      <BlogCover src={getBlogCoverPath(item.entry.cover)} alt={item.entry.coverAlt} sizes="(max-width: 767px) calc(100vw - 32px), 48vw" className="aspect-[16/9]" />
                      <div className="p-6 sm:p-7">
                        <h3 className="text-2xl font-bold leading-tight tracking-[-0.035em]">{item.entry.title}</h3>
                        <p className="mt-4 line-clamp-3 leading-relaxed text-gray-600">{item.entry.excerpt}</p>
                        <p className="mt-5 text-xs uppercase tracking-[0.12em] text-gray-500">{formatBlogDate(item.entry.publishedDate)} · {item.entry.tags[0]}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <nav className="mt-10 flex flex-wrap gap-3 border-t border-black/10 pt-8" aria-label="Explore Tan Bui Designs">
                  <Button href="/work" variant="secondary">View work</Button>
                  <Button href="/about" variant="secondary">About us</Button>
                  <Button href="/contact" variant="primary">Start project</Button>
                </nav>
              </div>
            </WideShell>
          </aside>
        ) : null}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}

function toSentenceCase(title: string) {
  const acronyms = title.match(/\b[A-Z0-9]{2,}\b/g) ?? [];
  const sentenceCase = `${title.charAt(0).toUpperCase()}${title
    .slice(1)
    .toLowerCase()}`;

  return acronyms.reduce(
    (result, acronym) =>
      result.replace(new RegExp(`\\b${acronym.toLowerCase()}\\b`, "g"), acronym),
    sentenceCase
  );
}

function highlightStatement(content: React.ReactNode, statement?: string) {
  if (!statement) return content;
  let highlighted = false;

  const visit = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string" && !highlighted && node.includes(statement)) {
      const [before, after] = node.split(statement);
      highlighted = true;
      return <>{before}<mark>{statement}</mark>{after}</>;
    }
    if (Array.isArray(node)) return React.Children.map(node, visit);
    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      return React.cloneElement(node, undefined, visit(node.props.children));
    }
    return node;
  };

  return visit(content);
}

function groupArticleSections(content: React.ReactNode) {
  const rootChildren = React.Children.toArray(content);
  const children =
    rootChildren.length === 1 &&
    React.isValidElement<{ children?: React.ReactNode }>(rootChildren[0]) &&
    rootChildren[0].type === "article"
      ? React.Children.toArray(rootChildren[0].props.children)
      : rootChildren;
  const groups: React.ReactNode[][] = [];
  let currentGroup: React.ReactNode[] = [];

  children.forEach((child) => {
    if (React.isValidElement(child) && child.type === "h2" && currentGroup.length) {
      groups.push(currentGroup);
      currentGroup = [];
    }

    currentGroup.push(child);
  });

  if (currentGroup.length) groups.push(currentGroup);

  return groups.map((group, index) => (
    <section className={styles.readingSection} key={`article-section-${index}`}>
      {group.map((child, childIndex) => (
        <React.Fragment key={`article-section-${index}-item-${childIndex}`}>
          {child}
        </React.Fragment>
      ))}
    </section>
  ));
}
