import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity/client";
import { allCafesQuery } from "@/lib/sanity/queries";
import { CafeDirectory } from "@/components/cafe-directory";
import { HeroSearch } from "@/components/hero-search";
import { NeighborhoodGrid } from "@/components/neighborhood-grid";
import type { CafeCard } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const cafes = await client.fetch<CafeCard[]>(allCafesQuery);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#FCEEE3] overflow-hidden" style={{ backgroundColor: "#FCEEE3" }}>
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[url('/texture.jpg')] bg-repeat mix-blend-multiply" />
        <div className="content-container relative flex flex-col items-center py-20 text-center">
          <span className="mb-6 inline-block rounded-full bg-[#F5D060] px-4 py-1.5 text-sm font-semibold text-foreground">
            Central Florida&apos;s cafe guide
          </span>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground font-[family-name:var(--font-heading)] sm:text-5xl">
            Find your next favorite cafe in Orlando
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Browse cafes by vibe, specialty, study-friendliness, and more.
          </p>
          <HeroSearch initialValue={q} />
        </div>
      </section>

      {/* Directory (Filters + Cafe Grid) */}
      <div id="directory">
        <CafeDirectory cafes={cafes} initialSearch={q} />
      </div>

      {/* Browse by Neighborhood */}
      <NeighborhoodGrid cafes={cafes} />

      {/* CTA Banner */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FCEEE3" }}>
        <div className="absolute inset-0 bg-[url('/texture.jpg')] bg-repeat mix-blend-multiply" />
        <div className="content-container relative flex flex-col items-center py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground font-[family-name:var(--font-heading)] sm:text-3xl">
            Know a great cafe we should add?
          </h2>
          <p className="mt-5 text-base text-muted-foreground">
            Help us build Central Florida&apos;s most useful cafe directory.
          </p>
          <Link
            href="/submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B5450F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8E3408]"
          >
            Submit a Cafe
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
