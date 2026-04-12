import { defineType, defineField } from "sanity";

const AREAS = [
  { title: "Central Orlando", value: "orlando" },
  { title: "Winter Park", value: "winter-park" },
  { title: "South Orlando", value: "south-orlando" },
  { title: "East Orlando", value: "east-orlando" },
  { title: "West Orlando", value: "west-orlando" },
  { title: "North Orlando", value: "north-orlando" },
];

const NEIGHBORHOODS = [
  { title: "Downtown", value: "downtown" },
  { title: "Mills 50", value: "mills-50" },
  { title: "Audubon Park", value: "audubon-park" },
  { title: "College Park", value: "college-park" },
  { title: "Bumby", value: "bumby" },
  { title: "Milk District", value: "milk-district" },
  { title: "SODO", value: "sodo" },
  { title: "Winter Park", value: "winter-park" },
  { title: "Baldwin Park", value: "baldwin-park" },
  { title: "Dr. Phillips", value: "dr-phillips" },
  { title: "Kissimmee", value: "kissimmee" },
  { title: "Celebration", value: "celebration" },
  { title: "Lake Nona", value: "lake-nona" },
  { title: "St. Cloud", value: "st-cloud" },
  { title: "UCF Area", value: "ucf-area" },
  { title: "Winter Garden", value: "winter-garden" },
  { title: "Clermont", value: "clermont" },
  { title: "Sanford", value: "sanford" },
  { title: "Longwood", value: "longwood" },
  { title: "Altamonte Springs", value: "altamonte-springs" },
];

const SEATING_SIZES = [
  { title: "Small", value: "small" },
  { title: "Medium", value: "medium" },
  { title: "Large", value: "large" },
  { title: "XL", value: "xl" },
];

const VIBES = [
  { title: "Boho", value: "boho" },
  { title: "Vintage", value: "vintage" },
  { title: "Dark", value: "dark" },
  { title: "Modern", value: "modern" },
  { title: "Minimal", value: "minimal" },
  { title: "Cozy", value: "cozy" },
  { title: "Bright", value: "bright" },
  { title: "Industrial", value: "industrial" },
  { title: "Other", value: "other" },
];

const NOISE_LEVELS = [
  { title: "Quiet", value: "quiet" },
  { title: "Moderate", value: "moderate" },
  { title: "Loud", value: "loud" },
];

const STUDY_FRIENDLY = [
  { title: "Yes", value: "yes" },
  { title: "No", value: "no" },
  { title: "Mixed", value: "mixed" },
];

const WIFI_QUALITY = [
  { title: "Good", value: "good" },
  { title: "Okay", value: "okay" },
  { title: "Unknown", value: "unknown" },
];

const LATE_NIGHT = [
  { title: "No", value: "no" },
  { title: "Closes Before 9PM", value: "closes-before-9pm" },
  { title: "Open Past 9PM", value: "open-past-9pm" },
  { title: "Open Past 10PM", value: "open-past-10pm" },
];

const SPECIALTIES = [
  { title: "Coffee", value: "coffee" },
  { title: "Matcha", value: "matcha" },
  { title: "Tea", value: "tea" },
  { title: "Pastries", value: "pastries" },
  { title: "Brunch", value: "brunch" },
];

const PRICE_RANGES = [
  { title: "$", value: "$" },
  { title: "$$", value: "$$" },
  { title: "$$$", value: "$$$" },
];

const SUBMISSION_STATUSES = [
  { title: "Pending", value: "pending" },
  { title: "Approved", value: "approved" },
  { title: "Rejected", value: "rejected" },
];

const DAYS_OF_WEEK = [
  { title: "Monday", value: "monday" },
  { title: "Tuesday", value: "tuesday" },
  { title: "Wednesday", value: "wednesday" },
  { title: "Thursday", value: "thursday" },
  { title: "Friday", value: "friday" },
  { title: "Saturday", value: "saturday" },
  { title: "Sunday", value: "sunday" },
];

