import app from "./app/app.js";
import { connectToDB } from "./config/db.js";
await connectToDB();
export default app;
