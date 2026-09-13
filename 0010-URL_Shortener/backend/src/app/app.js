import express from "express";
import appRoutes from "../routes/url.routes.js";
import urlModel from "../models/url.model.js";
const app = express();
// middleware
app.use(express.json());
app.use("/", appRoutes);
app.use("/api/url", appRoutes);

export default app;
