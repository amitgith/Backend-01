import express from "express";
import {
  apiController,
  registerApiController,
} from "../controllers/auth.contoller.js";
import { registerValidator } from "../validators/auth.validator.js";
const router = express.Router();
router.get("/", apiController);
router.post("/register", registerValidator, registerApiController);
export default router;
