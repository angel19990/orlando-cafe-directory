import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@/components/portable-text";
import type { CafeDetail } from "@/lib/types";

const SEATING_LABELS: Record<string, string> = {
  small: "Intimate & cozy — a handful of tables",
  medium: "Comfortable room — plenty of seating",
  large: "Spacious — room for groups & solo workers",
  xl: "Extra large — never hard to find a seat",
};

const SEATING_TYPE_LABELS: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  xl: "Extra Large",
};

// ── OUR TAKE — full-width sticky-note card ──

function OurTakeCard({ cafe }: { cafe: CafeDetail }) {
  const hasReview = cafe.authorReview && cafe.authorReview.length > 0;
  if (!hasReview && !cafe.description) return null;

  return (
    <div className="relative rounded-[20px] bg-[#FFF8F0] p-8 -rotate-[0.8deg]">
      {/* Yellow pin dot */}
      <div className="absolute right-6 top-4 size-3 rounded-full bg-[#F5D060]" />
      <h3 className="mb-3 text-lg font-semibold font-[family-name:var(--font-heading)] text-[#3D0C11]">
        Our Take
      </h3>
      {hasReview ? (
        <div className="line-clamp-4">
          <PortableText value={cafe.authorReview!} />
        </div>
      ) : (
        <p className="line-clamp-3 text-sm text-[#252525]/80">
          {cafe.description}
        </p>
      )}
    </div>
  );
}

// ── NOISE LEVEL — visual sound bars ──

function NoiseLevelCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.noiseLevel) return null;

  const fillMap: Record<string, number> = { quiet: 3, moderate: 5, loud: 7 };
  const fillCount = fillMap[cafe.noiseLevel] ?? 3;
  const label =
    cafe.noiseLevel.charAt(0).toUpperCase() + cafe.noiseLevel.slice(1);
  const barHeights = [16, 24, 20, 32, 28, 36, 24];

  return (
    <div className="flex flex-col justify-between rounded-[20px] bg-white p-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
          Noise Level
        </h3>
        <p className="mt-1 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D0C11]">
          {label}
        </p>
      </div>
      <div className="mt-6 flex items-end gap-1.5">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-3 rounded-sm"
            style={{
              height: h,
              backgroundColor: i < fillCount ? "#3D0C11" : "#E8DDD2",
            }}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-[#252525]/60">
          {fillCount}/7
        </span>
      </div>
    </div>
  );
}

// ── WORK SETUP — image + badge chips ──

function WorkSetupCard({ cafe }: { cafe: CafeDetail }) {
  const badges: string[] = [];
  if (cafe.wifiQuality === "good") badges.push("✓ Fast WiFi");
  else if (cafe.wifiQuality === "okay") badges.push("✓ WiFi");
  if (cafe.studyFriendly === "yes") badges.push("✓ Study-Friendly");
  if (cafe.seatingSize === "large" || cafe.seatingSize === "xl")
    badges.push("✓ Large Tables");
  if (badges.length === 0) badges.push("✓ Outlets");

  const workPhoto = cafe.gallery?.[0];

  return (
    <div className="overflow-hidden rounded-[20px] bg-white">
      {/* Photo */}
      <div className="relative aspect-[16/9] w-full bg-[#FCEEE3]">
        {workPhoto?.asset && (
          <Image
            src={urlFor(workPhoto).width(600).height(338).url()}
            alt={workPhoto.alt || `${cafe.name} interior`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      {/* Badges */}
      <div className="p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
          Work Setup
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-lg bg-[#FCEEE3] px-3 py-1 text-sm font-medium text-[#3D0C11]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── HOURS — closing time focus ──

function HoursCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.hours || cafe.hours.length === 0) return null;

  const todayName = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const todayHours = cafe.hours.find((h) => h.day === todayName);

  let statusText = "Hours unavailable";
  let isOpen = false;
  let closingTime = "";

  if (todayHours) {
    if (todayHours.isClosed) {
      statusText = "Closed Today";
    } else if (todayHours.closeTime) {
      closingTime = todayHours.closeTime;
      isOpen = true;
      statusText = `Closes at ${closingTime}`;
    }
  }

  return (
    <div className="flex flex-col justify-between rounded-[20px] bg-white p-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
          Hours
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`inline-block size-2.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-400"}`}
          />
          <span className="text-sm font-semibold">
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D0C11]">
        {statusText}
      </p>
      {cafe.lateNightFriendly && cafe.lateNightFriendly !== "no" && (
        <span className="mt-3 inline-flex w-fit rounded-lg bg-[#FCEEE3] px-3 py-1 text-sm font-medium text-[#3D0C11]">
          🌙 Open Late
        </span>
      )}
    </div>
  );
}

// ── SEATING — description + type badges ──

function SeatingCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.seatingSize) return null;

  const description = SEATING_LABELS[cafe.seatingSize] || "Comfortable seating";
  const sizeLabel = SEATING_TYPE_LABELS[cafe.seatingSize] || cafe.seatingSize;

  return (
    <div className="flex flex-col justify-between rounded-[20px] bg-[#FCEEE3] p-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
          Seating
        </h3>
        <p className="mt-2 text-base text-[#252525]/80">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-lg bg-white px-3 py-1 text-sm font-medium text-[#3D0C11]">
          {sizeLabel}
        </span>
        <span className="rounded-lg bg-white px-3 py-1 text-sm font-medium text-[#3D0C11]">
          Indoor
        </span>
      </div>
    </div>
  );
}

// ── Main export ──

export function BentoGrid({ cafe }: { cafe: CafeDetail }) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D0C11]">
        At a Glance
      </h2>

      {/* Our Take — full width */}
      <OurTakeCard cafe={cafe} />

      {/* 2-column grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <NoiseLevelCard cafe={cafe} />
        <WorkSetupCard cafe={cafe} />
        <HoursCard cafe={cafe} />
        <SeatingCard cafe={cafe} />
      </div>
    </section>
  );
}
