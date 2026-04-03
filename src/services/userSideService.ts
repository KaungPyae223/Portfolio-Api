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
  const skills = await prisma.skill.findMany();

  const skillInfo = await Promise.all(
    skills.map(async (data) => {
      const image = await prisma.image.findFirst({
        where: {
          imageable_type: "Skill",
          imageable_id: data.id,
        },
      });

      return {
        id: data.id,
        name: data.name,
        image: image?.url || null,
      };
    }),
  );

  return skillInfo;
};

export const getHomeProjectsService = async () => {
  const getUserSideService = await prisma.project.findMany();
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

export const getAboutService = async (language: string) => {
  const about = await prisma.about.findFirst({
    where: {
      language: language,
    },
  });

  return about;
};

export const getAboutEducationService = async (language: string) => {
  const getUserSideService = await prisma.education.findMany({
    where: {
      educationable_type: "About",
      language: language,
    },
  });
  return getUserSideService;
};

export const getAboutExperienceService = async (language: string) => {
  const getUserSideService = await prisma.experience.findMany({
    where: {
      experienceable_type: "About",
      language: language,
    },
  });
  return getUserSideService;
};
