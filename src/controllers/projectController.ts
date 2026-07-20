import { NextFunction, Request, Response } from "express";

import { body, validationResult } from "express-validator";
import { validationError } from "../utils/validationHandler";
import { MiddlewareRequest } from "../types/middlewareRequest";
import { storedImage } from "../services/imageService";
import { CustomErrorType } from "../types/error";
import { errorCode } from "../config/errorCode";
import { deleteImage } from "../utils/deleteImage";
import {
  createProjectService,
  deleteProjectService,
  getProject,
  getProjectDetails,
  getProjectDetailsImages,
  getProjectImage,
  updateFeaturedProjectService,
  updateProjectService,
} from "../services/projectService";

export const createProjectController = [
  body("name").isLength({ min: 3 }).withMessage("Name is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  body("technologies").isLength({ min: 1 }).withMessage("Url is required"),
  body("demo_url").optional(),
  body("front_end").optional(),
  body("back_end").optional(),
  body("doc_url").optional(),
  body("role").isLength({ min: 3 }).withMessage("Role is required"),
  body("challenge").isLength({ min: 3 }).withMessage("Challenge is required"),
  body("solutions").isLength({ min: 3 }).withMessage("Solutions is required"),
  body("key_feature")
    .isLength({ min: 3 })
    .withMessage("Key feature is required"),
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

      const projectData = {
        name: req.body.name,
        description: req.body.description,
        technologies: req.body.technologies,
        demo_url: req.body.demo_url,
        front_end: req.body.front_end,
        back_end: req.body.back_end,
        doc_url: req.body.doc_url,
        role: req.body.role,
        challenge: req.body.challenge,
        solutions: req.body.solutions,
        key_feature: req.body.key_feature,
      };

      const project = await createProjectService(projectData);

      const ImageData = {
        public_id: cloudinaryUrls![0].public_id,
        url: cloudinaryUrls![0].url,
        category: "project-profile-image",
        imageable_id: project.id,
        imageable_type: "Project",
      };

      await storedImage(ImageData);

      return res.status(200).json({
        message: "Project Created Successfully",
        id: project.id,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  },
];

export const createProjectDetailsImages = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
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

    cloudinaryUrls.forEach((url) => {
      const ImageData = {
        public_id: url.public_id,
        url: url.url,
        category: "project-details-image",
        imageable_id: Number(req.params.id),
        imageable_type: "Project",
      };

      storedImage(ImageData);
    });

    return res.status(200).json({
      message: "Project Details Images Created Successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const deleteProjectDetailsImage = [
  body("public_ids").isArray().withMessage("Id is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    try {
      const public_ids = req.body.public_ids;

      public_ids.forEach((public_id: string) => {
        deleteImage(public_id);
      });

      return res.status(200).json({
        message: "Project Details Images Deleted Successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  },
];

export const updateProjectController = [
  body("name").isLength({ min: 3 }).withMessage("Name is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  body("technologies").isLength({ min: 1 }).withMessage("Url is required"),
  body("demo_url").optional(),
  body("front_end").optional(),
  body("back_end").optional(),
  body("doc_url").optional(),
  body("role").isLength({ min: 3 }).withMessage("Role is required"),
  body("challenge").isLength({ min: 3 }).withMessage("Challenge is required"),
  body("solutions").isLength({ min: 3 }).withMessage("Solutions is required"),
  body("key_feature")
    .isLength({ min: 3 })
    .withMessage("Key feature is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    try {
      const cloudinaryUrls = req.cloudinaryUrls;

      const id = req.params.id as string;

      if (cloudinaryUrls) {
        const oldImage = await getProjectImage(id);

        if (oldImage) {
          deleteImage(oldImage?.public_id);
        }

        const ImageData = {
          public_id: cloudinaryUrls![0].public_id,
          url: cloudinaryUrls![0].url,
          category: "project-profile-image",
          imageable_id: Number(id),
          imageable_type: "Project",
        };

        await storedImage(ImageData);
      }

      const projectData = {
        name: req.body.name,
        description: req.body.description,
        technologies: req.body.technologies,
        demo_url: req.body.demo_url,
        front_end: req.body.front_end,
        back_end: req.body.back_end,
        doc_url: req.body.doc_url,
        role: req.body.role,
        challenge: req.body.challenge,
        solutions: req.body.solutions,
        key_feature: req.body.key_feature,
      };

      const project = await updateProjectService(id, projectData);

      return res.status(200).json({
        message: "Project Updated Successfully",
        project,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  },
];

export const deleteProjectController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;

  const oldImage = await getProjectImage(id);

  if (oldImage) {
    deleteImage(oldImage?.public_id);
  }

  const oldDetailsImages = await getProjectDetailsImages(id);

  if (oldDetailsImages.length > 0) {
    oldDetailsImages.forEach((image) => {
      deleteImage(image.public_id);
    });
  }

  await deleteProjectService(id);

  return res.status(200).json({
    message: "Project Deleted Successfully",
  });
};

export const getProjectDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;

  const profileImage = await getProjectImage(id);

  const project = await getProjectDetails(id);

  const detailsImages = await getProjectDetailsImages(id);

  return res.status(200).json({
    profileImage: profileImage?.url,
    detailsImages,
    ...project,
  });
};

export const getProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const q = (req.query.q as string) || "";

  const projects = await getProject(q);

  return res.status(200).json(projects);
};

export const updateFeaturedProjectController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id as string;

  const project = await updateFeaturedProjectService(id);

  return res.status(200).json({
    message: "Project Featured Updated Successfully",
  });
};
