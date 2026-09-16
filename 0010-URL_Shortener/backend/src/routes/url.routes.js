import express from "express";
import {
  createApiController,
  deleteApiController,
  getAllApiController,
  getSingleApiController,
  redirectApiController,
} from "../controllers/url.controller.js";
const router = express.Router();
router.post("/", createApiController);
router.get("/", getAllApiController);
router.get("/:code", redirectApiController);
router.delete("/:id", deleteApiController);
router.get("/:id", getSingleApiController);
export default router;
