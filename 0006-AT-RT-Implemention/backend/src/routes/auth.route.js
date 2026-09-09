import { Router } from "express";
import { apiController, registerApiController } from "../controllers/user.controller.js";

const router = Router();
router.get("/api", apiController);
router.post("/register",registerApiController)
export default router;
