import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Use memory storage to handle files in memory
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (!file.mimetype.match(/jpeg|jpg|png|gif|webp|pdf$/i)) {
    cb(new Error("Only image files are allowed"));
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

export default upload;
