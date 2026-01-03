import { Request } from "express";

export type MiddlewareRequest = Request & {
  userID?: number;
  cloudinaryUrls?: any[];
};
