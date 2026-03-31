"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../../../controllers/homeController");
const auth_1 = require("../../../middlewares/auth");
const multerts_1 = __importDefault(require("../../../config/multerts"));
const uploadMiddleware_1 = require("../../../middlewares/uploadMiddleware");
const router = express_1.default.Router();
router.put("/hero-manage", auth_1.authMiddleware, homeController_1.homeHeroManagementController);
router.put("/about-manage", auth_1.authMiddleware, homeController_1.homeAboutManagementController);
router.post("/experience-manage", auth_1.authMiddleware, homeController_1.homeExperienceController);
router.delete("/experience-manage/:id", auth_1.authMiddleware, homeController_1.homeExperienceDeleteController);
router.get("/get-all-home", auth_1.authMiddleware, homeController_1.getAllHomeController);
router.post("/education-manage", auth_1.authMiddleware, homeController_1.homeEducationController);
router.delete("/education-manage/:id", auth_1.authMiddleware, homeController_1.homeEducationDeleteController);
router.put("/meta-manage", auth_1.authMiddleware, homeController_1.homeMetaUpdateController);
router.patch("/upload-profile-image", auth_1.authMiddleware, multerts_1.default.single("image"), uploadMiddleware_1.uploadToCloudinary, homeController_1.upload_profile_image);
router.delete("/delete-profile-image", auth_1.authMiddleware, homeController_1.delete_profile_image);
router.patch("/upload-cv", auth_1.authMiddleware, multerts_1.default.single("cv"), uploadMiddleware_1.uploadToCloudinary, homeController_1.upload_cv);
router.delete("/delete-cv/:language", auth_1.authMiddleware, homeController_1.delete_cv);
router.post("/create-skill", auth_1.authMiddleware, multerts_1.default.single("image"), uploadMiddleware_1.uploadToCloudinary, homeController_1.createSkill);
router.delete("/delete-skill/:id", auth_1.authMiddleware, homeController_1.deleteSkill);
exports.default = router;
//# sourceMappingURL=home-management.js.map