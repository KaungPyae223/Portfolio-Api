import { authMiddleware } from "../../../middlewares/auth";
import upload from "../../../config/multerts";
import { uploadToCloudinary } from "../../../middlewares/uploadMiddleware";
import express from "express";
import {
  createCertificateController,
  deleteCertificateController,
  getCertificateController,
  getCertificateDetailsController,
  updateCertificateController,
} from "../../../controllers/certificateController";

const router = express.Router();

router.get("/", getCertificateController);
router.get("/:id", getCertificateDetailsController);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadToCloudinary,
  createCertificateController,
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  uploadToCloudinary,
  updateCertificateController,
);
router.delete("/:id", authMiddleware, deleteCertificateController);

export default router;
