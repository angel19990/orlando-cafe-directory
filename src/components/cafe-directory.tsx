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
      if (filters.area && cafe.area !== filters.area) return false;
      if (filters.vibe && !(cafe.vibe || []).includes(filters.vibe))
        return false;
      if (
        filters.specialty &&
        !(cafe.specialties || []).includes(filters.specialty)
      )
        return false;
      if (filters.studyFriendly && cafe.studyFriendly !== "yes") return false;
      if (filters.goodWifi && cafe.wifiQuality !== "good") return false;
      return true;
    });
  }, [cafes, filters]);

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "cafe" : "cafes"} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
