"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aboutController_1 = require("../../../controllers/aboutController");
const auth_1 = require("../../../middlewares/auth");
const router = express_1.default.Router();
router.get("/get-all-intro", auth_1.authMiddleware, aboutController_1.getAboutIntroController);
router.put("/update-intro", auth_1.authMiddleware, aboutController_1.updateAboutController);
router.get("/get-all-education", auth_1.authMiddleware, aboutController_1.getAllAboutEducationController);
router.post("/create-education", auth_1.authMiddleware, aboutController_1.createAboutEducationController);
router.put("/update-education/:id", auth_1.authMiddleware, aboutController_1.updateAboutEducationController);
router.get("/get-all-experience", auth_1.authMiddleware, aboutController_1.getAllAboutExperienceController);
router.post("/create-experience", auth_1.authMiddleware, aboutController_1.createAboutExperienceController);
router.put("/update-experience/:id", auth_1.authMiddleware, aboutController_1.updateAboutExperienceController);
exports.default = router;
//# sourceMappingURL=about.js.map