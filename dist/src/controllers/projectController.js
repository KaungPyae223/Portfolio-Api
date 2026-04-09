"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeaturedProjectController = exports.getProjectController = exports.getProjectDetailsController = exports.deleteProjectController = exports.updateProjectController = exports.deleteProjectDetailsImage = exports.createProjectDetailsImages = exports.createProjectController = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = require("../utils/validationHandler");
const imageService_1 = require("../services/imageService");
const errorCode_1 = require("../config/errorCode");
const deleteImage_1 = require("../utils/deleteImage");
const projectService_1 = require("../services/projectService");
exports.createProjectController = [
    (0, express_validator_1.body)("name").isLength({ min: 3 }).withMessage("Name is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    (0, express_validator_1.body)("technologies").isLength({ min: 1 }).withMessage("Url is required"),
    (0, express_validator_1.body)("demo_url").optional(),
    (0, express_validator_1.body)("front_end").optional(),
    (0, express_validator_1.body)("back_end").optional(),
    (0, express_validator_1.body)("doc_url").optional(),
    (0, express_validator_1.body)("role").isLength({ min: 3 }).withMessage("Role is required"),
    (0, express_validator_1.body)("challenge").isLength({ min: 3 }).withMessage("Challenge is required"),
    (0, express_validator_1.body)("solutions").isLength({ min: 3 }).withMessage("Solutions is required"),
    (0, express_validator_1.body)("key_feature")
        .isLength({ min: 3 })
        .withMessage("Key feature is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        try {
            const cloudinaryUrls = req.cloudinaryUrls;
            if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
                const error = new Error("No images uploaded");
                error.status = 400;
                error.err_code = errorCode_1.errorCode.invalidCredentials;
                throw error;
            }
            const projectData = {
                name: req.body.name,
                description: req.body.description,
                technologies: req.body.technologies,
                demo_url: req.body.demo_url,
                front_end: req.body.front_end,
                back_end: req.body.back_end,
                doc_url: req.body.doc_url,
                role: req.body.role,
                challenge: req.body.challenge,
                solutions: req.body.solutions,
                key_feature: req.body.key_feature,
            };
            const project = await (0, projectService_1.createProjectService)(projectData);
            const ImageData = {
                public_id: cloudinaryUrls[0].public_id,
                url: cloudinaryUrls[0].url,
                category: "project-profile-image",
                imageable_id: project.id,
                imageable_type: "Project",
            };
            await (0, imageService_1.storedImage)(ImageData);
            return res.status(200).json({
                message: "Project Created Successfully",
                id: project.id,
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to create project" });
        }
    },
];
const createProjectDetailsImages = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
    (0, validationHandler_1.validationError)(errors);
    try {
        const cloudinaryUrls = req.cloudinaryUrls;
        if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
            const error = new Error("No images uploaded");
            error.status = 400;
            error.err_code = errorCode_1.errorCode.invalidCredentials;
            throw error;
        }
        cloudinaryUrls.forEach((url) => {
            const ImageData = {
                public_id: url.public_id,
                url: url.url,
                category: "project-details-image",
                imageable_id: Number(req.params.id),
                imageable_type: "Project",
            };
            (0, imageService_1.storedImage)(ImageData);
        });
        return res.status(200).json({
            message: "Project Details Images Created Successfully",
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};
exports.createProjectDetailsImages = createProjectDetailsImages;
exports.deleteProjectDetailsImage = [
    (0, express_validator_1.body)("public_ids").isArray().withMessage("Id is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        try {
            const public_ids = req.body.public_ids;
            public_ids.forEach((public_id) => {
                (0, deleteImage_1.deleteImage)(public_id);
            });
            return res.status(200).json({
                message: "Project Details Images Deleted Successfully",
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to create project" });
        }
    },
];
exports.updateProjectController = [
    (0, express_validator_1.body)("name").isLength({ min: 3 }).withMessage("Name is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    (0, express_validator_1.body)("technologies").isLength({ min: 1 }).withMessage("Url is required"),
    (0, express_validator_1.body)("demo_url").optional(),
    (0, express_validator_1.body)("front_end").optional(),
    (0, express_validator_1.body)("back_end").optional(),
    (0, express_validator_1.body)("doc_url").optional(),
    (0, express_validator_1.body)("role").isLength({ min: 3 }).withMessage("Role is required"),
    (0, express_validator_1.body)("challenge").isLength({ min: 3 }).withMessage("Challenge is required"),
    (0, express_validator_1.body)("solutions").isLength({ min: 3 }).withMessage("Solutions is required"),
    (0, express_validator_1.body)("key_feature")
        .isLength({ min: 3 })
        .withMessage("Key feature is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        try {
            const cloudinaryUrls = req.cloudinaryUrls;
            const id = req.params.id;
            if (cloudinaryUrls) {
                const oldImage = await (0, projectService_1.getProjectImage)(id);
                if (oldImage) {
                    (0, deleteImage_1.deleteImage)(oldImage?.public_id);
                }
                const ImageData = {
                    public_id: cloudinaryUrls[0].public_id,
                    url: cloudinaryUrls[0].url,
                    category: "project-profile-image",
                    imageable_id: Number(id),
                    imageable_type: "Project",
                };
                await (0, imageService_1.storedImage)(ImageData);
            }
            const projectData = {
                name: req.body.name,
                description: req.body.description,
                technologies: req.body.technologies,
                demo_url: req.body.demo_url,
                front_end: req.body.front_end,
                back_end: req.body.back_end,
                doc_url: req.body.doc_url,
                role: req.body.role,
                challenge: req.body.challenge,
                solutions: req.body.solutions,
                key_feature: req.body.key_feature,
            };
            const project = await (0, projectService_1.updateProjectService)(id, projectData);
            return res.status(200).json({
                message: "Project Updated Successfully",
                project,
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to create project" });
        }
    },
];
const deleteProjectController = async (req, res, next) => {
    const id = req.params.id;
    const oldImage = await (0, projectService_1.getProjectImage)(id);
    if (oldImage) {
        (0, deleteImage_1.deleteImage)(oldImage?.public_id);
    }
    const oldDetailsImages = await (0, projectService_1.getProjectDetailsImages)(id);
    if (oldDetailsImages.length > 0) {
        oldDetailsImages.forEach((image) => {
            (0, deleteImage_1.deleteImage)(image.public_id);
        });
    }
    await (0, projectService_1.deleteProjectService)(id);
    return res.status(200).json({
        message: "Project Deleted Successfully",
    });
};
exports.deleteProjectController = deleteProjectController;
const getProjectDetailsController = async (req, res, next) => {
    const id = req.params.id;
    const profileImage = await (0, projectService_1.getProjectImage)(id);
    const project = await (0, projectService_1.getProjectDetails)(id);
    const detailsImages = await (0, projectService_1.getProjectDetailsImages)(id);
    return res.status(200).json({
        profileImage: profileImage?.url,
        detailsImages,
        ...project,
    });
};
exports.getProjectDetailsController = getProjectDetailsController;
const getProjectController = async (req, res, next) => {
    const q = req.query.q || "";
    const projects = await (0, projectService_1.getProject)(q);
    return res.status(200).json(projects);
};
exports.getProjectController = getProjectController;
const updateFeaturedProjectController = async (req, res, next) => {
    const id = req.params.id;
    const project = await (0, projectService_1.updateFeaturedProjectService)(id);
    return res.status(200).json({
        message: "Project Featured Updated Successfully",
    });
};
exports.updateFeaturedProjectController = updateFeaturedProjectController;
//# sourceMappingURL=projectController.js.map