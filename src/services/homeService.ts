import { prisma } from "../../lib/prisma";

export const updateHome = async (language: string, homeData: any) => {
  const updateHome = await prisma.home.updateMany({
    where: {
      language: language,
    },
    data: homeData,
  });
};

export const getAllHome = async () => {
  const getAllHomeData = await prisma.home.findMany();
  return getAllHomeData;
};

export const updateHomeMetaData = async (metaData: any) => {
  const updateMetaData = await prisma.home.updateMany({
    data: metaData,
  });
};

export const storeSkill = async (name: string) => {
  const skill = await prisma.skill.create({
    data: {
      name: name,
    },
  });

  return skill;
};

export const skillDelete = async (id: number) => {
  await prisma.skill.delete({
    where: {
      id: id,
    },
  });
};

export const getSkillImage = async (id: number) => {
  const skill = await prisma.image.findFirst({
    where: {
      imageable_id: id,
      imageable_type: "Skill",
    },
  });

  return skill;
};
