import express from "express";
import appRoutes from "../routes/url.routes.js";
const app = express();
// middleware
app.use(express.json());
app.use("/api/url", appRoutes);
export default app;
