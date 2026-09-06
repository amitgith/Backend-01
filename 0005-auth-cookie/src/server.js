import app from "./app/app.js";
import { connectToDB } from "./config/db.js";
await connectToDB();
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
