import { prisma } from "../../lib/prisma";

export const getAllAboutService = async () => {
  const about = await prisma.about.findMany();

  return about;
};

export const getAllEducationService = async () => {
  const education = await prisma.education.findMany({
    where: {
      educationable_type: "About",
    },
  });

  return education;
};

export const updateAbout = async (language: string, aboutData: any) => {
  const updateAbout = await prisma.about.updateMany({
    where: {
      language: language,
    },
    data: aboutData,
  });

  return updateAbout;
};

export const createAboutEducationService = async (educationData: any) => {
  await prisma.education.create({
    data: {
      ...educationData,
      educationable_type: "About",
    },
  });
};

export const updateAboutEducationService = async (
  id: string,
  educationData: any,
) => {
  await prisma.education.update({
    where: {
      id: Number(id),
    },
    data: {
      title: educationData.title,
      description: educationData.description,
      language: educationData.language,
    },
  });
};

export const getAllExperienceService = async () => {
  const experience = await prisma.experience.findMany({
    where: {
      experienceable_type: "About",
    },
  });

  return experience;
};

export const createAboutExperienceService = async (experienceData: any) => {
  await prisma.experience.create({
    data: {
      ...experienceData,
      experienceable_type: "About",
    },
  });
};

export const updateAboutExperienceService = async (
  id: string,
  experienceData: any,
) => {
  await prisma.experience.update({
    where: {
      id: Number(id),
    },
    data: {
      title: experienceData.title,
      description: experienceData.description,
      language: experienceData.language,
    },
  });
};
