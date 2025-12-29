import { Home } from "../../generated/prisma";
import { prisma } from "../../lib/prisma";

export const updateHome = async (
  language: string,
  homeData: any
) => {
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
