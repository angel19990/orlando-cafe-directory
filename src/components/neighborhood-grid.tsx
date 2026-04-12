import Link from "next/link";
import type { CafeCard } from "@/lib/types";
import type { Area } from "@/lib/types";

const NEIGHBORHOODS: { area: Area; label: string }[] = [
  { area: "orlando", label: "Central Orlando" },
  { area: "winter-park", label: "Winter Park" },
  { area: "south-orlando", label: "South Orlando" },
  { area: "east-orlando", label: "East Orlando" },
  { area: "west-orlando", label: "West Orlando" },
  { area: "north-orlando", label: "North Orlando" },
];

export function NeighborhoodGrid({ cafes }: { cafes: CafeCard[] }) {
  const counts = cafes.reduce(
    (acc, cafe) => {
      acc[cafe.area] = (acc[cafe.area] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <section className="bg-[#FFF8F0] px-6 py-15 md:px-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Browse by Neighborhood
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {NEIGHBORHOODS.map(({ area, label }) => (
          <Link
            key={area}
            href={`/area/${area}`}
            className="group overflow-hidden rounded-2xl border-2 border-[#252525] bg-white shadow-[4px_4px_0px_0px_#000000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            {/* Placeholder image area */}
            <div className="aspect-[4/3] w-full bg-[#F5E6D8]" />
            {/* Label bar */}
            <div className="bg-[#3D0C11] px-4 py-3">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-white/70">
                {counts[area] || 0} cafes
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
