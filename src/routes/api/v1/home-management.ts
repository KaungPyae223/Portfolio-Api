import express from "express";
import { getAllHomeController, homeHeroManagementController } from "../../../controllers/homeController";
import { authMiddleware } from "../../../middlewares/auth";

const router = express.Router();

router.put("/hero-manage", authMiddleware, homeHeroManagementController);
router.get("/get-all-home", authMiddleware, getAllHomeController);

export default router;