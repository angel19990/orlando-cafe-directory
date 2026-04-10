import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { client } from "@/lib/sanity/client";
import { cafesByAreaQuery } from "@/lib/sanity/queries";
import { CafeCard } from "@/components/cafe-card";
import { AREA_LABELS } from "@/lib/types";
import type { Area, CafeCard as CafeCardType } from "@/lib/types";

export const revalidate = 60;

const VALID_AREAS = Object.keys(AREA_LABELS) as Area[];

export function generateStaticParams() {
  return VALID_AREAS.map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const label = AREA_LABELS[area as Area];
  if (!label) return { title: "Area Not Found" };
  return {
    title: `Cafes in ${label}`,
    description: `Discover the best cafes in ${label}, Central Florida. Personally visited and honestly reviewed.`,
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const label = AREA_LABELS[area as Area];
  if (!label) notFound();

  const cafes = await client.fetch<CafeCardType[]>(cafesByAreaQuery, { area });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        All cafes
      </Link>

      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
        Cafes in {label}
      </h1>
      <p className="mb-8 text-base text-muted-foreground">
        {cafes.length} {cafes.length === 1 ? "cafe" : "cafes"} in {label}.
      </p>

      {cafes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cafes.map((cafe) => (
            <CafeCard key={cafe._id} cafe={cafe} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-3xl">☕</p>
          <p className="mt-2 text-sm text-muted-foreground">
            No cafes listed in {label} yet.{" "}
            <Link href="/submit" className="text-primary underline">
              Submit one!
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
