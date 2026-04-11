"use client";

import { cn } from "@/lib/utils";

const FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "cozy", label: "Cozy" },
  { value: "coffee", label: "Specialty" },
  { value: "study", label: "Study-Friendly" },
  { value: "outdoor", label: "Outdoor" },
  { value: "brunch", label: "Brunch" },
  { value: "latenight", label: "Late Night" },
  { value: "pet", label: "Pet-Friendly" },
];

export type Filters = {
  search: string;
  area: string;
  vibe: string;
  specialty: string;
  studyFriendly: boolean;
  goodWifi: boolean;
  activeFilter: string;
};

export const INITIAL_FILTERS: Filters = {
  search: "",
  area: "",
  vibe: "",
  specialty: "",
  studyFriendly: false,
  goodWifi: false,
  activeFilter: "",
};

export function FilterBar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto border-b border-[#ECECEE] bg-white px-6 py-5 md:px-12">
      {FILTER_OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() =>
            onChange({
              ...INITIAL_FILTERS,
              search: filters.search,
              activeFilter: filters.activeFilter === value ? "" : value,
            })
          }
          className={cn(
            "shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            filters.activeFilter === value
              ? "border-foreground bg-foreground text-white"
              : "border-border bg-white text-foreground hover:bg-muted"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
