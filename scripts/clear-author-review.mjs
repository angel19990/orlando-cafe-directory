import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const ids = await client.fetch(`*[_type == "cafe"]._id`);
console.log(`Clearing authorReview from ${ids.length} cafes...`);

const tx = client.transaction();
for (const id of ids) tx.patch(id, { unset: ["authorReview"] });
await tx.commit();

console.log("Done.");
