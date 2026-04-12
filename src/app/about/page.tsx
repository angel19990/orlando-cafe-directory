import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coffee, MapPin, Star, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about OrlandoCafes.com — your guide to the best cafes in Central Florida.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground font-[family-name:var(--font-heading)]">
        About OrlandoCafes
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          OrlandoCafes.com is a curated directory of the best cafes across
          Central Florida — from Downtown Orlando to Winter Park, Kissimmee,
          Winter Garden, and Dr. Phillips.
        </p>

        <p>
          Every cafe in our directory is personally visited and honestly
          reviewed. We care about the details that matter: Wi-Fi quality, noise
          level, whether it&apos;s good for studying, the vibe, and of course —
          the coffee.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 py-2">
          <div className="flex items-start gap-3 rounded-xl border border-border p-4">
            <Coffee className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Personally Visited
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We aim to visit every cafe after listing it. No paid placements,
                no sponsored content.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border p-4">
            <Star className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Honest Reviews
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Our reviews are editorial, not algorithmic. We tell you what we
                actually think.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border p-4">
            <MapPin className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Local Focus
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                We focus exclusively on Central Florida. This is our home and we
                know it well.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl border border-border p-4">
            <Send className="mt-0.5 size-5 text-primary" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Community Driven
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Know a great cafe we&apos;re missing? Submit it and we&apos;ll
                check it out.
              </p>
            </div>
          </div>
        </div>

        <p>
          Whether you&apos;re a remote worker looking for a reliable Wi-Fi spot,
          a student searching for a quiet study cafe, or just someone who
          appreciates a good latte in a beautiful space — we built this for you.
        </p>

        <div className="pt-2">
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-full bg-[#B5450F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#8E3408]"
          >
            Submit a Cafe
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
