import express from "express";
import authRoutes from "../routes/auth.route.js";
const app = express();
// middleware
app.use(express.json());
app.use("/", authRoutes);
app.use("/api/auth", authRoutes);
export default app;
