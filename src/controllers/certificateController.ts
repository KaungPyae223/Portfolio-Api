import { NextFunction, Request, Response } from "express";
import {
  createCertificateService,
  deleteCertificateService,
  getCertificateDetails,
  getCertificateImage,
  getCertificates,
  updateCertificateService,
  updateFeaturedCertificateService,
} from "../services/certificatesServices";
import { body, validationResult } from "express-validator";
import { validationError } from "../utils/validationHandler";
import { MiddlewareRequest } from "../types/middlewareRequest";
import { storedImage } from "../services/imageService";
import { CustomErrorType } from "../types/error";
import { errorCode } from "../config/errorCode";
import { deleteImage } from "../utils/deleteImage";

export const getCertificateDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req.params.id as string) || "";

  const certificate = await getCertificateDetails(id);
  return res.status(200).json(certificate);
};

export const getCertificateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const q = (req.query.q as string) || "";

  const certificates = await getCertificates(q);
  return res.status(200).json(certificates);
};

export const createCertificateController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("lecture").isLength({ min: 3 }).withMessage("Lecture is required"),
  body("url").isLength({ min: 1 }).withMessage("Url is required"),
  body("complete_date")
    .isLength({ min: 3 })
    .withMessage("Complete date is required"),
  body("technologies")
    .isLength({ min: 3 })
    .withMessage("Technologies is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    try {
      const cloudinaryUrls = req.cloudinaryUrls;

      if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
        const error: CustomErrorType = new Error("No images uploaded");
        error.status = 400;
        error.err_code = errorCode.invalidCredentials;
        throw error;
      }

      const certificateData = {
        title: req.body.title,
        lecture: req.body.lecture,
        url: req.body.url,
        complete_date: req.body.complete_date,
        technologies: req.body.technologies,
      };

      const certificate = await createCertificateService(certificateData);

      const ImageData = {
        public_id: cloudinaryUrls![0].public_id,
        url: cloudinaryUrls![0].url,
        category: "certificate-image",
        imageable_id: certificate.id,
        imageable_type: "Certificate",
      };

      await storedImage(ImageData);

      return res.status(200).json({
        message: "Certificate Created Successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to create certificate" });
    }
  },
];

export const updateCertificateController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("lecture").isLength({ min: 3 }).withMessage("Lecture is required"),
  body("url").isLength({ min: 1 }).withMessage("Url is required"),
  body("complete_date")
    .isLength({ min: 3 })
    .withMessage("Complete date is required"),
  body("technologies")
    .isLength({ min: 3 })
    .withMessage("Technologies is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    try {
      const cloudinaryUrls = req.cloudinaryUrls;

      const id = req.params.id;

      if (cloudinaryUrls) {
        const oldImage = await getCertificateImage(id);

        if (oldImage) {
          deleteImage(oldImage?.public_id);
        }

        const ImageData = {
          public_id: cloudinaryUrls![0].public_id,
          url: cloudinaryUrls![0].url,
          category: "certificate-image",
          imageable_id: id,
          imageable_type: "Certificate",
        };

        await storedImage(ImageData);
      }

      const certificateData = {
        title: req.body.title,
        lecture: req.body.lecture,
        url: req.body.url,
        complete_date: req.body.complete_date,
        technologies: req.body.technologies,
      };

      const certificate = await updateCertificateService(id, certificateData);

      return res.status(200).json({
        message: "Certificate Updated Successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to update certificate" });
    }
  },
];

export const deleteCertificateController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  const oldImage = await getCertificateImage(id);

  if (oldImage) {
    deleteImage(oldImage?.public_id);
  }

  await deleteCertificateService(id);

  return res.status(200).json({
    message: "Certificate Deleted Successfully",
  });
};

export const updateFeaturedCertificateController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  const certificate = await updateFeaturedCertificateService(id);

  return res.status(200).json({
    message: "Certificate Featured Updated Successfully",
  });
};
