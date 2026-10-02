import express from "express";
import cookieParser from "cookie-parser";
import appRoutes from "../routes/auth.routes.js";
const app = express();
// middleware
app.use(express.json());
// cokie
app.use(cookieParser());
app.use("/api/auth", appRoutes);
export default app;
