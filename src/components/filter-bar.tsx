"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "coffee", label: "Coffee" },
  { value: "matcha", label: "Matcha" },
  { value: "tea", label: "Tea" },
  { value: "pastries", label: "Pastries" },
  { value: "study", label: "Study-Friendly" },
  { value: "wifi", label: "Good WiFi" },
  { value: "outlets", label: "Outlets" },
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
    <div className="border-b border-[#ECECEE] bg-white">
      <div className="content-container border-b border-[#ECECEE] py-3">
        <div className="flex items-center gap-2 rounded-full border border-border bg-[#F9F9F9] px-4 py-2 text-sm max-w-sm">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search cafes..."
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: "" })}
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="content-container flex items-center gap-2.5 overflow-x-auto py-5">
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
    </div>
  );
}
