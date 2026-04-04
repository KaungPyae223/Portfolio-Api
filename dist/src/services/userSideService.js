"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAboutExperienceService = exports.getAboutEducationService = exports.getAboutService = exports.getHomeEducationService = exports.deleteExperience = exports.createHomeExperienceService = exports.getHomeExperiencesService = exports.getHomeProjectsService = exports.getSkillsService = exports.getHomeService = void 0;
const prisma_1 = require("../../lib/prisma");
const getHomeService = async (language) => {
    const getUserSideService = await prisma_1.prisma.home.findFirst({
        where: {
            language: language,
        },
    });
    return getUserSideService;
};
exports.getHomeService = getHomeService;
const getSkillsService = async () => {
    const skills = await prisma_1.prisma.skill.findMany();
    const skillInfo = await Promise.all(skills.map(async (data) => {
        const image = await prisma_1.prisma.image.findFirst({
            where: {
                imageable_type: "Skill",
                imageable_id: data.id,
            },
        });
        return {
            id: data.id,
            name: data.name,
            image: image?.url || null,
        };
    }));
    return skillInfo;
};
exports.getSkillsService = getSkillsService;
const getHomeProjectsService = async () => {
    const getUserSideService = await prisma_1.prisma.project.findMany();
    return getUserSideService;
};
exports.getHomeProjectsService = getHomeProjectsService;
const getHomeExperiencesService = async () => {
    const getUserSideService = await prisma_1.prisma.experience.findMany({
        where: {
            experienceable_type: "Home",
        },
    });
    return getUserSideService;
};
exports.getHomeExperiencesService = getHomeExperiencesService;
const createHomeExperienceService = async (experienceData) => {
    await prisma_1.prisma.experience.create({
        data: {
            ...experienceData,
            experienceable_type: "Home",
        },
    });
};
exports.createHomeExperienceService = createHomeExperienceService;
const deleteExperience = async (id) => {
    await prisma_1.prisma.experience.delete({
        where: {
            id: id,
        },
    });
};
exports.deleteExperience = deleteExperience;
const getHomeEducationService = async () => {
    const getUserSideService = await prisma_1.prisma.education.findMany({
        where: {
            educationable_type: "Home",
        },
    });
    return getUserSideService;
};
exports.getHomeEducationService = getHomeEducationService;
const getAboutService = async (language) => {
    const about = await prisma_1.prisma.about.findFirst({
        where: {
            language: language,
        },
    });
    return about;
};
exports.getAboutService = getAboutService;
const getAboutEducationService = async (language) => {
    const getUserSideService = await prisma_1.prisma.education.findMany({
        where: {
            educationable_type: "About",
            language: language,
        },
    });
    return getUserSideService;
};
exports.getAboutEducationService = getAboutEducationService;
const getAboutExperienceService = async (language) => {
    const getUserSideService = await prisma_1.prisma.experience.findMany({
        where: {
            experienceable_type: "About",
            language: language,
        },
    });
    return getUserSideService;
};
exports.getAboutExperienceService = getAboutExperienceService;
//# sourceMappingURL=userSideService.js.map