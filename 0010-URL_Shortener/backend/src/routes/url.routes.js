import express from "express";
import {
  createApiController,
  getAllApiController,
  redirectApiController,
} from "../controllers/url.controller.js";
const router = express.Router();
router.post("/", createApiController);
router.get("/", getAllApiController);
router.get("/:code", redirectApiController);
export default router;
