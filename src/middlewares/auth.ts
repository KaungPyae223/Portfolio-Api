import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomErrorType } from "../types/error";
import { MiddlewareRequest } from "../types/middlewareRequest";
import { errorCode } from "../config/errorCode";
import { getUserByEmail, updateUser } from "../services/authService";
import { generateJWTTokens } from "../utils/auth";
import { createError } from "../utils/error";

export const authMiddleware = async (
  req: MiddlewareRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { accessToken, refreshToken } = req.cookies ?? {};

  if (!refreshToken) {
    return next(createError("Unauthorized", 401, errorCode.unauthorized));
  }

  const generateNewTokens = async () => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    let decoded;

    if (!secret) {
      return next(
        createError("Server configuration error", 500, errorCode.serverError)
      );
    }

    try {
      decoded = jwt.verify(refreshToken, secret) as JwtPayload;
      const email = decoded.email;
      const user = await getUserByEmail(email);

      if (!user) {
        return next(
          createError(
            "You are not an authenticated user",
            401,
            errorCode.expiredAccessToken
          )
        );
      }

      if (user.random_token !== refreshToken) {
        return next(
          createError(
            "You are not an authenticated user",
            401,
            errorCode.expiredAccessToken
          )
        );
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
      return next(
        createError(
          "Refresh Token is Expired",
          401,
          errorCode.expiredAccessToken
        )
      );
    }
  };

  if (!accessToken) {
    await generateNewTokens();
  } else {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return next(
        createError("Server configuration error", 500, errorCode.serverError)
      );
    }

    try {
      const decoded = jwt.verify(accessToken, secret) as JwtPayload & {
        id: string;
      };
      req.userID = parseInt(decoded.id);
      next();
    } catch (err: any) {
      if (err.name == "TokenExpiredError") {
        await generateNewTokens();
      } else {
        return next(
          createError(
            "Access Token is invalid",
            401,
            errorCode.expiredAccessToken
          )
        );
      }
    }
  }
};
