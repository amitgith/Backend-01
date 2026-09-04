import app from "./app/app.js";
import { connectdb } from "./config/data.js";
const port = 3000;
await connectdb()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
