import express from "express";
import { createApiController, getAllApiController } from "../controllers/url.controller.js";
const router = express.Router();
router.post("/", createApiController);
router.get("/", getAllApiController);
export default router;
