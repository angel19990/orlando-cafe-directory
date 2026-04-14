import type { PortableTextBlock } from "next-sanity";

export type Area =
  | "orlando"
  | "winter-park"
  | "south-orlando"
  | "east-orlando"
  | "west-orlando"
  | "north-orlando";

export const AREA_LABELS: Record<Area, string> = {
  orlando: "Central Orlando",
  "winter-park": "Winter Park",
  "south-orlando": "South Orlando",
  "east-orlando": "East Orlando",
  "west-orlando": "West Orlando",
  "north-orlando": "North Orlando",
};

export type Neighborhood =
  | "downtown"
  | "mills-50"
  | "audubon-park"
  | "college-park"
  | "bumby"
  | "milk-district"
  | "sodo"
  | "winter-park"
  | "baldwin-park"
  | "dr-phillips"
  | "kissimmee"
  | "celebration"
  | "lake-nona"
  | "st-cloud"
  | "ucf-area"
  | "winter-garden"
  | "clermont"
  | "sanford"
  | "longwood"
  | "altamonte-springs";

export const NEIGHBORHOOD_LABELS: Record<Neighborhood, string> = {
  downtown: "Downtown",
  "mills-50": "Mills 50",
  "audubon-park": "Audubon Park",
  "college-park": "College Park",
  bumby: "Bumby",
  "milk-district": "Milk District",
  sodo: "SODO",
  "winter-park": "Winter Park",
  "baldwin-park": "Baldwin Park",
  "dr-phillips": "Dr. Phillips",
  kissimmee: "Kissimmee",
  celebration: "Celebration",
  "lake-nona": "Lake Nona",
  "st-cloud": "St. Cloud",
  "ucf-area": "UCF Area",
  "winter-garden": "Winter Garden",
  clermont: "Clermont",
  sanford: "Sanford",
  longwood: "Longwood",
  "altamonte-springs": "Altamonte Springs",
};

export type Vibe =
  | "relaxing"
  | "cozy"
  | "fancy"
  | "chic"
  | "modern"
  | "retro"
  // Legacy values (kept for backward compat with existing data)
  | "boho"
  | "vintage"
  | "dark"
  | "minimal"
  | "bright"
  | "industrial"
  | "other";

export type ParkingAccess = "easy" | "medium" | "hard";
export type AreaTag = "shopping" | "other-restaurants" | "parks";
export type DietaryTag = "vegan-friendly" | "vegetarian-friendly" | "dairy-free";
export type UniqueTag =
  | "unique-menu"
  | "house-specialties"
  | "signature-drinks"
  | "local-ingredients";

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
  neighborhood?: Neighborhood;
  seatingSize?: "small" | "medium" | "large" | "xl";
  vibe?: Vibe[];
  noiseLevel?: "quiet" | "moderate" | "loud";
  studyFriendly?: "yes" | "no" | "mixed";
  wifiQuality?: "good" | "okay" | "unknown";
  lateNightFriendly?: string;
  specialties?: string[];
  priceRange?: "$" | "$$" | "$$$";
  personallyVisited?: boolean;
  petFriendly?: boolean;
  hasOutlets?: boolean;
  outletAvailability?: string;
  featured?: boolean;
  externalRating?: number;
  externalReviewCount?: number;
};

export type CafeDetail = CafeCard & {
  favoriteDrinks?: SanityImage[];
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
  // Environment
  ambienceNote?: string;
  areaWalkable?: boolean;
  areaNote?: string;
  areaTags?: string[];
  parkingAccess?: string;
  parkingNote?: string;
  // Seating details
  indoorTableCount?: number;
  hasLargeTables?: boolean;
  hasOutdoorSeating?: boolean;
  outdoorTableCount?: number;
  outdoorHasShade?: boolean;
  outdoorHasFans?: boolean;
  // Food & Service
  foodQualityRating?: number;
  foodPresentationRating?: number;
  uniquenessRating?: string;
  uniqueTags?: string[];
  specialtyNote?: string;
  dietaryTags?: string[];
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
