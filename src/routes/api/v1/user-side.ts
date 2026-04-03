import express from "express";
import { homeController } from "../../../controllers/homeController";
import { getAboutController } from "../../../controllers/aboutController";

const router = express.Router();

router.get("/home", homeController);
router.get("/about", getAboutController);

export default router;
