import express from "express";
import appRoutes from "../routes/user.routes.js";
const app = express();
app.use("/", appRoutes);
export default app;
