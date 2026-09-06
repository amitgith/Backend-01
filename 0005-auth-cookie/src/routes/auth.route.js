import express from "express";
import {
  apicontroller,
  registerApiController,
} from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/api", apicontroller);
router.post("/api/auth/register", registerApiController);
export default router;
