import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { NEIGHBORHOOD_LABELS } from "@/lib/types";
import type { CafeCard as CafeCardType } from "@/lib/types";

const PLACEHOLDERS = [1, 3, 4, 5, 6, 7, 8, 9];

function getPlaceholderSrc(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return `/img/placeholder-cafes/cover-placeholder-${PLACEHOLDERS[hash % PLACEHOLDERS.length]}.png`;
}

const TAG_LABELS: Record<string, string> = {
  boho: "Boho",
  vintage: "Vintage",
  dark: "Dark",
  modern: "Modern",
  minimal: "Minimal",
  cozy: "Cozy",
  bright: "Bright",
  industrial: "Industrial",
  other: "Other",
  coffee: "Specialty",
  matcha: "Matcha",
  tea: "Tea",
  pastries: "Pastries",
  brunch: "Brunch",
};

export function CafeCard({ cafe }: { cafe: CafeCardType }) {
  // Build tags from vibes, specialties, and attributes
  const tags: string[] = [];
  if (cafe.studyFriendly === "yes") tags.push("Study-Friendly");
  if (cafe.lateNightFriendly && cafe.lateNightFriendly !== "no")
    tags.push("Late Night");
  if (cafe.specialties) {
    for (const s of cafe.specialties) {
      if (TAG_LABELS[s]) tags.push(TAG_LABELS[s]);
    }
  }
  if (cafe.vibe) {
    for (const v of cafe.vibe) {
      if (TAG_LABELS[v]) tags.push(TAG_LABELS[v]);
    }
  }
  // Deduplicate and limit to 2
  const displayTags = [...new Set(tags)].slice(0, 2);

  return (
    <Link href={`/cafes/${cafe.slug.current}`} className="group block">
      <div className="h-full overflow-hidden rounded-2xl border-4 border-[#252525] bg-white shadow-[4px_4px_0px_0px_#252525] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
        {/* Cover image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5E6D8]">
          <Image
            src={cafe.coverImage?.asset ? urlFor(cafe.coverImage).width(600).height(450).url() : getPlaceholderSrc(cafe._id)}
            alt={cafe.coverImage?.alt || cafe.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="space-y-2 px-4 py-4">
          <div>
            <h3 className="font-semibold leading-tight text-foreground">
              {cafe.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {cafe.neighborhood ? NEIGHBORHOOD_LABELS[cafe.neighborhood] : cafe.area}
            </p>
          </div>

          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-[#FAF5F0] px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Rating */}
          {cafe.externalRating && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Star className="size-3 fill-foreground text-foreground" />
              <span>{cafe.externalRating.toFixed(1)}</span>
              {cafe.externalReviewCount && (
                <>
                  <span>·</span>
                  <span>{cafe.externalReviewCount} reviews</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
