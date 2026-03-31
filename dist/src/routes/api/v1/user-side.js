"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../../../controllers/homeController");
const router = express_1.default.Router();
router.get("/home", homeController_1.homeController);
exports.default = router;
//# sourceMappingURL=user-side.js.map