import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const getTotalUsers = async () : Promise<number> => {
  const totalUsers = await prisma.user.count();
  return totalUsers;
};

export const storedUser = async (userData: any) : Promise<User> => {
  const storedUser = await prisma.user.create({
    data: userData,
  });
  return storedUser;
};

export const updateUser = async (id: number, userData: any) : Promise<User> => {
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: userData,
  });
  return updateUser;
};

export const getUserByEmail = async (email: string) : Promise<User | null> => {
  const getUserByEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return getUserByEmail;
};

export const getUserByID = async (id: number) : Promise<User | null> => {
  const getUserByID = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return getUserByID;
};
