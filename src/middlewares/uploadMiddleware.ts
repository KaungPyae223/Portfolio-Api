import { Response, NextFunction } from "express";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import { MiddlewareRequest } from "../types/middlewareRequest";
import { createError } from "../utils/error";

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

export const uploadToCloudinary = async (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files && !req.file) {
      return next();
    }

    const files = req.files as CloudinaryFile[] | undefined;
    const file = req.file as CloudinaryFile | undefined;

    const filesToUpload = files ? files : file ? [file] : [];

    if (filesToUpload.length === 0) {
      return next(createError("No Image to Upload", 400, "Bad Request"));
    }

    const cloudinaryUrls: any[] = [];

    for (const file of filesToUpload) {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "uploads",
            access_mode: "public",
            timeout: 120000,
          },
          (
            err: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (err) {
              console.error("Cloudinary upload error:", err);
              reject(err);
              return;
            }
            if (!result) {
              reject(new Error("Cloudinary upload result is undefined"));
              return;
            }
            resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });

      cloudinaryUrls.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    req.cloudinaryUrls = cloudinaryUrls;
    next();
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};
