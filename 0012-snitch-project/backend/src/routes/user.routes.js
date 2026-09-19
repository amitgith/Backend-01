import express from "express";
import { apiController } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/api", apiController);
export default router;
