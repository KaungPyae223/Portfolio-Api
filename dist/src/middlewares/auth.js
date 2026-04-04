"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorCode_1 = require("../config/errorCode");
const authService_1 = require("../services/authService");
const auth_1 = require("../utils/auth");
const error_1 = require("../utils/error");
const authMiddleware = async (req, _res, next) => {
    const { accessToken, refreshToken } = req.cookies ?? {};
    if (!refreshToken) {
        return next((0, error_1.createError)("Unauthorized", 401, errorCode_1.errorCode.unauthorized));
    }
    const generateNewTokens = async () => {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        let decoded;
        if (!secret) {
            return next((0, error_1.createError)("Server configuration error", 500, errorCode_1.errorCode.serverError));
        }
        try {
            decoded = jsonwebtoken_1.default.verify(refreshToken, secret);
            const email = decoded.email;
            const user = await (0, authService_1.getUserByEmail)(email);
            if (!user) {
                return next((0, error_1.createError)("User not found", 401, errorCode_1.errorCode.unauthorized));
            }
            if (user.random_token !== refreshToken) {
                return next((0, error_1.createError)("Invalid session", 401, errorCode_1.errorCode.unauthorized));
            }
            const tokens = (0, auth_1.generateJWTTokens)(user);
            await (0, authService_1.updateUser)(user.id, {
                random_token: tokens.refreshToken,
            });
            const isProduction = process.env.NODE_ENV === "production";
            _res
                .cookie("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 15 * 60 * 1000,
            })
                .cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            req.userID = user.id;
            next();
        }
        catch (err) {
            return next((0, error_1.createError)("Refresh Token is Expired", 401, errorCode_1.errorCode.expiredRefreshToken));
        }
    };
    if (!accessToken) {
        await generateNewTokens();
    }
    else {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            return next((0, error_1.createError)("Server configuration error", 500, errorCode_1.errorCode.serverError));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, secret);
            req.userID = decoded.id;
            let findUser = (0, authService_1.getUserByID)(decoded.id);
            if (!findUser) {
                return next((0, error_1.createError)("User not found", 401, errorCode_1.errorCode.unauthorized));
            }
            next();
        }
        catch (err) {
            if (err.name == "TokenExpiredError") {
                await generateNewTokens();
            }
            else {
                return next((0, error_1.createError)("Access Token is invalid", 401, errorCode_1.errorCode.unauthorized));
            }
        }
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map