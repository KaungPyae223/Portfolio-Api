"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutExperienceController = exports.createAboutExperienceController = exports.getAllAboutExperienceController = exports.updateAboutEducationController = exports.createAboutEducationController = exports.getAllAboutEducationController = exports.updateAboutController = exports.getAboutIntroController = exports.getAboutController = void 0;
const aboutService_1 = require("../services/aboutService");
const imageService_1 = require("../services/imageService");
const express_validator_1 = require("express-validator");
const validationHandler_1 = require("../utils/validationHandler");
const userSideService_1 = require("../services/userSideService");
const getAboutController = async (req, res, next) => {
    const language = req.query.language || "English";
    const aboutIntro = await (0, userSideService_1.getAboutService)(language);
    const profileImage = await (0, imageService_1.getHomeProfileImage)();
    const aboutEducation = await (0, userSideService_1.getAboutEducationService)(language);
    const aboutExperience = await (0, userSideService_1.getAboutExperienceService)(language);
    const data = {
        ...aboutIntro,
        profileURL: profileImage?.url,
        aboutEducation,
        aboutExperience,
    };
    return res.status(200).json(data);
};
exports.getAboutController = getAboutController;
const getAboutIntroController = async (req, res, next) => {
    const aboutIntro = await (0, aboutService_1.getAllAboutService)();
    return res.status(200).json(aboutIntro);
};
exports.getAboutIntroController = getAboutIntroController;
exports.updateAboutController = [
    (0, express_validator_1.body)("title").isLength({ min: 1 }).withMessage("Title is required"),
    (0, express_validator_1.body)("subtitle").isLength({ min: 1 }).withMessage("Subtitle is required"),
    (0, express_validator_1.body)("first_paragraph")
        .isLength({ min: 3 })
        .withMessage("First paragraph is required"),
    (0, express_validator_1.body)("second_paragraph")
        .isLength({ min: 3 })
        .withMessage("Second paragraph is required"),
    (0, express_validator_1.body)("language").isLength({ min: 1 }).withMessage("Language is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const aboutData = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            first_paragraph: req.body.first_paragraph,
            second_paragraph: req.body.second_paragraph,
        };
        await (0, aboutService_1.updateAbout)(req.body.language, aboutData);
        return res.status(200).json({
            message: "About Updated Successfully",
        });
    },
];
const getAllAboutEducationController = async (req, res, next) => {
    const aboutEducation = await (0, aboutService_1.getAllEducationService)();
    return res.status(200).json(aboutEducation);
};
exports.getAllAboutEducationController = getAllAboutEducationController;
exports.createAboutEducationController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    (0, express_validator_1.body)("language").isLength({ min: 1 }).withMessage("Language is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const aboutEducationData = {
            title: req.body.title,
            description: req.body.description,
            language: req.body.language,
        };
        await (0, aboutService_1.createAboutEducationService)(aboutEducationData);
        return res.status(200).json({
            message: "About Education Created Successfully",
        });
    },
];
exports.updateAboutEducationController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    (0, express_validator_1.body)("language").isLength({ min: 1 }).withMessage("Language is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const id = req.params.id;
        const aboutExperienceData = {
            title: req.body.title,
            description: req.body.description,
            language: req.body.language,
        };
        await (0, aboutService_1.updateAboutEducationService)(id, aboutExperienceData);
        return res.status(200).json({
            message: "About Education Updated Successfully",
        });
    },
];
const getAllAboutExperienceController = async (req, res, next) => {
    const aboutExperience = await (0, aboutService_1.getAllExperienceService)();
    return res.status(200).json(aboutExperience);
};
exports.getAllAboutExperienceController = getAllAboutExperienceController;
exports.createAboutExperienceController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    (0, express_validator_1.body)("language").isLength({ min: 1 }).withMessage("Language is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const aboutExperienceData = {
            title: req.body.title,
            description: req.body.description,
            language: req.body.language,
        };
        await (0, aboutService_1.createAboutExperienceService)(aboutExperienceData);
        return res.status(200).json({
            message: "About Experience Created Successfully",
        });
    },
];
exports.updateAboutExperienceController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("description")
        .isLength({ min: 3 })
        .withMessage("Description is required"),
    (0, express_validator_1.body)("language").isLength({ min: 1 }).withMessage("Language is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const id = req.params.id;
        const aboutExperienceData = {
            title: req.body.title,
            description: req.body.description,
            language: req.body.language,
        };
        await (0, aboutService_1.updateAboutExperienceService)(id, aboutExperienceData);
        return res.status(200).json({
            message: "About Experience Updated Successfully",
        });
    },
];
//# sourceMappingURL=aboutController.js.map