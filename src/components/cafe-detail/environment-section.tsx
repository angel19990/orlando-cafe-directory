import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { Check } from "lucide-react";
import type { CafeDetail } from "@/lib/types";

const VIBE_LABELS: Record<string, string> = {
  relaxing: "Relaxing",
  cozy: "Cozy",
  fancy: "Fancy",
  chic: "Chic",
  modern: "Modern",
  retro: "Retro",
  // Legacy
  boho: "Boho",
  vintage: "Vintage",
  dark: "Dark",
  minimal: "Minimal",
  bright: "Bright",
  industrial: "Industrial",
  other: "Other",
};

const PARKING_LABELS: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const NOISE_LABELS: Record<string, string> = {
  quiet: "Quiet",
  moderate: "Moderate",
  loud: "Loud",
};

const NOISE_FILL: Record<string, number> = {
  quiet: 1,
  moderate: 2,
  loud: 3,
};

const PARKING_FILL: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const AREA_TAG_LABELS: Record<string, string> = {
  shopping: "Shopping",
  "other-restaurants": "Other Restaurants",
  parks: "Parks",
};

// ── Gallery ──

function EnvironmentGallery({ cafe }: { cafe: CafeDetail }) {
  const images = cafe.gallery ?? [];
  if (images.length === 0) return null;

  const captions = ["Interior", "Exterior", "The Area"];

  return (
    <div className="-mx-6 md:-mx-12">
      <div className="flex gap-4 overflow-x-auto px-6 pb-2 md:px-12 scroll-pl-6 md:scroll-pl-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {images.slice(0, 3).map((img, i) => (
          <div key={i} className="w-[75vw] shrink-0 sm:w-[40vw] md:w-[30vw] snap-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#FCEEE3]">
              {img.asset && (
                <Image
                  src={urlFor(img).width(500).height(375).url()}
                  alt={img.alt || `${cafe.name} ${captions[i]?.toLowerCase()}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 30vw"
                />
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {captions[i]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Overall Feeling ──

function AmbienceCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.ambienceNote && (!cafe.vibe || cafe.vibe.length === 0)) return null;

  return (
    <div className="rounded-[20px] bg-[#FFF8F0] p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Overall Feeling
      </h3>
      {cafe.ambienceNote && (
        <p className="mt-3 text-base text-[#252525]/80">
          {cafe.ambienceNote}
        </p>
      )}
      {cafe.vibe && cafe.vibe.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cafe.vibe.map((v) => (
            <span
              key={v}
              className="rounded-full bg-[#FCEEE3] px-3 py-1 text-sm font-medium text-[#3D1A08]"
            >
              {VIBE_LABELS[v] || v}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── The Area ──

function AreaCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.areaNote && !cafe.areaWalkable && (!cafe.areaTags || cafe.areaTags.length === 0))
    return null;

  return (
    <div className="rounded-[20px] bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        The Area
      </h3>
      {cafe.areaWalkable && (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          <Check className="size-3.5" />
          Walkable Area
        </span>
      )}
      {cafe.areaNote && (
        <p className="mt-3 text-base text-[#252525]/80">{cafe.areaNote}</p>
      )}
      {cafe.areaTags && cafe.areaTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {cafe.areaTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-[#FAF5F0] px-2.5 py-0.5 text-[11px] font-medium text-foreground"
            >
              {AREA_TAG_LABELS[tag] || tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Parking ──

function ParkingCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.parkingAccess) return null;

  const filled = PARKING_FILL[cafe.parkingAccess] ?? 0;

  return (
    <div className="rounded-[20px] bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Parking
      </h3>
      <div className="mt-4 flex items-center gap-4">
        {[1, 2, 3].map((level) => (
          <div key={level} className="flex flex-col items-center gap-1.5">
            <div
              className="size-8 rounded-full"
              style={{
                backgroundColor: level <= filled ? "#3D1A08" : "#E8DDD2",
              }}
            />
            <span className={`text-xs font-medium ${level <= filled ? "text-[#3D1A08]" : "text-[#252525]/40"}`}>
              {["Easy", "Medium", "Hard"][level - 1]}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        {PARKING_LABELS[cafe.parkingAccess]}
      </p>
      {cafe.parkingNote && (
        <p className="mt-2 text-sm text-[#252525]/80">{cafe.parkingNote}</p>
      )}
    </div>
  );
}

// ── Noise Level ──

function NoiseLevelCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.noiseLevel) return null;

  const filled = NOISE_FILL[cafe.noiseLevel] ?? 0;

  return (
    <div className="rounded-[20px] bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Noise Level
      </h3>
      <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        {NOISE_LABELS[cafe.noiseLevel] || cafe.noiseLevel}
      </p>
      <div className="mt-4 flex gap-2">
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
    </div>
  );
}

// ── Main export ──

export function EnvironmentSection({ cafe }: { cafe: CafeDetail }) {
  const hasGallery = cafe.gallery && cafe.gallery.length > 0;
  const hasAmbience = cafe.ambienceNote || (cafe.vibe && cafe.vibe.length > 0);
  const hasArea = cafe.areaNote || cafe.areaWalkable || (cafe.areaTags && cafe.areaTags.length > 0);
  const hasParking = !!cafe.parkingAccess;
  const hasNoise = !!cafe.noiseLevel;

  if (!hasGallery && !hasAmbience && !hasArea && !hasParking && !hasNoise) return null;

  return (
    <section className="content-container py-12">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        Environment
      </h2>

      <EnvironmentGallery cafe={cafe} />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <AmbienceCard cafe={cafe} />
        <AreaCard cafe={cafe} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ParkingCard cafe={cafe} />
        <NoiseLevelCard cafe={cafe} />
      </div>
    </section>
  );
}
