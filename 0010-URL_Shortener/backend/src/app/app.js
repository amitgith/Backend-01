import express from "express";
import appRoutes from "../routes/url.routes.js";
const app = express();
// middleware
app.use(express.json());
app.use("/", appRoutes);
app.use("/api", appRoutes);
export default app;
