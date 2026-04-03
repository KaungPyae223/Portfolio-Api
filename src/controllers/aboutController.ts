import { NextFunction, Request, Response } from "express";
import { MiddlewareRequest } from "../types/middlewareRequest";
import {
  createAboutEducationService,
  createAboutExperienceService,
  getAllAboutService,
  getAllEducationService,
  getAllExperienceService,
  updateAbout,
  updateAboutEducationService,
  updateAboutExperienceService,
} from "../services/aboutService";
import { getHomeProfileImage } from "../services/imageService";
import { body, validationResult } from "express-validator";
import { validationError } from "../utils/validationHandler";
import {
  getAboutEducationService,
  getAboutExperienceService,
  getAboutService,
} from "../services/userSideService";
import { descriptions } from "jest-config";

export const getAboutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const language = (req.query.language as string) || "English";

  const aboutIntro = await getAboutService(language);
  const profileImage = await getHomeProfileImage();
  const aboutEducation = await getAboutEducationService(language);
  const aboutExperience = await getAboutExperienceService(language);

  const data = {
    ...aboutIntro,
    profileURL: profileImage?.url,
    aboutEducation,
    aboutExperience,
  };

  return res.status(200).json(data);
};

export const getAboutIntroController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const aboutIntro = await getAllAboutService();

  return res.status(200).json(aboutIntro);
};

export const updateAboutController = [
  body("title").isLength({ min: 1 }).withMessage("Title is required"),
  body("subtitle").isLength({ min: 1 }).withMessage("Subtitle is required"),
  body("first_paragraph")
    .isLength({ min: 3 })
    .withMessage("First paragraph is required"),
  body("second_paragraph")
    .isLength({ min: 3 })
    .withMessage("Second paragraph is required"),
  body("language").isLength({ min: 1 }).withMessage("Language is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const aboutData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      first_paragraph: req.body.first_paragraph,
      second_paragraph: req.body.second_paragraph,
    };

    await updateAbout(req.body.language, aboutData);

    return res.status(200).json({
      message: "About Updated Successfully",
    });
  },
];

export const getAllAboutEducationController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const aboutEducation = await getAllEducationService();

  return res.status(200).json(aboutEducation);
};

export const createAboutEducationController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  body("language").isLength({ min: 1 }).withMessage("Language is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const aboutEducationData = {
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
    };

    await createAboutEducationService(aboutEducationData);

    return res.status(200).json({
      message: "About Education Created Successfully",
    });
  },
];

export const updateAboutEducationController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  body("language").isLength({ min: 1 }).withMessage("Language is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const id = req.params.id;

    const aboutExperienceData = {
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
    };

    await updateAboutEducationService(id, aboutExperienceData);

    return res.status(200).json({
      message: "About Education Updated Successfully",
    });
  },
];

export const getAllAboutExperienceController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
) => {
  const aboutExperience = await getAllExperienceService();

  return res.status(200).json(aboutExperience);
};

export const createAboutExperienceController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  body("language").isLength({ min: 1 }).withMessage("Language is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const aboutExperienceData = {
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
    };

    await createAboutExperienceService(aboutExperienceData);

    return res.status(200).json({
      message: "About Experience Created Successfully",
    });
  },
];

export const updateAboutExperienceController = [
  body("title").isLength({ min: 3 }).withMessage("Title is required"),
  body("description")
    .isLength({ min: 3 })
    .withMessage("Description is required"),
  body("language").isLength({ min: 1 }).withMessage("Language is required"),
  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const id = req.params.id;

    const aboutExperienceData = {
      title: req.body.title,
      description: req.body.description,
      language: req.body.language,
    };

    await updateAboutExperienceService(id, aboutExperienceData);

    return res.status(200).json({
      message: "About Experience Updated Successfully",
    });
  },
];
