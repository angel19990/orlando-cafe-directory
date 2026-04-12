"use client";

import { useState, useMemo } from "react";
import { FilterBar, INITIAL_FILTERS, type Filters } from "@/components/filter-bar";
import { CafeCard } from "@/components/cafe-card";
import type { CafeCard as CafeCardType } from "@/lib/types";

export function CafeDirectory({ cafes }: { cafes: CafeCardType[] }) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filtered = useMemo(() => {
    return cafes.filter((cafe) => {
      if (
        filters.search &&
        !cafe.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !(cafe.description || "")
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      const f = filters.activeFilter;
      if (!f) return true;

      switch (f) {
        case "cozy":
          return (cafe.vibe || []).includes("cozy");
        case "coffee":
          return (cafe.specialties || []).includes("coffee");
        case "study":
          return cafe.studyFriendly === "yes";
        case "outdoor":
          return (cafe.vibe || []).includes("bright");
        case "brunch":
          return (cafe.specialties || []).includes("brunch");
        case "latenight":
          return cafe.lateNightFriendly !== "no" && !!cafe.lateNightFriendly;
        case "pet":
          return (cafe.vibe || []).includes("boho");
        default:
          return true;
      }
    });
  }, [cafes, filters]);

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Grid section */}
      <div className="content-container pt-10 pb-15">
        {/* Results header */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} cafes
          </p>
          <p className="text-sm text-muted-foreground">
            Sort by: <span className="font-medium text-foreground">Recommended</span>
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cafe) => (
              <CafeCard key={cafe._id} cafe={cafe} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-3xl">☕</p>
            <p className="mt-2 text-sm font-medium text-foreground">
              No cafes match your filters
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or clearing some filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
