import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { CafeDetail } from "@/lib/types";

export function DrinksRow({ cafe }: { cafe: CafeDetail }) {
  const drinks = cafe.favoriteDrinks ?? [];
  if (drinks.length === 0) return null;

  return (
    <section className="content-container py-12">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#B5450F]">
        Our Favorites
      </h2>

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
              <p className="mt-3 text-sm font-semibold text-[#B5450F]">
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
