import express from "express";
import {
  apiController,
  registerApiController,
} from "../controller/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
const router = express.Router();
router.get("/api", apiController);
// register
router.post("/register", registerValidator, registerApiController);
export default router;
