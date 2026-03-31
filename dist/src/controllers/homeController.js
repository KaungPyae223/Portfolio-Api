"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCertificates = exports.deleteSkill = exports.createSkill = exports.delete_cv = exports.upload_cv = exports.delete_profile_image = exports.upload_profile_image = exports.homeMetaUpdateController = exports.homeEducationDeleteController = exports.homeEducationController = exports.homeExperienceDeleteController = exports.homeExperienceController = exports.homeAboutManagementController = exports.homeHeroManagementController = exports.getAllHomeController = exports.homeController = void 0;
const userSideService_1 = require("../services/userSideService");
const express_validator_1 = require("express-validator");
const validationHandler_1 = require("../utils/validationHandler");
const homeService_1 = require("../services/homeService");
const imageService_1 = require("../services/imageService");
const deleteImage_1 = require("../utils/deleteImage");
const errorCode_1 = require("../config/errorCode");
const certificatesServices_1 = require("../services/certificatesServices");
const homeController = async (req, res, next) => {
    const language = req.query.language || "English";
    const home = await (0, userSideService_1.getHomeService)(language);
    const skills = await (0, userSideService_1.getSkillsService)();
    const experiences = await (0, userSideService_1.getHomeExperiencesService)();
    const educations = await (0, userSideService_1.getHomeEducationService)();
    const profileImage = await (0, imageService_1.getHomeProfileImage)();
    const certificates = await (0, homeService_1.getHomeCertificates)();
    const projects = await (0, homeService_1.getHomeProjects)();
    const cv = await (0, imageService_1.getCV)(language);
    const allCVs = await (0, imageService_1.getAllCV)();
    const homeData = {
        ...home,
        profileURL: profileImage?.url,
        cvURL: cv?.url,
        skills,
        experiences,
        educations,
        allCVs,
        certificates,
        projects,
    };
    return res.status(200).json(homeData);
};
exports.homeController = homeController;
const getAllHomeController = async (req, res, next) => {
    const home = await (0, homeService_1.getAllHome)();
    return res.status(200).json(home);
};
exports.getAllHomeController = getAllHomeController;
exports.homeHeroManagementController = [
    (0, express_validator_1.body)("language").isLength({ min: 3 }).withMessage("Language is required"),
    (0, express_validator_1.body)("name").isLength({ min: 3 }).withMessage("Name is required"),
    (0, express_validator_1.body)("prefix").isLength({ min: 1 }).withMessage("Prefix is required"),
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("content").isLength({ min: 3 }).withMessage("Content is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const homeData = {
            prefix: req.body.prefix,
            name: req.body.name,
            title: req.body.title,
            content: req.body.content,
        };
        (0, homeService_1.updateHome)(req.body.language, homeData);
        return res.status(200).json({
            message: "Home Hero Updated Successfully",
        });
    },
];
exports.homeAboutManagementController = [
    (0, express_validator_1.body)("language").isLength({ min: 3 }).withMessage("Language is required"),
    (0, express_validator_1.body)("name").isLength({ min: 3 }).withMessage("Name is required"),
    (0, express_validator_1.body)("date_of_birth")
        .isLength({ min: 1 })
        .withMessage("Date of Birth is required"),
    (0, express_validator_1.body)("location").isLength({ min: 3 }).withMessage("Location is required"),
    (0, express_validator_1.body)("email").isLength({ min: 3 }).withMessage("Email is required"),
    (0, express_validator_1.body)("phone").isLength({ min: 3 }).withMessage("Phone is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const homeAboutData = {
            prefix: req.body.prefix,
            name: req.body.name,
            date_of_birth: req.body.date_of_birth,
            location: req.body.location,
        };
        const metaData = {
            email: req.body.email,
            phone: req.body.phone,
        };
        (0, homeService_1.updateHome)(req.body.language, homeAboutData);
        (0, homeService_1.updateHomeMetaData)(metaData);
        return res.status(200).json({
            message: "Home About Updated Successfully",
        });
    },
];
exports.homeExperienceController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const homeExperienceData = {
            title: req.body.title,
            description: req.body.description,
        };
        await (0, userSideService_1.createHomeExperienceService)(homeExperienceData);
        return res.status(200).json({
            message: "Home Experience Created Successfully",
        });
    },
];
const homeExperienceDeleteController = async (req, res, next) => {
    const experienceId = req.params.id;
    await (0, userSideService_1.deleteExperience)(Number(experienceId));
    return res.status(200).json({
        message: "Home Experience Deleted Successfully",
    });
};
exports.homeExperienceDeleteController = homeExperienceDeleteController;
exports.homeEducationController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const homeEducationData = {
            title: req.body.title,
            description: req.body.description,
        };
        await (0, userSideService_1.createHomeEducationService)(homeEducationData);
        return res.status(200).json({
            message: "Home Education Created Successfully",
        });
    },
];
const homeEducationDeleteController = async (req, res, next) => {
    const educationId = req.params.id;
    await (0, userSideService_1.deleteEducation)(Number(educationId));
    return res.status(200).json({
        message: "Home Education Deleted Successfully",
    });
};
exports.homeEducationDeleteController = homeEducationDeleteController;
exports.homeMetaUpdateController = [
    (0, express_validator_1.body)("email").isLength({ min: 3 }).withMessage("Email is required"),
    (0, express_validator_1.body)("phone").isLength({ min: 3 }).withMessage("Phone is required"),
    (0, express_validator_1.body)("github").isLength({ min: 3 }).withMessage("Github is required"),
    (0, express_validator_1.body)("linkedin").isLength({ min: 3 }).withMessage("Linkedin is required"),
    (0, express_validator_1.body)("facebook").isLength({ min: 3 }).withMessage("Facebook is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const homeMetaData = {
            email: req.body.email,
            phone: req.body.phone,
            github: req.body.github,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
        };
        await (0, homeService_1.updateHomeMetaData)(homeMetaData);
        return res.status(200).json({
            message: "Home Contact Updated Successfully",
        });
    },
];
const upload_profile_image = async (req, res, next) => {
    try {
        const cloudinaryUrls = req.cloudinaryUrls;
        if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
            res.status(400).json({ error: "No images uploaded" });
            return;
        }
        const oldImage = await (0, imageService_1.getHomeProfileImage)();
        if (oldImage) {
            await (0, deleteImage_1.deleteImage)(oldImage.public_id);
        }
        const ImageData = {
            public_id: cloudinaryUrls[0].public_id,
            url: cloudinaryUrls[0].url,
            category: "profile",
            imageable_id: 0,
            imageable_type: "Home",
        };
        await (0, imageService_1.storedImage)(ImageData);
        res.status(200).json({
            message: "Images uploaded successfully",
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload images" });
    }
};
exports.upload_profile_image = upload_profile_image;
const delete_profile_image = async (req, res, next) => {
    const oldImage = await (0, imageService_1.getHomeProfileImage)();
    if (oldImage) {
        await (0, deleteImage_1.deleteImage)(oldImage.public_id);
    }
    return res.status(200).json({
        message: "Images deleted successfully",
    });
};
exports.delete_profile_image = delete_profile_image;
const upload_cv = async (req, res, next) => {
    try {
        const cloudinaryUrls = req.cloudinaryUrls;
        const language = req.body.language;
        if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
            res.status(400).json({ error: "No images uploaded" });
            return;
        }
        const oldCV = await (0, imageService_1.getCV)(language);
        if (oldCV) {
            await (0, deleteImage_1.deleteImage)(oldCV.public_id);
        }
        const ImageData = {
            public_id: cloudinaryUrls[0].public_id,
            url: cloudinaryUrls[0].url,
            category: "cv-" + language,
            imageable_id: 0,
            imageable_type: "Home",
        };
        await (0, imageService_1.storedImage)(ImageData);
        res.status(200).json({
            message: "CV uploaded successfully",
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload cv" });
    }
};
exports.upload_cv = upload_cv;
const delete_cv = async (req, res, next) => {
    const oldCV = await (0, imageService_1.getCV)(req.params.language);
    if (oldCV) {
        await (0, deleteImage_1.deleteImage)(oldCV.public_id);
    }
    return res.status(200).json({
        message: "Images deleted successfully",
    });
};
exports.delete_cv = delete_cv;
exports.createSkill = [
    (0, express_validator_1.body)("name").isLength({ min: 1 }).withMessage("Name is required"),
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
            const skill = await (0, homeService_1.storeSkill)(req.body.name);
            const ImageData = {
                public_id: cloudinaryUrls[0].public_id,
                url: cloudinaryUrls[0].url,
                category: "skill-image",
                imageable_id: skill.id,
                imageable_type: "Skill",
            };
            await (0, imageService_1.storedImage)(ImageData);
            res.status(200).json({
                message: "Skill created successfully",
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to create cv" });
        }
    },
];
const deleteSkill = async (req, res, next) => {
    const id = req.params.id;
    const skillImage = await (0, homeService_1.getSkillImage)(Number(id));
    if (skillImage) {
        await (0, deleteImage_1.deleteImage)(skillImage?.public_id);
    }
    await (0, homeService_1.skillDelete)(Number(id));
    return res.status(200).json({
        message: "Skill deleted successfully",
    });
};
exports.deleteSkill = deleteSkill;
const getAllCertificates = async (req, res, next) => {
    const q = req.query.q;
    const certificates = await (0, certificatesServices_1.getCertificates)(q);
    return res.status(200).json(certificates);
};
exports.getAllCertificates = getAllCertificates;
//# sourceMappingURL=homeController.js.map