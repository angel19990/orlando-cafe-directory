import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import {
  cafeBySlugQuery,
  allCafeSlugsQuery,
  relatedCafesQuery,
} from "@/lib/sanity/queries";
import { AREA_LABELS } from "@/lib/types";
import type { CafeDetail, CafeCard as CafeCardType } from "@/lib/types";
import { CafeHero } from "@/components/cafe-detail/hero";
import { EnvironmentSection } from "@/components/cafe-detail/environment-section";
import { SeatingSection } from "@/components/cafe-detail/seating-section";
import { FoodServiceSection } from "@/components/cafe-detail/food-service-section";
import { MoreCafes } from "@/components/cafe-detail/more-cafes";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allCafeSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cafe = await client.fetch<CafeDetail | null>(cafeBySlugQuery, {
    slug,
  });
  if (!cafe) return { title: "Cafe Not Found" };
  return {
    title: `${cafe.name} — ${AREA_LABELS[cafe.area] || cafe.area}`,
    description:
      cafe.description ||
      `${cafe.name} in ${AREA_LABELS[cafe.area] || cafe.area}. Read our honest review.`,
  };
}

export default async function CafePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cafe = await client.fetch<CafeDetail | null>(cafeBySlugQuery, {
    slug,
  });

  if (!cafe) notFound();

  const relatedCafes = await client.fetch<CafeCardType[]>(relatedCafesQuery, {
    slug,
    area: cafe.area,
  });

  return (
    <div>
      <CafeHero cafe={cafe} />
      <EnvironmentSection cafe={cafe} />
      <SeatingSection cafe={cafe} />
      <FoodServiceSection cafe={cafe} />
      <MoreCafes cafes={relatedCafes} area={cafe.area} />
    </div>
  );
}
