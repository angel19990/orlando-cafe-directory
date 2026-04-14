import { Check, Sun, Wind } from "lucide-react";
import type { CafeDetail } from "@/lib/types";

const SEATING_SIZE_LABELS: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  xl: "Extra Large",
};

const STUDY_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  mixed: "Mixed",
};

const OUTLET_LABELS: Record<string, string> = {
  limited: "Limited",
  some: "Some",
  plenty: "Plenty",
};

// ── Indoor Seating ──

function IndoorSeatingCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.seatingSize) return null;

  return (
    <div className="rounded-[20px] bg-[#FFF8F0] p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Indoor Seating
      </h3>
      <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        {SEATING_SIZE_LABELS[cafe.seatingSize] || cafe.seatingSize}
      </p>
      {cafe.indoorTableCount != null && cafe.indoorTableCount > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#252525]/80">
          <span>☕</span> ~{cafe.indoorTableCount} tables
        </p>
      )}
      {cafe.hasLargeTables && (
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[#252525]/80">
          <Check className="size-3.5 text-[#3D1A08]" />
          Has large 6-8 person tables
        </p>
      )}
    </div>
  );
}

// ── Outdoor Seating ──

function OutdoorSeatingCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.hasOutdoorSeating) return null;

  return (
    <div className="rounded-[20px] bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Outdoor Seating
      </h3>
      <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        Available
      </p>
      {cafe.outdoorTableCount != null && cafe.outdoorTableCount > 0 && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#252525]/80">
          <span>☕</span> ~{cafe.outdoorTableCount} tables
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {cafe.outdoorHasShade && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <Sun className="size-3.5" />
            Shade
          </span>
        )}
        {cafe.outdoorHasFans && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <Wind className="size-3.5" />
            Fans
          </span>
        )}
      </div>
    </div>
  );
}

// ── Study-Friendly ──

function StudyFriendlyCard({ cafe }: { cafe: CafeDetail }) {
  if (!cafe.studyFriendly && !cafe.outletAvailability && !cafe.wifiQuality)
    return null;

  return (
    <div className="rounded-[20px] bg-white p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#252525]/50">
        Study-Friendly
      </h3>
      {cafe.studyFriendly && (
        <p className="mt-2 text-2xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
          {STUDY_LABELS[cafe.studyFriendly] || cafe.studyFriendly}
        </p>
      )}
      {cafe.outletAvailability && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#252525]/80">
          <Check className="size-3.5 text-green-600" />
          Outlets: <span className="font-semibold">{OUTLET_LABELS[cafe.outletAvailability] || cafe.outletAvailability}</span>
        </p>
      )}
      {cafe.wifiQuality === "good" && (
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          <Check className="size-3.5" />
          Good WiFi
        </span>
      )}
    </div>
  );
}

// ── Main export ──

export function SeatingSection({ cafe }: { cafe: CafeDetail }) {
  const hasIndoor = !!cafe.seatingSize;
  const hasOutdoor = !!cafe.hasOutdoorSeating;
  const hasStudy = !!cafe.studyFriendly || !!cafe.outletAvailability || !!cafe.wifiQuality;

  if (!hasIndoor && !hasOutdoor && !hasStudy) return null;

  return (
    <section className="content-container py-12">
      <h2 className="mb-8 text-3xl font-bold font-[family-name:var(--font-heading)] text-[#3D1A08]">
        Seating
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <IndoorSeatingCard cafe={cafe} />
        <OutdoorSeatingCard cafe={cafe} />
        <StudyFriendlyCard cafe={cafe} />
      </div>
    </section>
  );
}
