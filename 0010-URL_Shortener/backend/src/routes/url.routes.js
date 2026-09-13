import express from "express";
import {
  apiController,
  createApiController,
} from "../controllers/url.controller.js";
const router = express.Router();
router.get("/api", apiController);
router.post("/url", createApiController);
export default router;
