import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { validationError } from "../utils/validationHandler";
import {
  getTotalUsers,
  getUserByEmail,
  getUserByID,
  storedUser,
  updateUser,
} from "../services/authService";
import { checkUserExist, generateJWTTokens } from "../utils/auth";
import * as bcrypt from "bcrypt";
import { CustomErrorType } from "../types/error";
import { MiddlewareRequest } from "../types/middlewareRequest";
import { User } from "../../generated/prisma/client";
import { errorCode } from "../config/errorCode";

export const registerController = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol"
    ),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    validationError(errors);

    const userExist = await getTotalUsers();

    checkUserExist(userExist);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const userData = {
      email: req.body.email,
      password: hashPassword,
    };

    const user = await storedUser(userData);

    const { accessToken, refreshToken } = generateJWTTokens(user);

    await updateUser(user.id, {
      random_token: refreshToken,
    });

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Register successfully",
      });
  },
];

export const loginController = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Invalid password"),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });

    validationError(errors);

    const user = await getUserByEmail(req.body.email);

    if (!user) {
      const error: CustomErrorType = new Error("Invalid email or password");
      error.status = 409;
      error.err_code = errorCode.invalidCredentials;
      throw error;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      const error: CustomErrorType = new Error("Invalid email or password");
      error.status = 409;
      error.err_code = errorCode.invalidCredentials;
      throw error;
    }

    const { accessToken, refreshToken } = generateJWTTokens(user);

    await updateUser(user.id, {
      random_token: refreshToken,
    });

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Login successfully",
      });
  },
];

export const changePasswordController = [
  body("old_password").isLength({ min: 6 }).withMessage("Invalid password"),
  body("new_password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol"
    ),

  async (req: MiddlewareRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    validationError(errors);

    const user = (await getUserByID(req.userID!)) as User;

    const isMatch = await bcrypt.compare(req.body.old_password, user.password);

    if (!isMatch) {
      const error: CustomErrorType = new Error("Invalid old password");
      error.status = 409;
      error.err_code = errorCode.invalidCredentials;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.new_password, salt);

    await updateUser(user.id, {
      password: hashPassword,
    });

    res.json({
      message: "Change password successfully",
    });
  },
];

export const logOutController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  await updateUser(req.userID!, {
    random_token: null,
  });

  res.json({
    message: "Log out successfully",
  });
};

export const checkAuthController = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
) => {
  
  res.json("me");
}


