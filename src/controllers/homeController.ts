import { NextFunction, Request, Response } from "express";
import {
  getHomeEducationService,
  getHomeExperiencesService,
  getHomeService,
  getSkillsService,
} from "../services/userSideService";
import { body, validationResult } from "express-validator";
import { validationError } from "../utils/validationHandler";
import { getAllHome, updateHome } from "../services/homeService";
import { MiddlewareRequest } from "../types/middlewareRequest";

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

  const homeData = {
    ...home,
    skills,
    experiences,
    educations,
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
}

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
