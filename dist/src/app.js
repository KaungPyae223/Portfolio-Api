"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const rateLimitter_1 = __importDefault(require("./middlewares/rateLimitter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/api/v1/index"));
exports.app = (0, express_1.default)();
const whitelist = [process.env.ALLOW_ORIGIN];
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin ( like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
exports.app
    .use((0, morgan_1.default)("dev"))
    .use(express_1.default.urlencoded({ extended: true }))
    .use(express_1.default.json())
    .use((0, cors_1.default)(corsOptions))
    .use((0, compression_1.default)())
    .use((0, helmet_1.default)({}))
    .use((0, cookie_parser_1.default)())
    .use(rateLimitter_1.default)
    .use("/api/v1", index_1.default);
exports.app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Server Error";
    const errorCode = error.err_code || "Error_Code";
    res.status(status).json({ message, error: errorCode });
});
//# sourceMappingURL=app.js.map