import { prisma } from "../../lib/prisma";

export const storedImage = async (imageData: any) => {
  const updateHome = await prisma.image.create({
    data: imageData,
  });
};

export const getHomeProfileImage = async () => {
  const profileImage = await prisma.image.findFirst({
    where: {
      category: "profile",
      imageable_type: "Home",
    },
  });

  return profileImage;
};

export const getCV = async (language: string) => {
  const profileImage = await prisma.image.findFirst({
    where: {
      category: "cv-" + language,
      imageable_type: "Home",
    },
  });

  return profileImage;
};

export const getAllCV = async () => {
  const profileImage = await prisma.image.findMany({
    where: {
      imageable_type: "Home",
      category: {
        startsWith: "cv-",
      },
    },
  });

  return profileImage;
};

export const deleteImageFromDB = async (public_id: string) => {
  await prisma.image.deleteMany({
    where: {
      public_id,
    },
  });
};
