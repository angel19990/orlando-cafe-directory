import { CafeCard } from "@/components/cafe-card";
import { AREA_LABELS } from "@/lib/types";
import type { CafeCard as CafeCardType, Area } from "@/lib/types";

export function MoreCafes({
  cafes,
  area,
}: {
  cafes: CafeCardType[];
  area: Area;
}) {
  if (!cafes.length) return null;

  return (
    <section className="content-container py-12">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        More in {AREA_LABELS[area] || area}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cafes.map((cafe) => (
          <CafeCard key={cafe._id} cafe={cafe} />
        ))}
      </div>
    </section>
  );
}
