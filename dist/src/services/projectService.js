"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeaturedProjectService = exports.getProject = exports.getProjectDetails = exports.deleteProjectService = exports.updateProjectService = exports.getProjectDetailsImages = exports.getProjectImage = exports.createProjectService = void 0;
const prisma_1 = require("../../lib/prisma");
const createProjectService = async (projectData) => {
    const project = await prisma_1.prisma.project.create({
        data: projectData,
    });
    return project;
};
exports.createProjectService = createProjectService;
const getProjectImage = async (id) => {
    const image = await prisma_1.prisma.image.findFirst({
        where: {
            imageable_id: Number(id),
            imageable_type: "Project",
            category: "project-profile-image",
        },
    });
    return image;
};
exports.getProjectImage = getProjectImage;
const getProjectDetailsImages = async (id) => {
    const images = await prisma_1.prisma.image.findMany({
        where: {
            imageable_id: Number(id),
            imageable_type: "Project",
            category: "project-details-image",
        },
    });
    return images;
};
exports.getProjectDetailsImages = getProjectDetailsImages;
const updateProjectService = async (id, projectData) => {
    const project = await prisma_1.prisma.project.update({
        where: {
            id: Number(id),
        },
        data: projectData,
    });
    return project;
};
exports.updateProjectService = updateProjectService;
const deleteProjectService = async (id) => {
    const project = await prisma_1.prisma.project.delete({
        where: {
            id: Number(id),
        },
    });
    return project;
};
exports.deleteProjectService = deleteProjectService;
const getProjectDetails = async (id) => {
    const project = await prisma_1.prisma.project.findUnique({
        where: {
            id: Number(id),
        },
    });
    return project;
};
exports.getProjectDetails = getProjectDetails;
const getProject = async (q) => {
    const projects = await prisma_1.prisma.project.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: q,
                    },
                },
                {
                    description: {
                        contains: q,
                    },
                },
                {
                    technologies: {
                        contains: q,
                    },
                },
            ],
        },
    });
    const ids = projects.map((project) => project.id);
    const images = await prisma_1.prisma.image.findMany({
        where: {
            imageable_id: {
                in: ids,
            },
            imageable_type: "Project",
            category: "project-profile-image",
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
exports.getProject = getProject;
const updateFeaturedProjectService = async (id) => {
    const project = await prisma_1.prisma.project.findUnique({
        where: {
            id: Number(id),
        },
    });
    const projectUpdate = await prisma_1.prisma.project.update({
        where: {
            id: Number(id),
        },
        data: {
            is_featured: !project?.is_featured,
        },
    });
    return projectUpdate;
};
exports.updateFeaturedProjectService = updateFeaturedProjectService;
//# sourceMappingURL=projectService.js.map