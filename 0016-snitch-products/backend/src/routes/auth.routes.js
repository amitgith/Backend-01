import { Router } from "express";
import {
  apiController,
  loginApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
const router = Router();
// Api Controller
router.get("/", apiController);
// Register
router.post("/register", registerValidator, registerApiController);
// Login
router.post("/login", loginValidator, loginApiController);
export default router;
