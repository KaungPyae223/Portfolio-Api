"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTTokens = exports.checkUserExist = void 0;
const crypto_1 = require("crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorCode_1 = require("../config/errorCode");
const checkUserExist = (userCount) => {
    if (userCount) {
        const error = new Error("There is a user in your system");
        error.status = 409;
        error.err_code = errorCode_1.errorCode.userExist;
        throw error;
    }
};
exports.checkUserExist = checkUserExist;
const generateJWTTokens = (user) => {
    const accessTokenPayLoad = {
        id: user.id,
    };
    const refreshTokenPayLoad = {
        id: user.id,
        random_token: (0, crypto_1.randomBytes)(32).toString("hex"),
        email: user.email,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }
    if (!refreshSecret) {
        throw new Error("REFRESH_TOKEN_SECRET is not defined");
    }
    const accessToken = jsonwebtoken_1.default.sign(accessTokenPayLoad, secret, {
        expiresIn: "15m",
    });
    const refreshToken = jsonwebtoken_1.default.sign(refreshTokenPayLoad, refreshSecret, {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.generateJWTTokens = generateJWTTokens;
//# sourceMappingURL=auth.js.map