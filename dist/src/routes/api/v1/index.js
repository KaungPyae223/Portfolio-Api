"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const user_side_1 = __importDefault(require("./user-side"));
const home_management_1 = __importDefault(require("./home-management"));
const certificate_1 = __importDefault(require("./certificate"));
const projects_1 = __importDefault(require("./projects"));
const router = express_1.default.Router();
router.use("/auth", auth_1.default);
router.use("/user-side", user_side_1.default);
router.use("/home-management", home_management_1.default);
router.use("/certificate", certificate_1.default);
router.use("/project", projects_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map