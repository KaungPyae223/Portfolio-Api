import { prisma } from "../../lib/prisma";

export const getHomeService = async (language: string) => {
  const getUserSideService = await prisma.home.findFirst({
    where: {
      language: language,
    },
  });
  return getUserSideService;
};

export const getSkillsService = async () => {
  const getUserSideService = await prisma.skill.findMany();
  return getUserSideService;
};

export const getHomeProjectsService = async () => {
  const getUserSideService = await prisma.project.findMany({
    where: {
      set_home: true,
    },
  });
  return getUserSideService;
};

export const getHomeExperiencesService = async () => {
  const getUserSideService = await prisma.experience.findMany({
    where: {
      experienceable_type: "Home",
    },
  });
  return getUserSideService;
};

export const createHomeExperienceService = async (experienceData: any) => {
  await prisma.experience.create({
    data: {
      ...experienceData,
      experienceable_type: "Home",
    },
  });
};

export const deleteExperience = async (id: number) => {
  await prisma.experience.delete({
    where: {
      id: id,
    },
  });
};

export const getHomeEducationService = async () => {
  const getUserSideService = await prisma.education.findMany({
    where: {
      educationable_type: "Home",
    },
  });
  return getUserSideService;
};

export const createHomeEducationService = async (educationData: any) => {
  await prisma.education.create({
    data: {
      ...educationData,
      educationable_type: "Home",
    },
  });
};

export const deleteEducation = async (id: number) => {
  await prisma.education.delete({
    where: {
      id: id,
    },
  });
};
