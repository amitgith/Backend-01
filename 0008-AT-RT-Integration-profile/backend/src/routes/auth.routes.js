import { Router } from "express";
import { apiController } from "../controllers/user.controller.js";

const router = Router();
router.get("/api", apiController);
export default router;
