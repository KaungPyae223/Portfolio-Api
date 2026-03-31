import express from "express";
import {
  createSkill,
  delete_cv,
  delete_profile_image,
  deleteSkill,
  getAllHomeController,
  homeAboutManagementController,
  homeEducationController,
  homeEducationDeleteController,
  homeExperienceController,
  homeExperienceDeleteController,
  homeHeroManagementController,
  homeMetaUpdateController,
  upload_cv,
  upload_profile_image,
} from "../../../controllers/homeController.js";
import { authMiddleware } from "../../../middlewares/auth.js";
import upload from "../../../config/multerts.js";
import { uploadToCloudinary } from "../../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.put("/hero-manage", authMiddleware, homeHeroManagementController);
router.put("/about-manage", authMiddleware, homeAboutManagementController);
router.post("/experience-manage", authMiddleware, homeExperienceController);
router.delete(
  "/experience-manage/:id",
  authMiddleware,
  homeExperienceDeleteController
);
router.get("/get-all-home", authMiddleware, getAllHomeController);
router.post("/education-manage", authMiddleware, homeEducationController);
router.delete(
  "/education-manage/:id",
  authMiddleware,
  homeEducationDeleteController
);
router.put("/meta-manage", authMiddleware, homeMetaUpdateController);
router.patch(
  "/upload-profile-image",
  authMiddleware,
  upload.single("image"),
  uploadToCloudinary,
  upload_profile_image
);

router.delete("/delete-profile-image", authMiddleware, delete_profile_image);

router.patch(
  "/upload-cv",
  authMiddleware,
  upload.single("cv"),
  uploadToCloudinary,
  upload_cv
);

router.delete("/delete-cv/:language", authMiddleware, delete_cv);

router.post(
  "/create-skill",
  authMiddleware,
  upload.single("image"),
  uploadToCloudinary,
  createSkill
);

router.delete("/delete-skill/:id", authMiddleware, deleteSkill);

export default router;
