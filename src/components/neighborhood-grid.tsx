import Link from "next/link";
import Image from "next/image";
import type { CafeCard } from "@/lib/types";
import type { Area } from "@/lib/types";

const NEIGHBORHOODS: { area: Area; label: string; image?: string }[] = [
  { area: "orlando", label: "Central Orlando", image: "/img/areas/central-orlando.png" },
  { area: "winter-park", label: "Winter Park", image: "/img/areas/winter-park.png" },
  { area: "south-orlando", label: "South Orlando", image: "/img/areas/south-orlando.png" },
  { area: "east-orlando", label: "East Orlando", image: "/img/areas/east-orlando.png" },
  { area: "west-orlando", label: "West Orlando", image: "/img/areas/west-orlando.png" },
  { area: "north-orlando", label: "North Orlando", image: "/img/areas/north-orlando.png" },
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
    <section className="bg-[#FFF8F0] py-15">
      <div className="content-container">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Browse by Neighborhood
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBORHOODS.map(({ area, label, image }) => (
            <Link
              key={area}
              href={`/area/${area}`}
              className="group overflow-hidden rounded-2xl border-2 border-[#252525] bg-white shadow-[4px_4px_0px_0px_#252525] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5E6D8]">
                {image && (
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>
              {/* Label bar */}
              <div className="bg-[#3D1A08] px-4 py-3">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/70">
                  {counts[area] || 0} cafes
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
