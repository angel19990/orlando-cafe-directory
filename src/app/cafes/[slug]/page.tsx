import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Star,
  Wifi,
  Volume2,
  BookOpen,
  ExternalLink,
  Clock,
  ArrowLeft,
  UtensilsCrossed,
  AtSign,
} from "lucide-react";
import { client } from "@/lib/sanity/client";
import {
  cafeBySlugQuery,
  allCafeSlugsQuery,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PortableText } from "@/components/portable-text";
import { AREA_LABELS } from "@/lib/types";
import type { CafeDetail } from "@/lib/types";

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

const VIBE_LABELS: Record<string, string> = {
  boho: "Boho",
  vintage: "Vintage",
  dark: "Dark",
  modern: "Modern",
  minimal: "Minimal",
  cozy: "Cozy",
  bright: "Bright",
  industrial: "Industrial",
  other: "Other",
};

const SEATING_LABELS: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  xl: "Extra Large",
};

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to directory
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {cafe.name}
          </h1>
          {cafe.personallyVisited && (
            <Badge className="bg-primary text-primary-foreground">
              Visited
            </Badge>
          )}
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {AREA_LABELS[cafe.area] || cafe.area}
          {cafe.address && <span> &middot; {cafe.address}</span>}
        </p>
      </div>

      {/* Cover image */}
      {cafe.coverImage?.asset && (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={urlFor(cafe.coverImage).width(1200).height(675).url()}
            alt={cafe.coverImage.alt || cafe.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      {/* Gallery */}
      {cafe.gallery && cafe.gallery.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {cafe.gallery.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={urlFor(img).width(400).height(400).url()}
                alt={img.alt || `${cafe.name} photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 300px"
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="space-y-6">
          {/* Description */}
          {cafe.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {cafe.description}
            </p>
          )}

          {/* Author review */}
          {cafe.authorReview && cafe.authorReview.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Our Review
              </h2>
              <PortableText value={cafe.authorReview} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Quick stats */}
          <div className="rounded-xl border border-border p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Details</h3>

            {cafe.externalRating && (
              <div className="flex items-center gap-2 text-sm">
                <Star className="size-4 fill-primary text-primary" />
                <span>
                  {cafe.externalRating.toFixed(1)}
                  {cafe.externalReviewCount && (
                    <span className="text-muted-foreground">
                      {" "}
                      ({cafe.externalReviewCount} reviews)
                    </span>
                  )}
                </span>
              </div>
            )}

            {cafe.priceRange && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{cafe.priceRange}</span>
                <span className="text-muted-foreground">Price range</span>
              </div>
            )}

            {cafe.wifiQuality && (
              <div className="flex items-center gap-2 text-sm">
                <Wifi className="size-4 text-muted-foreground" />
                <span>
                  Wi-Fi:{" "}
                  {cafe.wifiQuality.charAt(0).toUpperCase() +
                    cafe.wifiQuality.slice(1)}
                </span>
              </div>
            )}

            {cafe.noiseLevel && (
              <div className="flex items-center gap-2 text-sm">
                <Volume2 className="size-4 text-muted-foreground" />
                <span>
                  Noise:{" "}
                  {cafe.noiseLevel.charAt(0).toUpperCase() +
                    cafe.noiseLevel.slice(1)}
                </span>
              </div>
            )}

            {cafe.studyFriendly && (
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="size-4 text-muted-foreground" />
                <span>
                  Study-friendly:{" "}
                  {cafe.studyFriendly.charAt(0).toUpperCase() +
                    cafe.studyFriendly.slice(1)}
                </span>
              </div>
            )}

            {cafe.seatingSize && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Seating: {SEATING_LABELS[cafe.seatingSize] || cafe.seatingSize}
              </div>
            )}
          </div>

          {/* Vibes */}
          {cafe.vibe && cafe.vibe.length > 0 && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                Vibe
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cafe.vibe.map((v) => (
                  <Badge key={v} variant="outline">
                    {VIBE_LABELS[v] || v}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Specialties */}
          {cafe.specialties && cafe.specialties.length > 0 && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                Specialties
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cafe.specialties.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Hours */}
          {cafe.hours && cafe.hours.length > 0 && (
            <div className="rounded-xl border border-border p-4">
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Clock className="size-3.5" />
                Hours
              </h3>
              <dl className="space-y-1 text-sm">
                {cafe.hours.map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <dt className="capitalize text-muted-foreground">
                      {h.day}
                    </dt>
                    <dd>
                      {h.isClosed
                        ? "Closed"
                        : `${h.openTime || "?"} – ${h.closeTime || "?"}`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col gap-2">
            {cafe.googleMapsLink && (
              <Button variant="outline" size="lg" render={<a href={cafe.googleMapsLink} target="_blank" rel="noopener noreferrer" />}>
                <MapPin className="size-4" />
                Directions
                <ExternalLink className="size-3" />
              </Button>
            )}
            {cafe.menuLink && (
              <Button variant="outline" size="lg" render={<a href={cafe.menuLink} target="_blank" rel="noopener noreferrer" />}>
                <UtensilsCrossed className="size-4" />
                Menu
                <ExternalLink className="size-3" />
              </Button>
            )}
            {cafe.instagramHandle && (
              <Button variant="outline" size="lg" render={<a href={`https://instagram.com/${cafe.instagramHandle}`} target="_blank" rel="noopener noreferrer" />}>
                <AtSign className="size-4" />
                @{cafe.instagramHandle}
                <ExternalLink className="size-3" />
              </Button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
