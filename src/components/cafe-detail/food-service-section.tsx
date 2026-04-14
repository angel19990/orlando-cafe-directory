import Image from "next/image";
import { Star, Check, Leaf, Sun } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/portable-text";
import type { CafeDetail } from "@/lib/types";

const UNIQUENESS_LABELS: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const UNIQUENESS_FILL: Record<string, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

const UNIQUE_TAG_LABELS: Record<string, string> = {
  "unique-menu": "Unique Menu",
  "house-specialties": "House Specialties",
  "signature-drinks": "Signature Drinks",
  "local-ingredients": "Local Ingredients",
};

const DIETARY_DISPLAY: Record<string, { label: string; color: string; icon: "leaf" | "check" | "sun" }> = {
  "vegan-friendly": { label: "Vegan-Friendly", color: "text-green-700 bg-green-100", icon: "check" },
  "vegetarian-friendly": { label: "Vegetarian-Friendly", color: "text-green-700 bg-green-100", icon: "leaf" },
  "dairy-free": { label: "Dairy-Free", color: "text-amber-700 bg-amber-100", icon: "sun" },
};

// ── Star Rating ──

function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-[#252525]/80">{label}</span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`size-4 ${
                i <= Math.round(rating)
                  ? "fill-[#3D1A08] text-[#3D1A08]"
                  : "fill-[#E8DDD2] text-[#E8DDD2]"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-[#3D1A08]">
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

// ── Food Quality Card ──

function FoodQualityCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.foodQualityRating && !cafe.foodPresentationRating && !cafe.priceRange)
    return null;

  return (
    <div className="rounded-[20px] bg-[#FFF8F0] p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Food Quality
      </h3>
      <div className="mt-4 space-y-3">
        {cafe.foodQualityRating != null && (
          <StarRating rating={cafe.foodQualityRating} label="Quality" />
        )}
        {cafe.foodPresentationRating != null && (
          <StarRating rating={cafe.foodPresentationRating} label="Presentation" />
        )}
        {cafe.priceRange && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#252525]/80">Cost</span>
            <span className="text-lg font-bold text-[#3D1A08]">
              {cafe.priceRange}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Uniqueness Card ──

function UniquenessCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.uniquenessRating && (!cafe.uniqueTags || cafe.uniqueTags.length === 0))
    return null;

  const filled = UNIQUENESS_FILL[cafe.uniquenessRating || ""] ?? 0;

  return (
    <div className="rounded-[20px] bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        What Makes It Special
      </h3>
      {cafe.uniquenessRating && (
        <>
          <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
            {UNIQUENESS_LABELS[cafe.uniquenessRating] || cafe.uniquenessRating}
          </p>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className="h-5 flex-1 rounded-sm"
                style={{
                  backgroundColor: level <= filled ? "#3D1A08" : "#E8DDD2",
                }}
              />
            ))}
          </div>
        </>
      )}
      {cafe.uniqueTags && cafe.uniqueTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cafe.uniqueTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-[#FAF5F0] px-2.5 py-0.5 text-[11px] font-medium text-foreground"
            >
              {UNIQUE_TAG_LABELS[tag] || tag}
            </span>
          ))}
        </div>
      )}
      {cafe.specialtyNote && (
        <p className="mt-4 text-sm text-[#252525]/80">{cafe.specialtyNote}</p>
      )}
    </div>
  );
}

// ── Favorites Row (inline drinks) ──

function FavoritesRow({ cafe }: { cafe: CafeDetail }) {
  const drinks = cafe.favoriteDrinks ?? [];
  if (drinks.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="mb-6 text-xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        Our Favorites
      </h3>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
        {drinks.slice(0, 5).map((drink, i) => {
          const label = drink.alt || "Favorite Drink";
          const rotation =
            i % 2 === 0 ? "rotate-[1deg]" : "-rotate-[0.5deg]";

          return (
            <div
              key={i}
              className={`flex-none rounded-2xl bg-white p-3 pb-4 shadow-sm ${rotation}`}
            >
              <div className="relative aspect-square w-52 overflow-hidden rounded-xl bg-[#FCEEE3]">
                {drink.asset && (
                  <Image
                    src={urlFor(drink).width(400).height(400).url()}
                    alt={label}
                    fill
                    className="object-cover"
                    sizes="208px"
                  />
                )}
              </div>
              <p className="mt-3 text-sm font-semibold text-[#3D1A08]">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Dietary Tags Icon ──

function DietaryIcon({ icon }: { icon: "leaf" | "check" | "sun" }) {
  switch (icon) {
    case "leaf":
      return <Leaf className="size-3.5" />;
    case "sun":
      return <Sun className="size-3.5" />;
    case "check":
      return <Check className="size-3.5" />;
  }
}

// ── Main export ──

export function FoodServiceSection({ cafe }: { cafe: CafeDetail }) {
  const hasFood = cafe.foodQualityRating != null || cafe.foodPresentationRating != null || !!cafe.priceRange;
  const hasUniqueness = !!cafe.uniquenessRating || (cafe.uniqueTags && cafe.uniqueTags.length > 0);
  const hasDrinks = cafe.favoriteDrinks && cafe.favoriteDrinks.length > 0;
  const hasReview = cafe.authorReview && cafe.authorReview.length > 0;
  const hasDietary = cafe.dietaryTags && cafe.dietaryTags.length > 0;

  if (!hasFood && !hasUniqueness && !hasDrinks && !hasReview && !hasDietary)
    return null;

  return (
    <section className="content-container py-12">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        Food & Service
      </h2>

      {/* Top cards */}
      {(hasFood || hasUniqueness) && (
        <div className="grid gap-6 md:grid-cols-2">
          <FoodQualityCard cafe={cafe} />
          <UniquenessCard cafe={cafe} />
        </div>
      )}

      {/* Favorites */}
      <FavoritesRow cafe={cafe} />

      {/* Author review */}
      {hasReview && (
        <div className="mt-12 rounded-[20px] bg-[#FFF8F0] p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
            Our Review
          </h3>
          <PortableText value={cafe.authorReview!} />
        </div>
      )}

      {/* Dietary tags */}
      {hasDietary && (
        <div className="mt-8 flex flex-wrap gap-3">
          {cafe.dietaryTags!.map((tag) => {
            const display = DIETARY_DISPLAY[tag] || {
              label: tag,
              color: "text-foreground bg-[#FCEEE3]",
              icon: "check" as const,
            };
            return (
              <span
                key={tag}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-medium ${display.color}`}
              >
                <DietaryIcon icon={display.icon} />
                {display.label}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
