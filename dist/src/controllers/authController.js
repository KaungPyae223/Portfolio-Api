"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.loginController = exports.registerController = void 0;
const express_validator_1 = require("express-validator");
const validationHandler_1 = require("../utils/validationHandler");
const authService_1 = require("../services/authService");
const auth_1 = require("../utils/auth");
const bcrypt = __importStar(require("bcrypt"));
exports.registerController = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const userExist = await (0, authService_1.getTotalUsers)();
        (0, auth_1.checkUserExist)(userExist);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const userData = {
            email: req.body.email,
            password: hashPassword,
        };
        const user = await (0, authService_1.storedUser)(userData);
        const { accessToken, refreshToken } = (0, auth_1.generateJWTTokens)(user);
        await (0, authService_1.updateUser)(user.id, {
            random_token: refreshToken,
        });
        return res
            .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        })
            .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(201)
            .json({
            message: "Register successfully",
        });
    },
];
exports.loginController = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Invalid password"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        const user = await (0, authService_1.getUserByEmail)(req.body.email);
        if (!user) {
            const error = new Error("Invalid email or password");
            error.status = 409;
            error.err_code = "INVALID_CREDENTIALS";
            throw error;
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            const error = new Error("Invalid email or password");
            error.status = 409;
            error.err_code = "INVALID_CREDENTIALS";
            throw error;
        }
        const { accessToken, refreshToken } = (0, auth_1.generateJWTTokens)(user);
        await (0, authService_1.updateUser)(user.id, {
            random_token: refreshToken,
        });
        return res
            .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 15 * 60 * 1000,
        })
            .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(201)
            .json({
            message: "Login successfully",
        });
    },
];
exports.changePasswordController = [
    (0, express_validator_1.body)("old_password").isLength({ min: 6 }).withMessage("Invalid password"),
    (0, express_validator_1.body)("new_password")
        .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol"),
    async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req).array({ onlyFirstError: true });
        (0, validationHandler_1.validationError)(errors);
        return res.json({
            message: "Change password successfully",
        });
    },
];
//# sourceMappingURL=authController.js.map