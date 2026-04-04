"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutExperienceService = exports.createAboutExperienceService = exports.getAllExperienceService = exports.updateAboutEducationService = exports.createAboutEducationService = exports.updateAbout = exports.getAllEducationService = exports.getAllAboutService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllAboutService = async () => {
    const about = await prisma_1.prisma.about.findMany();
    return about;
};
exports.getAllAboutService = getAllAboutService;
const getAllEducationService = async () => {
    const education = await prisma_1.prisma.education.findMany({
        where: {
            educationable_type: "About",
        },
    });
    return education;
};
exports.getAllEducationService = getAllEducationService;
const updateAbout = async (language, aboutData) => {
    const updateAbout = await prisma_1.prisma.about.updateMany({
        where: {
            language: language,
        },
        data: aboutData,
    });
    return updateAbout;
};
exports.updateAbout = updateAbout;
const createAboutEducationService = async (educationData) => {
    await prisma_1.prisma.education.create({
        data: {
            ...educationData,
            educationable_type: "About",
        },
    });
};
exports.createAboutEducationService = createAboutEducationService;
const updateAboutEducationService = async (id, educationData) => {
    await prisma_1.prisma.education.update({
        where: {
            id: Number(id),
        },
        data: {
            title: educationData.title,
            description: educationData.description,
            language: educationData.language,
        },
    });
};
exports.updateAboutEducationService = updateAboutEducationService;
const getAllExperienceService = async () => {
    const experience = await prisma_1.prisma.experience.findMany({
        where: {
            experienceable_type: "About",
        },
    });
    return experience;
};
exports.getAllExperienceService = getAllExperienceService;
const createAboutExperienceService = async (experienceData) => {
    await prisma_1.prisma.experience.create({
        data: {
            ...experienceData,
            experienceable_type: "About",
        },
    });
};
exports.createAboutExperienceService = createAboutExperienceService;
const updateAboutExperienceService = async (id, experienceData) => {
    await prisma_1.prisma.experience.update({
        where: {
            id: Number(id),
        },
        data: {
            title: experienceData.title,
            description: experienceData.description,
            language: experienceData.language,
        },
    });
};
exports.updateAboutExperienceService = updateAboutExperienceService;
//# sourceMappingURL=aboutService.js.map