import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Wifi, Volume2, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";
import { AREA_LABELS } from "@/lib/types";
import type { CafeCard as CafeCardType } from "@/lib/types";

const VIBE_LABELS: Record<string, string> = {
  boho: "Boho",
  vintage: "Vintage",
  dark: "Dark",
  modern: "Modern",
  minimal: "Minimal",
  cozy: "Cozy",
  bright: "Bright",
  industrial: "Industrial",
  other: "Other",
};

export function CafeCard({ cafe }: { cafe: CafeCardType }) {
  return (
    <Link href={`/cafes/${cafe.slug.current}`} className="group block">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        {/* Cover image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {cafe.coverImage?.asset ? (
            <Image
              src={urlFor(cafe.coverImage).width(600).height(450).url()}
              alt={cafe.coverImage.alt || cafe.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-3xl">☕</span>
            </div>
          )}
          {cafe.personallyVisited && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Visited
            </Badge>
          )}
          {cafe.priceRange && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm"
            >
              {cafe.priceRange}
            </Badge>
          )}
        </div>

        <CardContent className="space-y-2">
          {/* Name & area */}
          <div>
            <h3 className="font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
              {cafe.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {AREA_LABELS[cafe.area] || cafe.area}
            </p>
          </div>

          {/* Description */}
          {cafe.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
              {cafe.description}
            </p>
          )}

          {/* Attributes row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {cafe.externalRating && (
              <span className="flex items-center gap-0.5">
                <Star className="size-3 fill-primary text-primary" />
                {cafe.externalRating.toFixed(1)}
              </span>
            )}
            {cafe.wifiQuality === "good" && (
              <span className="flex items-center gap-0.5">
                <Wifi className="size-3" />
                Good Wi-Fi
              </span>
            )}
            {cafe.noiseLevel && (
              <span className="flex items-center gap-0.5">
                <Volume2 className="size-3" />
                {cafe.noiseLevel.charAt(0).toUpperCase() +
                  cafe.noiseLevel.slice(1)}
              </span>
            )}
            {cafe.studyFriendly === "yes" && (
              <span className="flex items-center gap-0.5">
                <BookOpen className="size-3" />
                Study-friendly
              </span>
            )}
          </div>

          {/* Vibes */}
          {cafe.vibe && cafe.vibe.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {cafe.vibe.slice(0, 3).map((v) => (
                <Badge key={v} variant="outline" className="text-[10px] px-1.5 py-0">
                  {VIBE_LABELS[v] || v}
                </Badge>
              ))}
              {cafe.vibe.length > 3 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  +{cafe.vibe.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
