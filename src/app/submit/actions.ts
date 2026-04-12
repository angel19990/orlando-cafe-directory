"use server";

import { z } from "zod";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const submitCafeSchema = z.object({
  cafeName: z
    .string()
    .min(2, "Cafe name must be at least 2 characters")
    .max(100),
  area: z.enum([
    "orlando",
    "winter-park",
    "south-orlando",
    "east-orlando",
    "west-orlando",
    "north-orlando",
  ]),
  address: z.string().max(200).optional(),
  yourName: z.string().min(1, "Your name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  notes: z.string().max(1000).optional(),
  // honeypot
  website: z.string().max(0, "Bot detected").optional(),
});

export type SubmitState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

// Simple in-memory rate limiter
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimit.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  );
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  timestamps.push(now);
  rateLimit.set(key, timestamps);
  return true;
}

export async function submitCafe(
  _prev: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  // Rate limit by email
  const email = formData.get("email") as string;
  if (!checkRateLimit(email || "anonymous")) {
    return {
      success: false,
      error: "Too many submissions. Please wait a minute and try again.",
    };
  }

  const raw = {
    cafeName: formData.get("cafeName"),
    area: formData.get("area"),
    address: formData.get("address") || undefined,
    yourName: formData.get("yourName"),
    email: formData.get("email"),
    notes: formData.get("notes") || undefined,
    website: formData.get("website") || undefined,
  };

  const result = submitCafeSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = result.data;

  try {
    await writeClient.create({
      _type: "cafe",
      name: data.cafeName,
      slug: {
        _type: "slug",
        current: data.cafeName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      },
      area: data.area,
      address: data.address,
      submissionStatus: "pending",
      submittedByName: data.yourName,
      submittedByEmail: data.email,
      submittedNotes: data.notes,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
