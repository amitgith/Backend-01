import app from "./app/app.js";
// import { config } from "./config/config.js";
import { connectToDB } from "./config/db.js";
await connectToDB();
// Vercel par app.listen() nahi chalana hai.
// app.listen(config.PORT, () => {
//   console.log(`Server is running on port ${config.PORT}`);
// });
