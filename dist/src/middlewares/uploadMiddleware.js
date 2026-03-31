"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const error_1 = require("../utils/error");
const uploadToCloudinary = async (req, res, next) => {
    try {
        if (!req.files && !req.file) {
            return next();
        }
        const files = req.files;
        const file = req.file;
        const filesToUpload = files ? files : file ? [file] : [];
        if (filesToUpload.length === 0) {
            return next((0, error_1.createError)("No Image to Upload", 400, "Bad Request"));
        }
        const cloudinaryUrls = [];
        for (const file of filesToUpload) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: "auto",
                    folder: "uploads",
                    access_mode: "public",
                    timeout: 120000,
                }, (err, result) => {
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
                });
                uploadStream.end(file.buffer);
            });
            cloudinaryUrls.push({
                url: result.secure_url,
                public_id: result.public_id,
            });
        }
        req.cloudinaryUrls = cloudinaryUrls;
        next();
    }
    catch (error) {
        console.error("Error in uploadToCloudinary middleware:", error);
        next(error);
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=uploadMiddleware.js.map