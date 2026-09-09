import app from "./src/app/app.js";
import config from "./src/config/config.js";
import { connectToDb } from "./src/config/db.js";
await connectToDb();
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
