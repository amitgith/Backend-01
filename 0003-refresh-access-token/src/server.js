import app from "./app/app.js";
import dotenv from "dotenv";
dotenv.config();
import { connectdb } from "./config/db.js";
await connectdb();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
