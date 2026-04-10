import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { client } from "@/lib/sanity/client";
import { blogPostBySlugQuery, allBlogSlugsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Badge } from "@/components/ui/badge";
import { PortableText } from "@/components/portable-text";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImage } from "@/lib/types";

export const revalidate = 60;

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  content?: PortableTextBlock[];
  publishedAt: string;
  categories?: string[];
  author?: {
    name: string;
    slug: { current: string };
    headshot?: SanityImage;
    bio?: PortableTextBlock[];
  };
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImage;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allBlogSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(blogPostBySlugQuery, {
    slug,
  });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<BlogPost | null>(blogPostBySlugQuery, {
    slug,
  });

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to blog
      </Link>

      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {post.title}
        </h1>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.headshot?.asset && (
                <Image
                  src={urlFor(post.author.headshot).width(32).height(32).url()}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{post.author.name}</span>
            </div>
          )}
          <span>&middot;</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        {post.categories && post.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <Badge key={cat} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Cover image */}
      {post.coverImage?.asset && (
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={urlFor(post.coverImage).width(1200).height(675).url()}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Content */}
      {post.content && post.content.length > 0 && (
        <PortableText value={post.content} />
      )}

      {/* Author bio */}
      {post.author?.bio && post.author.bio.length > 0 && (
        <div className="mt-10 rounded-xl border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            {post.author.headshot?.asset && (
              <Image
                src={urlFor(post.author.headshot).width(48).height(48).url()}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {post.author.name}
              </p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>
          <PortableText value={post.author.bio} />
        </div>
      )}
    </article>
  );
}
