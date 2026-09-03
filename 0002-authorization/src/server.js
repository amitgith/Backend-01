import app from "./app/app.js";
import { connectdb } from "./config/db.js";
await connectdb();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
