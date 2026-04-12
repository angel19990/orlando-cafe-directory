import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { CafeDetail } from "@/lib/types";

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

export function VibeSection({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.vibe || cafe.vibe.length === 0) return null;

  const vibePhoto = cafe.gallery?.[0] ?? cafe.coverImage;

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#B5450F]">
        The Vibe
      </h2>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Interior photo — 65% */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#FCEEE3] md:w-[65%]">
          {vibePhoto?.asset && (
            <Image
              src={urlFor(vibePhoto).width(900).height(675).url()}
              alt={vibePhoto.alt || `${cafe.name} interior`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 65vw"
            />
          )}
        </div>

        {/* Info card — 35% */}
        <div className="flex flex-col justify-between rounded-[20px] bg-[#FFF8F0] p-8 md:w-[35%]">
          <div>
            <p className="text-lg leading-relaxed text-[#252525]/80">
              {cafe.description ||
                `${cafe.name} brings a ${cafe.vibe.map((v) => VIBE_LABELS[v] || v).join(" & ").toLowerCase()} feel to the neighborhood.`}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {cafe.vibe.map((v) => (
              <span
                key={v}
                className="rounded-full bg-[#FCEEE3] px-3 py-1 text-sm font-medium text-[#B5450F]"
              >
                {VIBE_LABELS[v] || v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
