import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromDB } from "../services/imageService";

export const deleteImage = async (public_id: string) => {
  await cloudinary.uploader.destroy(public_id, {
    invalidate: true, // Invalidate CDN cache
    resource_type: "image", // 'image', 'video', or 'raw'
  });

  await deleteImageFromDB(public_id);
};
