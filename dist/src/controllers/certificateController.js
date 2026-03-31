"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeaturedCertificateController = exports.deleteCertificateController = exports.updateCertificateController = exports.createCertificateController = exports.getCertificateController = exports.getCertificateDetailsController = void 0;
const certificatesServices_1 = require("../services/certificatesServices");
const express_validator_1 = require("express-validator");
const validationHandler_1 = require("../utils/validationHandler");
const imageService_1 = require("../services/imageService");
const errorCode_1 = require("../config/errorCode");
const deleteImage_1 = require("../utils/deleteImage");
const getCertificateDetailsController = async (req, res, next) => {
    const id = req.params.id || "";
    const certificate = await (0, certificatesServices_1.getCertificateDetails)(id);
    return res.status(200).json(certificate);
};
exports.getCertificateDetailsController = getCertificateDetailsController;
const getCertificateController = async (req, res, next) => {
    const q = req.query.q || "";
    const certificates = await (0, certificatesServices_1.getCertificates)(q);
    return res.status(200).json(certificates);
};
exports.getCertificateController = getCertificateController;
exports.createCertificateController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("lecture").isLength({ min: 3 }).withMessage("Lecture is required"),
    (0, express_validator_1.body)("url").isLength({ min: 1 }).withMessage("Url is required"),
    (0, express_validator_1.body)("complete_date")
        .isLength({ min: 3 })
        .withMessage("Complete date is required"),
    (0, express_validator_1.body)("technologies")
        .isLength({ min: 3 })
        .withMessage("Technologies is required"),
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
            const certificateData = {
                title: req.body.title,
                lecture: req.body.lecture,
                url: req.body.url,
                complete_date: req.body.complete_date,
                technologies: req.body.technologies,
            };
            const certificate = await (0, certificatesServices_1.createCertificateService)(certificateData);
            const ImageData = {
                public_id: cloudinaryUrls[0].public_id,
                url: cloudinaryUrls[0].url,
                category: "certificate-image",
                imageable_id: certificate.id,
                imageable_type: "Certificate",
            };
            await (0, imageService_1.storedImage)(ImageData);
            return res.status(200).json({
                message: "Certificate Created Successfully",
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to create certificate" });
        }
    },
];
exports.updateCertificateController = [
    (0, express_validator_1.body)("title").isLength({ min: 3 }).withMessage("Title is required"),
    (0, express_validator_1.body)("lecture").isLength({ min: 3 }).withMessage("Lecture is required"),
    (0, express_validator_1.body)("url").isLength({ min: 1 }).withMessage("Url is required"),
    (0, express_validator_1.body)("complete_date")
        .isLength({ min: 3 })
        .withMessage("Complete date is required"),
    (0, express_validator_1.body)("technologies")
        .isLength({ min: 3 })
        .withMessage("Technologies is required"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        try {
            const cloudinaryUrls = req.cloudinaryUrls;
            const id = req.params.id;
            if (cloudinaryUrls) {
                const oldImage = await (0, certificatesServices_1.getCertificateImage)(id);
                if (oldImage) {
                    (0, deleteImage_1.deleteImage)(oldImage?.public_id);
                }
                const ImageData = {
                    public_id: cloudinaryUrls[0].public_id,
                    url: cloudinaryUrls[0].url,
                    category: "certificate-image",
                    imageable_id: id,
                    imageable_type: "Certificate",
                };
                await (0, imageService_1.storedImage)(ImageData);
            }
            const certificateData = {
                title: req.body.title,
                lecture: req.body.lecture,
                url: req.body.url,
                complete_date: req.body.complete_date,
                technologies: req.body.technologies,
            };
            const certificate = await (0, certificatesServices_1.updateCertificateService)(id, certificateData);
            return res.status(200).json({
                message: "Certificate Updated Successfully",
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ error: "Failed to update certificate" });
        }
    },
];
const deleteCertificateController = async (req, res, next) => {
    const id = req.params.id;
    const oldImage = await (0, certificatesServices_1.getCertificateImage)(id);
    if (oldImage) {
        (0, deleteImage_1.deleteImage)(oldImage?.public_id);
    }
    await (0, certificatesServices_1.deleteCertificateService)(id);
    return res.status(200).json({
        message: "Certificate Deleted Successfully",
    });
};
exports.deleteCertificateController = deleteCertificateController;
const updateFeaturedCertificateController = async (req, res, next) => {
    const id = req.params.id;
    const certificate = await (0, certificatesServices_1.updateFeaturedCertificateService)(id);
    return res.status(200).json({
        message: "Certificate Featured Updated Successfully",
    });
};
exports.updateFeaturedCertificateController = updateFeaturedCertificateController;
//# sourceMappingURL=certificateController.js.map