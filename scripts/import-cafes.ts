import fs from "fs";
import { createClient } from "next-sanity";

const CSV_PATH = "/Users/angelikacheng/Downloads/orlando_cafes_final.csv";
const PROJECT_ID = "sfp38p3m";
const DATASET = "production";
const API_VERSION = "2024-01-01";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

const EXCLUDE = new Set(["Cafe Perks", "Vanbarry's Public House"]);

const CAFE_ASSIGNMENTS: Record<string, { area: string; neighborhood: string }> = {
  // Orlando (19)
  "Deeply Coffee":              { area: "orlando",      neighborhood: "downtown" },
  "Qreate Coffee":              { area: "orlando",      neighborhood: "downtown" },
  "Bynx Orlando":               { area: "orlando",      neighborhood: "downtown" },
  "Craft & Common":             { area: "orlando",      neighborhood: "downtown" },
  "Mariam Coffee":              { area: "orlando",      neighborhood: "downtown" },
  "Stemma Craft Coffee":        { area: "orlando",      neighborhood: "downtown" },
  "Drunken Monkey Coffee Bar":  { area: "orlando",      neighborhood: "bumby" },
  "Easy Luck Coffee":           { area: "orlando",      neighborhood: "milk-district" },
  "Lucid Beans Coffee Co.":     { area: "orlando",      neighborhood: "sodo" },
  "Cafe Linger":                { area: "orlando",      neighborhood: "mills-50" },
  "Duo 58 Coffee":              { area: "orlando",      neighborhood: "mills-50" },
  "Framework Craft Coffee":     { area: "orlando",      neighborhood: "mills-50" },
  "Haan Coffee":                { area: "orlando",      neighborhood: "mills-50" },
  "Matcha Cafe Maiko":          { area: "orlando",      neighborhood: "mills-50" },
  "Lineage Coffee Roasting":    { area: "orlando",      neighborhood: "audubon-park" },
  "Lobos Coffee Roasters":      { area: "orlando",      neighborhood: "audubon-park" },
  "Stardust Video & Coffee":    { area: "orlando",      neighborhood: "audubon-park" },
  "Cups & Pups Coffee":         { area: "orlando",      neighborhood: "college-park" },
  "Infusion Tea":               { area: "orlando",      neighborhood: "college-park" },
  // Winter Park (11)
  "Austin's Coffee":            { area: "winter-park",  neighborhood: "winter-park" },
  "Barnie's Coffee & Tea Co.":  { area: "winter-park",  neighborhood: "winter-park" },
  "Buttermilk Bakery":          { area: "winter-park",  neighborhood: "winter-park" },
  "Foxtail Coffee Winter Park": { area: "winter-park",  neighborhood: "winter-park" },
  "Light On The Sugar":         { area: "winter-park",  neighborhood: "winter-park" },
  "New General":                { area: "winter-park",  neighborhood: "winter-park" },
  "Rosallie Le French Cafe":    { area: "winter-park",  neighborhood: "winter-park" },
  "The Glass Knife":            { area: "winter-park",  neighborhood: "winter-park" },
  "Black Coffee Cafe Negro Bistro": { area: "winter-park", neighborhood: "winter-park" },
  "Krave Tea":                  { area: "winter-park",  neighborhood: "winter-park" },
  "Baldwin Perk":               { area: "winter-park",  neighborhood: "baldwin-park" },
  // South Orlando (8)
  "CFS Coffee Dr. Phillips":    { area: "south-orlando", neighborhood: "dr-phillips" },
  "Achilles Art Cafe":          { area: "south-orlando", neighborhood: "dr-phillips" },
  "Saikō":                      { area: "south-orlando", neighborhood: "dr-phillips" },
  "XO Coffee Shop":             { area: "south-orlando", neighborhood: "kissimmee" },
  "Cafe Barista":               { area: "south-orlando", neighborhood: "kissimmee" },
  "CFS Coffee Celebration":     { area: "south-orlando", neighborhood: "celebration" },
  "Foxtail Coffee Lake Nona":   { area: "south-orlando", neighborhood: "lake-nona" },
  "Madilynn's Craft Coffee Shop": { area: "south-orlando", neighborhood: "st-cloud" },
  // West Orlando (4)
  "Axum Coffee":                { area: "west-orlando",  neighborhood: "winter-garden" },
  "KOS Coffee":                 { area: "west-orlando",  neighborhood: "winter-garden" },
  "Piccolo Coffee Co.":         { area: "west-orlando",  neighborhood: "winter-garden" },
  "Orlando Cat Cafe":           { area: "west-orlando",  neighborhood: "clermont" },
  // East Orlando (3)
  "Vespr Coffeebar":            { area: "east-orlando",  neighborhood: "ucf-area" },
  "Luminescent":                { area: "east-orlando",  neighborhood: "ucf-area" },
  "Snowbean":                   { area: "east-orlando",  neighborhood: "ucf-area" },
  // North Orlando (3)
  "Paloma Coffee Co.":          { area: "north-orlando", neighborhood: "sanford" },
  "Rosso Coffee Bar":           { area: "north-orlando", neighborhood: "longwood" },
  "Lujan Coffee":               { area: "north-orlando", neighborhood: "altamonte-springs" },
};

