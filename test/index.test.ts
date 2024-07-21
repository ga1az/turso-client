import { TursoClient } from "../src";
import { expect, test } from "bun:test";
const TOKEN = Bun.env.TURSO_API_KEY;

if (!TOKEN) {
  throw new Error("TURSO_API_KEY is not set in the environment variables");
}

test("Get locations", async () => {
  const client = new TursoClient({ apiKey: TOKEN });
  const locations = await client.locations.list();

  expect(locations).toHaveProperty("locations");
});
