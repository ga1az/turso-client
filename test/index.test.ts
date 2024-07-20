import { TursoClient } from "../src";
import { config } from "dotenv";
config({
  path: "../.env",
});
const TOKEN = process.env.TURSO_API_KEY;

const client = new TursoClient({ apiKey: TOKEN! });

client.locations.list().then((res) => {
  console.log(res);
});
