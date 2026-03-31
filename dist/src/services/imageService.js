"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromDB = exports.getAllCV = exports.getCV = exports.getHomeProfileImage = exports.storedImage = void 0;
const prisma_1 = require("../../lib/prisma");
const storedImage = async (imageData) => {
    return await prisma_1.prisma.image.create({
        data: imageData,
    });
};
exports.storedImage = storedImage;
const getHomeProfileImage = async () => {
    const profileImage = await prisma_1.prisma.image.findFirst({
        where: {
            category: "profile",
            imageable_type: "Home",
        },
    });
    return profileImage;
};
exports.getHomeProfileImage = getHomeProfileImage;
const getCV = async (language) => {
    const profileImage = await prisma_1.prisma.image.findFirst({
        where: {
            category: "cv-" + language,
            imageable_type: "Home",
        },
    });
    return profileImage;
};
exports.getCV = getCV;
const getAllCV = async () => {
    const profileImage = await prisma_1.prisma.image.findMany({
        where: {
            imageable_type: "Home",
            category: {
                startsWith: "cv-",
            },
        },
    });
    return profileImage;
};
exports.getAllCV = getAllCV;
const deleteImageFromDB = async (public_id) => {
    await prisma_1.prisma.image.deleteMany({
        where: {
            public_id,
        },
    });
};
exports.deleteImageFromDB = deleteImageFromDB;
//# sourceMappingURL=imageService.js.map