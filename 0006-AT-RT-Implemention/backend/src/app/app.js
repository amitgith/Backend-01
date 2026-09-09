import express from "express";
import appRoutes from "../routes/auth.route.js";
const app = express();
// middleware
app.use(express.json());
app.use("/", appRoutes);
export default app;
