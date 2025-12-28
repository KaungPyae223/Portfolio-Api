import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomErrorType } from "../types/error";
import { MiddlewareRequest } from "../types/middlewareRequest";
import { errorCode } from "../config/errorCode";
import { getUserByEmail, updateUser } from "../services/authService";
import { generateJWTTokens } from "../utils/auth";

export const authMiddleware = (
  req: MiddlewareRequest,
  _res: Response,
  next: NextFunction
): void => {
  const { accessToken, refreshToken } = req.cookies ?? {};

  if (!refreshToken) {
    const error: CustomErrorType = new Error("Unauthorized");
    error.status = 401;
    error.err_code = errorCode.unauthorized;
    return next(error);
  }

  const generateNewTokens = async () => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    let decoded;

    if (!secret) {
      const error: CustomErrorType = new Error("Server configuration error");
      error.status = 500;
      error.err_code = errorCode.serverError;
      return next(error);
    }

    try {
      decoded = jwt.verify(refreshToken, secret) as JwtPayload;
      const email = decoded.email;
      const user = await getUserByEmail(email);

      if (!user) {
        const error: CustomErrorType = new Error(
          "You are not unauthenticated user"
        );
        error.status = 401;
        error.err_code = errorCode.expiredAccessToken;
        return next(error);
      }

      if (user.random_token != refreshToken) {
        const error: CustomErrorType = new Error(
          "You are not unauthenticated user"
        );
        error.status = 401;
        error.err_code = errorCode.expiredAccessToken;
        return next(error);
      }

      const tokens = generateJWTTokens(user);

      await updateUser(user.id, {
        random_token: tokens.refreshToken,
      });

      _res
        .cookie("accessToken", tokens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

      req.userID = user.id;
      next();
    } catch (err) {
      const error: CustomErrorType = new Error("Refresh Token is Expired");
      error.status = 401;
      error.err_code = errorCode.expiredAccessToken;
      return next(error);
    }
  };

  if (!accessToken) {
    generateNewTokens();
  } else {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      const error: CustomErrorType = new Error("Server configuration error");
      error.status = 500;
      error.err_code = errorCode.serverError;
      return next(error);
    }

    try {
      const decoded = jwt.verify(accessToken, secret) as JwtPayload & {
        id: string;
      };
      req.userID = parseInt(decoded.id);
      next();
    } catch (err: any) {
      if (err.name == "TokenExpiredError") {
        generateNewTokens();
      } else {
        const error: CustomErrorType = new Error("Access Token is invalid");
        error.status = 401;
        error.err_code = errorCode.expiredAccessToken;
        return next(error);
      }
    }
  }
};
