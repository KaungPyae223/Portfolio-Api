import { NextFunction, Request, Response } from "express";
import {
  createHomeEducationService,
  createHomeExperienceService,
  deleteEducation,
  deleteExperience,
  getHomeEducationService,
  getHomeExperiencesService,
  getHomeService,
  getSkillsService,
} from "../services/userSideService";
import { body, validationResult } from "express-validator";
import { validationError } from "../utils/validationHandler";
import {
  getAllHome,
  updateHome,
  updateHomeMetaData,
} from "../services/homeService";
import { MiddlewareRequest } from "../types/middlewareRequest";
import {
  getAllCV,
  getCV,
  getHomeProfileImage,
  storedImage,
} from "../services/imageService";
import { deleteImage } from "../utils/deleteImage";

export const homeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const language = (req.query.language as string) || "English";

  const home = await getHomeService(language);
  const skills = await getSkillsService();
  const experiences = await getHomeExperiencesService();
  const educations = await getHomeEducationService();
  const profileImage = await getHomeProfileImage();
  const cv = await getCV(language);
  const allCVs = await getAllCV();

  const homeData = {
    ...home,
    profileURL: profileImage?.url,
    cvURL: cv?.url,
    skills,
    experiences,
    educations,
    allCVs,
  };

  return res.status(200).json(homeData);
};

export const getAllHomeController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  const home = await getAllHome();
  return res.status(200).json(home);
};

export const homeHeroManagementController = [
  body("language").isLength({ min: 3 }).withMessage("Language is required"),
  body("name").isLength({ min: 3 }).withMessage("Name is required"),
  body("prefix").isLength({ min: 1 }).withMessage("Prefix is required"),
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("content").isLength({ min: 3 }).withMessage("Content is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const homeData = {
      prefix: req.body.prefix,
      name: req.body.name,
      title: req.body.title,
      content: req.body.content,
    };

    updateHome(req.body.language, homeData);

    return res.status(200).json({
      message: "Home Hero Updated Successfully",
    });
  },
];

export const homeAboutManagementController = [
  body("language").isLength({ min: 3 }).withMessage("Language is required"),
  body("name").isLength({ min: 3 }).withMessage("Name is required"),
  body("date_of_birth")
    .isLength({ min: 1 })
    .withMessage("Date of Birth is required"),
  body("location").isLength({ min: 3 }).withMessage("Location is required"),
  body("email").isLength({ min: 3 }).withMessage("Email is required"),
  body("phone").isLength({ min: 3 }).withMessage("Phone is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const homeAboutData = {
      prefix: req.body.prefix,
      name: req.body.name,
      date_of_birth: req.body.date_of_birth,
      location: req.body.location,
    };

    const metaData = {
      email: req.body.email,
      phone: req.body.phone,
    };

    updateHome(req.body.language, homeAboutData);
    updateHomeMetaData(metaData);

    return res.status(200).json({
      message: "Home About Updated Successfully",
    });
  },
];

export const homeExperienceController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const homeExperienceData = {
      title: req.body.title,
      description: req.body.description,
    };

    await createHomeExperienceService(homeExperienceData);

    return res.status(200).json({
      message: "Home Experience Created Successfully",
    });
  },
];

export const homeExperienceDeleteController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  const experienceId = req.params.id;

  await deleteExperience(Number(experienceId));

  return res.status(200).json({
    message: "Home Experience Deleted Successfully",
  });
};

export const homeEducationController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const homeEducationData = {
      title: req.body.title,
      description: req.body.description,
    };

    await createHomeEducationService(homeEducationData);

    return res.status(200).json({
      message: "Home Education Created Successfully",
    });
  },
];

export const homeEducationDeleteController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  const educationId = req.params.id;

  await deleteEducation(Number(educationId));

  return res.status(200).json({
    message: "Home Education Deleted Successfully",
  });
};

export const homeMetaUpdateController = [
  body("email").isLength({ min: 3 }).withMessage("Email is required"),
  body("phone").isLength({ min: 3 }).withMessage("Phone is required"),
  body("github").isLength({ min: 3 }).withMessage("Github is required"),
  body("linkedin").isLength({ min: 3 }).withMessage("Linkedin is required"),
  body("facebook").isLength({ min: 3 }).withMessage("Facebook is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const homeMetaData = {
      email: req.body.email,
      phone: req.body.phone,
      github: req.body.github,
      linkedin: req.body.linkedin,
      facebook: req.body.facebook,
    };

    await updateHomeMetaData(homeMetaData);

    return res.status(200).json({
      message: "Home Contact Updated Successfully",
    });
  },
];

export const upload_profile_image = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cloudinaryUrls = req.cloudinaryUrls;

    if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
      res.status(400).json({ error: "No images uploaded" });
      return;
    }

    const oldImage = await getHomeProfileImage();

    if (oldImage) {
      await deleteImage(oldImage.public_id);
    }

    const ImageData = {
      public_id: cloudinaryUrls[0].public_id,
      url: cloudinaryUrls[0].url,
      category: "profile",
      imageable_id: 0,
      imageable_type: "Home",
    };

    await storedImage(ImageData);

    res.status(200).json({
      message: "Images uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload images" });
  }
};

export const delete_profile_image = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  const oldImage = await getHomeProfileImage();

  if (oldImage) {
    await deleteImage(oldImage.public_id);
  }

  return res.status(200).json({
    message: "Images deleted successfully",
  });
};

export const upload_cv = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cloudinaryUrls = req.cloudinaryUrls;
    const language = req.body.language;

    if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
      res.status(400).json({ error: "No images uploaded" });
      return;
    }

    const oldCV = await getCV(language);

    if (oldCV) {
      await deleteImage(oldCV.public_id);
    }

    const ImageData = {
      public_id: cloudinaryUrls[0].public_id,
      url: cloudinaryUrls[0].url,
      category: "cv-" + language,
      imageable_id: 0,
      imageable_type: "Home",
    };

    await storedImage(ImageData);

    res.status(200).json({
      message: "CV uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload cv" });
  }
};

export const delete_cv = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  const oldCV = await getCV(req.params.language);

  if (oldCV) {
    await deleteImage(oldCV.public_id);
  }

  return res.status(200).json({
    message: "Images deleted successfully",
  });
};
