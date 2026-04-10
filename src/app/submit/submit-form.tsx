"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitCafe, type SubmitState } from "./actions";
import { AREA_LABELS } from "@/lib/types";
import type { Area } from "@/lib/types";

const AREAS = Object.entries(AREA_LABELS) as [Area, string][];

const initialState: SubmitState = { success: false };

export function SubmitCafeForm() {
  const [state, formAction, isPending] = useActionState(
    submitCafe,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-xl border border-border bg-secondary/30 p-6 text-center">
        <p className="text-3xl mb-3">🎉</p>
        <h2 className="text-lg font-semibold text-foreground">
          Thanks for your submission!
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll review your cafe suggestion and personally visit before
          adding it to the directory.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cafeName">Cafe Name *</Label>
        <Input
          id="cafeName"
          name="cafeName"
          required
          placeholder="e.g. Foxtail Coffee"
        />
        {state.fieldErrors?.cafeName && (
          <p className="text-xs text-destructive">
            {state.fieldErrors.cafeName[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="area">Area *</Label>
        <select
          id="area"
          name="area"
          required
          className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <option value="">Select an area</option>
          {AREAS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.area && (
          <p className="text-xs text-destructive">
            {state.fieldErrors.area[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address">Address (optional)</Label>
        <Input
          id="address"
          name="address"
          placeholder="123 Main St, Orlando, FL"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="yourName">Your Name *</Label>
          <Input id="yourName" name="yourName" required placeholder="Jane Doe" />
          {state.fieldErrors?.yourName && (
            <p className="text-xs text-destructive">
              {state.fieldErrors.yourName[0]}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
          />
          {state.fieldErrors?.email && (
            <p className="text-xs text-destructive">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="What makes this cafe great? Any details we should know?"
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Cafe"}
      </Button>
    </form>
  );
}
