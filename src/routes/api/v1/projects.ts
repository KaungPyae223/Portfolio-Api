import { authMiddleware } from "../../../middlewares/auth.js";
import upload from "../../../config/multerts.js";
import { uploadToCloudinary } from "../../../middlewares/uploadMiddleware.js";
import express from "express";
import {
  createProjectController,
  createProjectDetailsImages,
  deleteProjectController,
  deleteProjectDetailsImage,
  getProjectController,
  getProjectDetailsController,
  updateFeaturedProjectController,
  updateProjectController,
} from "../../../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjectController);
router.get("/:id", getProjectDetailsController);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadToCloudinary,
  createProjectController,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  uploadToCloudinary,
  updateProjectController,
);
router.delete("/images", authMiddleware, deleteProjectDetailsImage);
router.delete("/:id", authMiddleware, deleteProjectController);

router.post(
  "/:id/images",
  authMiddleware,
  upload.array("images"),
  uploadToCloudinary,
  createProjectDetailsImages,
);

router.put("/featured/:id", authMiddleware, updateFeaturedProjectController);

export default router;
