import { NextFunction, Request, Response } from "express";
import {
  getHomeEducationService,
  getHomeExperiencesService,
  getHomeService,
  getSkillsService,
} from "../services/userSideService";

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
