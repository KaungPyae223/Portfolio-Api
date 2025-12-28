import express from "express";
import { homeController } from "../../../controllers/homeController";
import { authMiddleware } from "../../../middlewares/auth";

const router = express.Router();

router.get("/home", homeController);

export default router;
