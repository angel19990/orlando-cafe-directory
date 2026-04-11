import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { CafeDetail } from "@/lib/types";

export function GalleryGrid({ cafe }: { cafe: CafeDetail }) {
  const images = cafe.gallery ?? [];
  if (images.length < 3) return null;

  // Use up to 5 images for the grid
  const gridImages = images.slice(0, 5);

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-20">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D0C11]">
        Gallery
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Large featured image — spans 2 cols and 2 rows */}
        <div className="col-span-2 row-span-2 relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#FCEEE3]">
          {gridImages[0]?.asset && (
            <Image
              src={urlFor(gridImages[0]).width(800).height(600).url()}
              alt={gridImages[0].alt || `${cafe.name} gallery`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        {/* Smaller images fill remaining slots */}
        {gridImages.slice(1).map((img, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-[20px] bg-[#FCEEE3]"
          >
            {img.asset && (
              <Image
                src={urlFor(img).width(400).height(400).url()}
                alt={img.alt || `${cafe.name} gallery ${i + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
