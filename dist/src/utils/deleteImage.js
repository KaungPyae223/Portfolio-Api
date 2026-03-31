"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = void 0;
const cloudinary_1 = require("cloudinary");
const imageService_1 = require("../services/imageService");
const deleteImage = async (public_id) => {
    await cloudinary_1.v2.uploader.destroy(public_id, {
        invalidate: true, // Invalidate CDN cache
        resource_type: "raw", // 'image', 'video', or 'raw'
    });
    await (0, imageService_1.deleteImageFromDB)(public_id);
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=deleteImage.js.map