import express from "express";
import appRoutes from "../routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();
// middeware
app.use(express.json());
app.use(cookieParser());
app.use("/", appRoutes);
app.use("/api/auth", appRoutes);
export default app;
