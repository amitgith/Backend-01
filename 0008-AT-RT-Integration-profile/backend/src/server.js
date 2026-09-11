import app from "./app/app.js";
import config from "./config/config.js";
import { connectToDb } from "./config/db.js";
await connectToDb();
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
