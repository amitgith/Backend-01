import "dotenv/config";
import app from "./src/app.js";
import { connectDatabase } from "./src/config/db.js";
import { env } from "./src/config/env.js";

await connectDatabase();

app.listen(env.port, () => {
  console.log(`Downbot API listening on port ${env.port}`);
});