const RATING_BACKFILL: Record<string, { rating: number; reviews: number }> = {
  "Lucid Beans Coffee Co.":       { rating: 4.9, reviews: 149 },
  "Mariam Coffee":                { rating: 4.7, reviews: 256 },
  "Madilynn's Craft Coffee Shop": { rating: 4.6, reviews: 227 },
  "Rosso Coffee Bar":             { rating: 4.9, reviews: 619 },
  "Luminescent":                  { rating: 4.7, reviews: 115 },
  "Stemma Craft Coffee":          { rating: 4.7, reviews: 607 },
  "Snowbean":                     { rating: 4.5, reviews: 655 },
  "Cafe Barista":                 { rating: 4.7, reviews: 1035 },
  "Piccolo Coffee Co.":           { rating: 4.8, reviews: 182 },
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeInstagram(handle: string): string | undefined {
  if (!handle) return undefined;
  return handle.replace(/^@/, "");
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split("\n").filter((l) => l.trim());
  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => (row[h] = values[idx]));
    rows.push(row);
  }
  return rows;
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  if (!TOKEN && !isDryRun) {
    console.error("ERROR: SANITY_API_WRITE_TOKEN is not set. Source .env.local first.");
    process.exit(1);
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token: TOKEN,
    useCdn: false,
  });

  const csv = fs.readFileSync(CSV_PATH, "utf-8");
  const rows = parseCSV(csv);

  const cafes: Record<string, unknown>[] = [];
  const skipped: string[] = [];
  const unassigned: string[] = [];

  for (const row of rows) {
    const name = row.name;

    if (EXCLUDE.has(name)) {
      skipped.push(name);
      continue;
    }

    const assignment = CAFE_ASSIGNMENTS[name];
    if (!assignment) {
      console.warn(`WARNING: No assignment found for "${name}" — skipping`);
      unassigned.push(name);
      continue;
    }

    const backfill = RATING_BACKFILL[name];

    let externalRating: number | undefined;
    let externalReviewCount: number | undefined;

    if (backfill) {
      externalRating = backfill.rating;
      externalReviewCount = backfill.reviews;
    } else {
      const r = row.externalRating ? parseFloat(row.externalRating) : NaN;
      const c = row.externalReviewCount ? parseInt(row.externalReviewCount, 10) : NaN;
      if (!isNaN(r)) externalRating = r;
      if (!isNaN(c)) externalReviewCount = c;
    }

    const slug = generateSlug(name);
    const vibe = row.vibe
      ? row.vibe.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean)
      : [];
    const specialties = row.specialties
      ? row.specialties.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
      : [];

    const doc: Record<string, unknown> = {
      _type: "cafe",
      name,
      slug: { _type: "slug", current: slug },
      area: assignment.area,
      neighborhood: assignment.neighborhood,
      submissionStatus: "approved",
      personallyVisited: false,
    };

    if (row.description)     doc.description = row.description;
    if (row.address)         doc.address = row.address;
    if (row.googleMapsLink)  doc.googleMapsLink = row.googleMapsLink;
    if (row.seatingSize)     doc.seatingSize = row.seatingSize.toLowerCase();
    if (vibe.length)         doc.vibe = vibe;
    if (row.noiseLevel)      doc.noiseLevel = row.noiseLevel.toLowerCase();
    if (row.studyFriendly)   doc.studyFriendly = row.studyFriendly.toLowerCase();
    if (row.wifiQuality)     doc.wifiQuality = row.wifiQuality.toLowerCase();
    if (row.lateNightFriendly) doc.lateNightFriendly = generateSlug(row.lateNightFriendly);
    if (specialties.length)  doc.specialties = specialties;
    if (row.priceRange)      doc.priceRange = row.priceRange;
    if (externalRating !== undefined)      doc.externalRating = externalRating;
    if (externalReviewCount !== undefined) doc.externalReviewCount = externalReviewCount;
    const ig = normalizeInstagram(row.instagramHandle);
    if (ig)             doc.instagramHandle = ig;
    if (row.menuLink)   doc.menuLink = row.menuLink;

    cafes.push(doc);
  }

  console.log(`\nParsed:   ${cafes.length} cafes`);
  console.log(`Excluded: ${skipped.join(", ")}`);
  if (unassigned.length) console.log(`No assignment: ${unassigned.join(", ")}`);

  // Area count summary
  const areaCounts: Record<string, number> = {};
  for (const c of cafes) {
    const a = c.area as string;
    areaCounts[a] = (areaCounts[a] || 0) + 1;
  }
  console.log("\nArea counts:");
  for (const [area, count] of Object.entries(areaCounts).sort()) {
    console.log(`  ${area}: ${count}`);
  }

  if (isDryRun) {
    console.log("\n=== DRY RUN — documents that would be created ===\n");
    for (let i = 0; i < cafes.length; i++) {
      const c = cafes[i];
      const slug = (c.slug as { current: string }).current;
      const rating = c.externalRating
        ? `${c.externalRating} (${c.externalReviewCount ?? "?"} reviews)`
        : "no rating";
      const vibe = (c.vibe as string[] | undefined)?.join(", ") ?? "";
      const specialties = (c.specialties as string[] | undefined)?.join(", ") ?? "";
      console.log(
        `${String(i + 1).padStart(2)}. ${c.name} [${c.area} / ${c.neighborhood}]`
      );
      console.log(
        `    slug: ${slug}  |  rating: ${rating}  |  vibe: ${vibe}  |  specialties: ${specialties}`
      );
      if (c.instagramHandle) console.log(`    instagram: @${c.instagramHandle}`);
    }
    console.log(`\nTotal: ${cafes.length} cafes (dry run — nothing written)`);
    return;
  }

  // Delete all existing cafes
  const existingIds: string[] = await client.fetch('*[_type == "cafe"]._id');
  console.log(`\nDeleting ${existingIds.length} existing cafe documents...`);
  if (existingIds.length) {
    const deleteTx = client.transaction();
    existingIds.forEach((id) => deleteTx.delete(id));
    await deleteTx.commit();
    console.log("Deleted.");
  }

  // Create all new cafes in a single transaction
  console.log(`Creating ${cafes.length} cafe documents...`);
  const createTx = client.transaction();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cafes.forEach((doc) => createTx.create(doc as any));
  await createTx.commit();
  console.log(`\nDone! ${cafes.length} cafes imported successfully.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
