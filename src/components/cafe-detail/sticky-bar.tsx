"use client";

import { Fragment, useEffect, useState } from "react";
import type { CafeDetail } from "@/lib/types";

const NOISE_LABELS: Record<string, string> = {
  quiet: "Quiet",
  moderate: "Moderate",
  loud: "Loud",
};

export function StickyBar({ cafe }: { cafe: CafeDetail }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items: string[] = [];
  if (cafe.externalRating) items.push(`★ ${cafe.externalRating.toFixed(1)}`);
  if (cafe.noiseLevel) items.push(NOISE_LABELS[cafe.noiseLevel] || cafe.noiseLevel);
  if (cafe.studyFriendly === "yes") items.push("Work-Friendly");
  if (cafe.lateNightFriendly && cafe.lateNightFriendly !== "no")
    items.push("Open Late");

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#3D0C11] px-6 py-3 shadow-lg transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 pointer-events-none opacity-0"
      }`}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="text-white/40">·</span>}
          <span className="whitespace-nowrap text-sm font-semibold text-white">
            {item}
          </span>
        </Fragment>
      ))}
      {cafe.googleMapsLink && (
        <a
          href={cafe.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 whitespace-nowrap rounded-full bg-[#F5D060] px-4 py-2 text-sm font-semibold text-[#252525] transition-colors hover:bg-[#F9CB46]"
        >
          Get Directions
        </a>
      )}
    </div>
  );
}
