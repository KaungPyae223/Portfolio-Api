"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../../../controllers/homeController");
const aboutController_1 = require("../../../controllers/aboutController");
const router = express_1.default.Router();
router.get("/home", homeController_1.homeController);
router.get("/about", aboutController_1.getAboutController);
exports.default = router;
//# sourceMappingURL=user-side.js.map