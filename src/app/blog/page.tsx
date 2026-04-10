import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { allBlogPostsQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPostCard } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Cafe guides, neighborhood spotlights, and coffee culture stories from Central Florida.",
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPostCard[]>(allBlogPostsQuery);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Blog
      </h1>
      <p className="mb-8 text-base text-muted-foreground">
        Cafe guides, neighborhood spotlights, and coffee culture stories.
      </p>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group block"
            >
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                {post.coverImage?.asset && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <Image
                      src={urlFor(post.coverImage).width(800).height(450).url()}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <CardContent className="space-y-2">
                  <div>
                    <h2 className="font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {post.author?.name && (
                        <span>By {post.author.name} &middot; </span>
                      )}
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
