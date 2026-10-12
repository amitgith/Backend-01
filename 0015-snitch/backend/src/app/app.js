import express from "express";
import cookieParser from "cookie-parser";
import appRoutes from "../routes/auth.routes.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", appRoutes);
export default app;