export const cafe = defineType({
  name: "cafe",
  title: "Cafe",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "location", title: "Location" },
    { name: "attributes", title: "Attributes" },
    { name: "content", title: "Content" },
    { name: "links", title: "Links & Extras" },
    { name: "submission", title: "Submission" },
  ],
  fields: [
    // --- Basic Info ---
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "basic",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "basic",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "favoriteDrinks",
      title: "Our Favorite Drinks",
      type: "array",
      group: "basic",
      description:
        "Upload photos of your favorite drinks. The alt text will be shown as the drink name beneath each photo.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Drink Name",
              type: "string",
              description: 'e.g. "Oat Milk Matcha"',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "basic",
      description: "General photos of the cafe — interior, exterior, food, etc.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),

    // --- Location ---
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      group: "location",
      options: { list: AREAS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "neighborhood",
      title: "Neighborhood",
      type: "string",
      group: "location",
      options: { list: NEIGHBORHOODS },
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "googleMapsLink",
      title: "Google Maps Link",
      type: "url",
      group: "location",
    }),

    // --- Attributes ---
    defineField({
      name: "seatingSize",
      title: "Seating Size",
      type: "string",
      group: "attributes",
      options: { list: SEATING_SIZES },
    }),
    defineField({
      name: "vibe",
      title: "Vibe",
      type: "array",
      group: "attributes",
      of: [{ type: "string" }],
      options: { list: VIBES },
    }),
    defineField({
      name: "noiseLevel",
      title: "Noise Level",
      type: "string",
      group: "attributes",
      options: { list: NOISE_LEVELS },
    }),
    defineField({
      name: "studyFriendly",
      title: "Study Friendly",
      type: "string",
      group: "attributes",
      options: { list: STUDY_FRIENDLY },
    }),
    defineField({
      name: "wifiQuality",
      title: "Wi-Fi Quality",
      type: "string",
      group: "attributes",
      options: { list: WIFI_QUALITY },
    }),
    defineField({
      name: "lateNightFriendly",
      title: "Late Night Friendly",
      type: "string",
      group: "attributes",
      options: { list: LATE_NIGHT },
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      group: "attributes",
      of: [{ type: "string" }],
      options: { list: SPECIALTIES },
    }),
    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "string",
      group: "attributes",
      options: { list: PRICE_RANGES },
    }),

    // --- Content ---
    defineField({
      name: "personallyVisited",
      title: "Personally Visited",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "authorReview",
      title: "Author Review",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "externalRating",
      title: "External Rating",
      type: "number",
      group: "content",
      validation: (rule) => rule.min(1).max(5).precision(1),
    }),
    defineField({
      name: "externalReviewCount",
      title: "External Review Count",
      type: "number",
      group: "content",
      validation: (rule) => rule.min(0).integer(),
    }),

    // --- Links & Extras ---
    defineField({
      name: "menuLink",
      title: "Menu Link",
      type: "url",
      group: "links",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
      group: "links",
      description: 'Without the @ symbol (e.g. "cafename")',
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      group: "links",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "day",
              title: "Day",
              type: "string",
              options: { list: DAYS_OF_WEEK },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "openTime",
              title: "Open Time",
              type: "string",
              description: 'e.g. "7:00 AM"',
            }),
            defineField({
              name: "closeTime",
              title: "Close Time",
              type: "string",
              description: 'e.g. "9:00 PM"',
            }),
            defineField({
              name: "isClosed",
              title: "Closed",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              day: "day",
              openTime: "openTime",
              closeTime: "closeTime",
              isClosed: "isClosed",
            },
            prepare({ day, openTime, closeTime, isClosed }) {
              const dayLabel = day
                ? day.charAt(0).toUpperCase() + day.slice(1)
                : "Day";
              return {
                title: isClosed
                  ? `${dayLabel}: Closed`
                  : `${dayLabel}: ${openTime || "?"} – ${closeTime || "?"}`,
              };
            },
          },
        },
      ],
    }),

    // --- Submission ---
    defineField({
      name: "submissionStatus",
      title: "Submission Status",
      type: "string",
      group: "submission",
      options: { list: SUBMISSION_STATUSES },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedByName",
      title: "Submitted By (Name)",
      type: "string",
      group: "submission",
    }),
    defineField({
      name: "submittedByEmail",
      title: "Submitted By (Email)",
      type: "string",
      group: "submission",
    }),
    defineField({
      name: "submittedNotes",
      title: "Submitted Notes",
      type: "text",
      group: "submission",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "area",
      media: "coverImage",
    },
  },
});
