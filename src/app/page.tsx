import { client } from "@/lib/sanity/client";
import { allCafesQuery } from "@/lib/sanity/queries";
import { CafeDirectory } from "@/components/cafe-directory";
import type { CafeCard } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const cafes = await client.fetch<CafeCard[]>(allCafesQuery);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero */}
      <section className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Orlando Cafe Directory
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
          Discover the best cafes across Central Florida. Every spot personally
          visited and honestly reviewed — find your next favorite place to work,
          study, or unwind.
        </p>
      </section>

      {/* Directory */}
      <CafeDirectory cafes={cafes} />
    </div>
  );
}
