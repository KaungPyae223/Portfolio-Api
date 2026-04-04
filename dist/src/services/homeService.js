"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEducation = exports.createHomeEducationService = exports.getSkillImage = exports.skillDelete = exports.storeSkill = exports.updateHomeMetaData = exports.getAllHome = exports.getHomeProjects = exports.getHomeCertificates = exports.updateHome = void 0;
const prisma_1 = require("../../lib/prisma");
const updateHome = async (language, homeData) => {
    const updateHome = await prisma_1.prisma.home.updateMany({
        where: {
            language: language,
        },
        data: homeData,
    });
};
exports.updateHome = updateHome;
const getHomeCertificates = async () => {
    const certificates = await prisma_1.prisma.certificate.findMany({
        where: {
            is_featured: true,
        },
    });
    const ids = certificates.map((certificate) => certificate.id);
    const images = await prisma_1.prisma.image.findMany({
        where: {
            imageable_id: {
                in: ids,
            },
            imageable_type: "Certificate",
        },
    });
    const certificateWithImages = certificates.map((certificate) => {
        const image = images.find((image) => image.imageable_id === certificate.id);
        return {
            image: image?.url || null,
            ...certificate,
        };
    });
    return certificateWithImages;
};
exports.getHomeCertificates = getHomeCertificates;
const getHomeProjects = async () => {
    const projects = await prisma_1.prisma.project.findMany({
        where: {
            is_featured: true,
        },
    });
    const ids = projects.map((project) => project.id);
    const images = await prisma_1.prisma.image.findMany({
        where: {
            imageable_id: {
                in: ids,
            },
            category: "project-profile-image",
            imageable_type: "Project",
        },
    });
    const projectWithImages = projects.map((project) => {
        const image = images.find((image) => image.imageable_id === project.id);
        return {
            image: image?.url || null,
            ...project,
        };
    });
    return projectWithImages;
};
exports.getHomeProjects = getHomeProjects;
const getAllHome = async () => {
    const getAllHomeData = await prisma_1.prisma.home.findMany();
    return getAllHomeData;
};
exports.getAllHome = getAllHome;
const updateHomeMetaData = async (metaData) => {
    const updateMetaData = await prisma_1.prisma.home.updateMany({
        data: metaData,
    });
};
exports.updateHomeMetaData = updateHomeMetaData;
const storeSkill = async (name) => {
    const skill = await prisma_1.prisma.skill.create({
        data: {
            name: name,
        },
    });
    return skill;
};
exports.storeSkill = storeSkill;
const skillDelete = async (id) => {
    await prisma_1.prisma.skill.delete({
        where: {
            id: id,
        },
    });
};
exports.skillDelete = skillDelete;
const getSkillImage = async (id) => {
    const skill = await prisma_1.prisma.image.findFirst({
        where: {
            imageable_id: id,
            imageable_type: "Skill",
        },
    });
    return skill;
};
exports.getSkillImage = getSkillImage;
const createHomeEducationService = async (educationData) => {
    await prisma_1.prisma.education.create({
        data: {
            ...educationData,
            educationable_type: "Home",
        },
    });
};
exports.createHomeEducationService = createHomeEducationService;
const deleteEducation = async (id) => {
    await prisma_1.prisma.education.delete({
        where: {
            id: id,
        },
    });
};
exports.deleteEducation = deleteEducation;
//# sourceMappingURL=homeService.js.map