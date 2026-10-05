import app from "../backend/src/app/app.js";
import { connectToDB } from "../backend/src/config/db.js";

await connectToDB();

export default app;
