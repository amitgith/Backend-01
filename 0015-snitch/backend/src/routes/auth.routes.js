import { Router } from "express";
import {
  apiController,
  loginApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";

const router = Router();
// Api testing
router.get("/", apiController);
// register
router.post("/register", registerValidator, registerApiController);
// login
router.post("/login", loginValidator, loginApiController);
export default router;
