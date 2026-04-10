"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { AREA_LABELS } from "@/lib/types";
import type { Area, Vibe } from "@/lib/types";

const AREAS = Object.entries(AREA_LABELS) as [Area, string][];

const VIBE_OPTIONS: { value: Vibe; label: string }[] = [
  { value: "cozy", label: "Cozy" },
  { value: "modern", label: "Modern" },
  { value: "bright", label: "Bright" },
  { value: "boho", label: "Boho" },
  { value: "vintage", label: "Vintage" },
  { value: "dark", label: "Dark" },
  { value: "minimal", label: "Minimal" },
  { value: "industrial", label: "Industrial" },
];

const SPECIALTY_OPTIONS = [
  { value: "coffee", label: "Coffee" },
  { value: "matcha", label: "Matcha" },
  { value: "tea", label: "Tea" },
  { value: "pastries", label: "Pastries" },
  { value: "brunch", label: "Brunch" },
];

export type Filters = {
  search: string;
  area: Area | "";
  vibe: Vibe | "";
  specialty: string;
  studyFriendly: boolean;
  goodWifi: boolean;
};

export const INITIAL_FILTERS: Filters = {
  search: "",
  area: "",
  vibe: "",
  specialty: "",
  studyFriendly: false,
  goodWifi: false,
};

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const activeCount = [
    filters.area,
    filters.vibe,
    filters.specialty,
    filters.studyFriendly,
    filters.goodWifi,
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search cafes..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-1.5">
        {/* Area */}
        {AREAS.map(([value, label]) => (
          <button
            key={value}
            onClick={() =>
              onChange({
                ...filters,
                area: filters.area === value ? "" : value,
              })
            }
            className="cursor-pointer"
          >
            <Badge variant={filters.area === value ? "default" : "outline"}>
              {label}
            </Badge>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {/* Vibes */}
        {VIBE_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() =>
              onChange({
                ...filters,
                vibe: filters.vibe === value ? "" : value,
              })
            }
            className="cursor-pointer"
          >
            <Badge variant={filters.vibe === value ? "default" : "outline"}>
              {label}
            </Badge>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {/* Specialties */}
        {SPECIALTY_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() =>
              onChange({
                ...filters,
                specialty: filters.specialty === value ? "" : value,
              })
            }
            className="cursor-pointer"
          >
            <Badge
              variant={filters.specialty === value ? "default" : "outline"}
            >
              {label}
            </Badge>
          </button>
        ))}

        {/* Toggle filters */}
        <button
          onClick={() =>
            onChange({ ...filters, studyFriendly: !filters.studyFriendly })
          }
          className="cursor-pointer"
        >
          <Badge variant={filters.studyFriendly ? "default" : "outline"}>
            Study-Friendly
          </Badge>
        </button>
        <button
          onClick={() => onChange({ ...filters, goodWifi: !filters.goodWifi })}
          className="cursor-pointer"
        >
          <Badge variant={filters.goodWifi ? "default" : "outline"}>
            Good Wi-Fi
          </Badge>
        </button>
      </div>

      {/* Clear filters */}
      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onChange({ ...INITIAL_FILTERS, search: filters.search })
          }
        >
          <X className="size-3" />
          Clear filters ({activeCount})
        </Button>
      )}
    </div>
  );
}
