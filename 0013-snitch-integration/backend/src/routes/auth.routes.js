import express from "express";
import { apiController } from "../controllers/auth.contoller.js";
const router = express.Router();
router.get("/", apiController);
export default router;
