import { Router } from "express";
import {
  apiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
const router = Router();
// Api Controller
router.get("/", apiController);
// Register
router.post("/register", registerValidator, registerApiController);
export default router;
