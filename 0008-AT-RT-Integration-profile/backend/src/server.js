import app from "./app/app.js";
import config from "./config/config.js";
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
