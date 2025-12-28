import { CustomErrorType } from "../types/error";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../../generated/prisma/client";
import { errorCode } from "../config/errorCode";

export const checkUserExist = (userCount: number) => {
  if (userCount) {
    const error: CustomErrorType = new Error("There is a user in your system");
    error.status = 409;
    error.err_code = errorCode.userExist;
    throw error;
  }
};

export const generateJWTTokens = (user: User) => {
  const accessTokenPayLoad = {
    id: user.id,
  };

  const refreshTokenPayLoad = {
    id: user.id,
    random_token: randomBytes(32).toString("hex"),
    email: user.email,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

  if (!refreshSecret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }

  const accessToken = jwt.sign(accessTokenPayLoad, secret, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(refreshTokenPayLoad, refreshSecret, {
    expiresIn: "7d",
  });

  return {
    accessToken,
    refreshToken,
  };
};
