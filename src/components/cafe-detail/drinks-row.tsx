import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { CafeDetail } from "@/lib/types";

const FALLBACK_LABELS = [
  "House Special",
  "Signature Drink",
  "Fan Favorite",
  "Barista Pick",
  "Seasonal Blend",
];

export function DrinksRow({ cafe }: { cafe: CafeDetail }) {
  // Skip the first gallery image (used by vibe section)
  const images = cafe.gallery?.slice(1) ?? [];
  if (images.length < 2) return null;

  const specialties = cafe.specialties ?? [];

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D0C11]">
        Our Favorites
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
        {images.slice(0, 5).map((img, i) => {
          const label =
            specialties[i] ??
            FALLBACK_LABELS[i % FALLBACK_LABELS.length];
          const rotation =
            i % 2 === 0 ? "rotate-[1deg]" : "-rotate-[0.5deg]";

          return (
            <div
              key={i}
              className={`flex-none rounded-2xl bg-white p-3 pb-4 shadow-sm ${rotation}`}
            >
              <div className="relative aspect-square w-52 overflow-hidden rounded-xl bg-[#FCEEE3]">
                {img.asset && (
                  <Image
                    src={urlFor(img).width(400).height(400).url()}
                    alt={img.alt || `${cafe.name} — ${label}`}
                    fill
                    className="object-cover"
                    sizes="208px"
                  />
                )}
              </div>
              <p className="mt-3 text-sm font-semibold text-[#3D0C11]">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
