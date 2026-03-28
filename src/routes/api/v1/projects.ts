import { authMiddleware } from "../../../middlewares/auth";
import upload from "../../../config/multerts";
import { uploadToCloudinary } from "../../../middlewares/uploadMiddleware";
import express from "express";
import {
  createProjectController,
  createProjectDetailsImages,
  deleteProjectController,
  deleteProjectDetailsImage,
  getProjectController,
  getProjectDetailsController,
  updateProjectController,
} from "../../../controllers/projectController";

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
router.delete("/:id", authMiddleware, deleteProjectController);

router.post(
  "/:id/images",
  authMiddleware,
  upload.array("images"),
  uploadToCloudinary,
  createProjectDetailsImages,
);
router.delete("/images/:imageId", authMiddleware, deleteProjectDetailsImage);

export default router;
