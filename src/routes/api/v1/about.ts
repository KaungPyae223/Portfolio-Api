import express from "express";
import {
  createAboutEducationController,
  createAboutExperienceController,
  getAboutIntroController,
  getAllAboutEducationController,
  getAllAboutExperienceController,
  updateAboutController,
  updateAboutEducationController,
  updateAboutExperienceController,
} from "../../../controllers/aboutController";
import { authMiddleware } from "../../../middlewares/auth";

const router = express.Router();

router.get("/get-all-intro", authMiddleware, getAboutIntroController);

router.put("/update-intro", authMiddleware, updateAboutController);
router.get(
  "/get-all-education",
  authMiddleware,
  getAllAboutEducationController,
);
router.post(
  "/create-education",
  authMiddleware,
  createAboutEducationController,
);
router.put(
  "/update-education/:id",
  authMiddleware,
  updateAboutEducationController,
);

router.get(
  "/get-all-experience",
  authMiddleware,
  getAllAboutExperienceController,
);
router.post(
  "/create-experience",
  authMiddleware,
  createAboutExperienceController,
);
router.put(
  "/update-experience/:id",
  authMiddleware,
  updateAboutExperienceController,
);

export default router;
