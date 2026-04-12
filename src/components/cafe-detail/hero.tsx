import Image from "next/image";
import Link from "next/link";
import { AtSign } from "lucide-react";
import { urlFor } from "@/lib/sanity/image";
import { AREA_LABELS } from "@/lib/types";
import type { CafeDetail } from "@/lib/types";

export function CafeHero({ cafe }: { cafe: CafeDetail }) {
  return (
    <section>
      {/* Breadcrumb */}
      <nav className="content-container py-4 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/area/${cafe.area}`} className="hover:text-foreground">
          {AREA_LABELS[cafe.area] || cafe.area}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{cafe.name}</span>
      </nav>

      {/* Hero image */}
      <div className="content-container relative overflow-hidden rounded-[20px]">
        <div className="relative aspect-[3/4] w-full bg-[#FCEEE3] sm:aspect-[16/7]">
          {cafe.coverImage?.asset && (
            <Image
              src={urlFor(cafe.coverImage).width(1400).height(612).url()}
              alt={cafe.coverImage.alt || cafe.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/70 via-[#252525]/20 to-transparent" />

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-heading)] md:text-5xl">
              {cafe.name}
            </h1>

            {/* Address + Instagram */}
            <div className="mt-2 flex items-center gap-4">
              {cafe.address && (
                <a
                  href={cafe.googleMapsLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-white/90 underline-offset-2 hover:underline"
                >
                  {cafe.address}
                </a>
              )}
              {cafe.instagramHandle && (
                <a
                  href={`https://instagram.com/${cafe.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-7 items-center justify-center rounded-full bg-white"
                >
                  <AtSign className="size-4 text-[#252525]" />
                </a>
              )}
            </div>

            {/* Rating pills */}
            <div className="mt-4 flex gap-3">
              {cafe.externalRating && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#252525]">
                  ★ {cafe.externalRating.toFixed(1)} Google
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
