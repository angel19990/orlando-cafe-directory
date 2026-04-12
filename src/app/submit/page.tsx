import type { Metadata } from "next";
import { SubmitCafeForm } from "./submit-form";

export const metadata: Metadata = {
  title: "Submit a Cafe",
  description:
    "Know a great cafe in Central Florida? Submit it to our directory and we'll check it out.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground font-[family-name:var(--font-heading)]">
        Submit a Cafe
      </h1>
      <p className="mb-8 text-base text-muted-foreground">
        Know a great cafe in Central Florida we should check out? Tell us about
        it! We review every submission and personally visit before adding to the
        directory.
      </p>

      <SubmitCafeForm />
    </div>
  );
}
