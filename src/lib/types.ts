import type { PortableTextBlock } from "next-sanity";

export type Area =
  | "downtown-orlando"
  | "winter-park"
  | "kissimmee"
  | "winter-garden"
  | "dr-phillips";

export const AREA_LABELS: Record<Area, string> = {
  "downtown-orlando": "Downtown Orlando",
  "winter-park": "Winter Park",
  kissimmee: "Kissimmee",
  "winter-garden": "Winter Garden",
  "dr-phillips": "Dr. Phillips",
};

export type Vibe =
  | "boho"
  | "vintage"
  | "dark"
  | "modern"
  | "minimal"
  | "cozy"
  | "bright"
  | "industrial"
  | "other";

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type CafeCard = {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  coverImage?: SanityImage;
  area: Area;
  seatingSize?: "small" | "medium" | "large" | "xl";
  vibe?: Vibe[];
  noiseLevel?: "quiet" | "moderate" | "loud";
  studyFriendly?: "yes" | "no" | "mixed";
  wifiQuality?: "good" | "okay" | "unknown";
  lateNightFriendly?: string;
  specialties?: string[];
  priceRange?: "$" | "$$" | "$$$";
  personallyVisited?: boolean;
  externalRating?: number;
  externalReviewCount?: number;
};

export type CafeDetail = CafeCard & {
  gallery?: SanityImage[];
  address?: string;
  googleMapsLink?: string;
  authorReview?: PortableTextBlock[];
  menuLink?: string;
  instagramHandle?: string;
  hours?: {
    day: string;
    openTime?: string;
    closeTime?: string;
    isClosed?: boolean;
  }[];
};

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: SanityImage;
  publishedAt: string;
  categories?: string[];
  author?: {
    name: string;
    slug: { current: string };
    headshot?: SanityImage;
  };
};
