"use client";

import { useState, useMemo } from "react";
import { FilterBar, INITIAL_FILTERS, type Filters } from "@/components/filter-bar";
import { CafeCard } from "@/components/cafe-card";
import type { CafeCard as CafeCardType } from "@/lib/types";

const CAFES_PER_PAGE = 12;

export function CafeDirectory({ cafes, initialSearch = "" }: { cafes: CafeCardType[]; initialSearch?: string }) {
  const [filters, setFilters] = useState<Filters>({ ...INITIAL_FILTERS, search: initialSearch });
  const [currentPage, setCurrentPage] = useState(1);

  function handleFilterChange(newFilters: Filters) {
    setFilters(newFilters);
    setCurrentPage(1);
  }

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
        case "coffee":
          return (cafe.specialties || []).includes("coffee");
        case "matcha":
          return (cafe.specialties || []).includes("matcha");
        case "tea":
          return (cafe.specialties || []).includes("tea");
        case "pastries":
          return (cafe.specialties || []).includes("pastries");
        case "study":
          return cafe.studyFriendly === "yes";
        case "wifi":
          return cafe.wifiQuality === "good";
        case "outlets":
          return cafe.hasOutlets === true;
        case "latenight":
          return cafe.lateNightFriendly !== "no" && !!cafe.lateNightFriendly;
        case "pet":
          return cafe.petFriendly === true;
        default:
          return true;
      }
    });
  }, [cafes, filters]);

  const totalPages = Math.ceil(filtered.length / CAFES_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * CAFES_PER_PAGE,
    currentPage * CAFES_PER_PAGE
  );

  return (
    <div>
      <FilterBar filters={filters} onChange={handleFilterChange} />

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
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((cafe) => (
                <CafeCard key={cafe._id} cafe={cafe} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === currentPage
                        ? "rounded-full border border-foreground bg-foreground px-4 py-1.5 text-sm font-medium text-white"
                        : "rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
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
