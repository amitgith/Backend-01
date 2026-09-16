import express from "express";
import {
  createApiController,
  deleteApiController,
  getAllApiController,
  redirectApiController,
} from "../controllers/url.controller.js";
const router = express.Router();
router.post("/", createApiController);
router.get("/", getAllApiController);
router.get("/:code", redirectApiController);
router.delete("/:id", deleteApiController);
export default router;
