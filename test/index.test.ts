import { TursoClient } from "../src";
import { config } from "dotenv";
import { expect, test } from "bun:test";
config({
  path: "../.env",
});
const TOKEN = process.env.TURSO_API_KEY;

if (!TOKEN) {
  throw new Error("TURSO_API_KEY is not set in the environment variables");
}

test("Get locations", async () => {
  const client = new TursoClient({ apiKey: TOKEN });
  const locations = await client.locations.list();

  expect(locations).toHaveProperty("locations");
});
