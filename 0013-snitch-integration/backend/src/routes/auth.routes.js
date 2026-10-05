import express from "express";
import {
  apiController,
  loginApiController,
  refreshApiController,
  registerApiController,
} from "../controllers/auth.contoller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
const router = express.Router();
router.get("/", apiController);
router.post("/register", registerValidator, registerApiController);
router.post("/login", loginValidator, loginApiController);
router.post("/refresh", refreshApiController);
export default router;
