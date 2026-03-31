"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Use memory storage to handle files in memory
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.match(/jpeg|jpg|png|gif|webp|pdf$/i)) {
        cb(new Error("Only image files are allowed"));
        return;
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
exports.default = upload;
//# sourceMappingURL=multerts.js.map