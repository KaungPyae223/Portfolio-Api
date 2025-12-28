"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, _res, next) => {
    const { accessToken, refreshToken } = req.cookies ?? {};
    if (!accessToken || !refreshToken) {
        const error = new Error(!accessToken ? "Access Token is Expired" : "Unauthorized");
        error.status = 401;
        error.err_code = !accessToken ? "EXPIRED_ACCESS_TOKEN" : "UNAUTHORIZED";
        return next(error);
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        const error = new Error("Server configuration error");
        error.status = 500;
        error.err_code = "SERVER_ERROR";
        return next(error);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, secret);
        req.userID = decoded.id;
        next();
    }
    catch (err) {
        const error = new Error("Access Token is Expired");
        error.status = 401;
        error.err_code = "EXPIRED_ACCESS_TOKEN";
        return next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map