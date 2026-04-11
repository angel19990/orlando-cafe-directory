import { groq } from "next-sanity";

// Only fetch approved cafes for public pages
export const allCafesQuery = groq`
  *[_type == "cafe" && submissionStatus == "approved"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    coverImage,
    area,
    seatingSize,
    vibe,
    noiseLevel,
    studyFriendly,
    wifiQuality,
    lateNightFriendly,
    specialties,
    priceRange,
    personallyVisited,
    externalRating,
    externalReviewCount
  }
`;

export const cafeBySlugQuery = groq`
  *[_type == "cafe" && slug.current == $slug && submissionStatus == "approved"][0] {
    _id,
    name,
    slug,
    description,
    coverImage,
    favoriteDrinks,
    gallery,
    area,
    address,
    googleMapsLink,
    seatingSize,
    vibe,
    noiseLevel,
    studyFriendly,
    wifiQuality,
    lateNightFriendly,
    specialties,
    priceRange,
    personallyVisited,
    authorReview,
    externalRating,
    externalReviewCount,
    menuLink,
    instagramHandle,
    hours
  }
`;

export const cafesByAreaQuery = groq`
  *[_type == "cafe" && area == $area && submissionStatus == "approved"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    coverImage,
    area,
    seatingSize,
    vibe,
    noiseLevel,
    studyFriendly,
    specialties,
    priceRange,
    personallyVisited,
    externalRating
  }
`;

export const allAreasQuery = groq`
  array::unique(*[_type == "cafe" && submissionStatus == "approved"].area)
`;

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    categories,
    author->{name, slug, headshot}
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    content,
    publishedAt,
    categories,
    author->{name, slug, headshot, bio},
    seoTitle,
    seoDescription,
    seoImage
  }
`;

export const allCafeSlugsQuery = groq`
  *[_type == "cafe" && submissionStatus == "approved"].slug.current
`;

export const allBlogSlugsQuery = groq`
  *[_type == "blogPost"].slug.current
`;

export const relatedCafesQuery = groq`
  *[_type == "cafe" && area == $area && slug.current != $slug && submissionStatus == "approved"][0...3] {
    _id,
    name,
    slug,
    coverImage,
    area,
    externalRating,
    externalReviewCount,
    vibe,
    specialties,
    studyFriendly,
    lateNightFriendly
  }
`;
