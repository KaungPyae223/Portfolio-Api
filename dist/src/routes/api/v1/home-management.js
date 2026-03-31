"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_js_1 = require("../../../controllers/homeController.js");
const auth_js_1 = require("../../../middlewares/auth.js");
const multerts_js_1 = __importDefault(require("../../../config/multerts.js"));
const uploadMiddleware_js_1 = require("../../../middlewares/uploadMiddleware.js");
const router = express_1.default.Router();
router.put("/hero-manage", auth_js_1.authMiddleware, homeController_js_1.homeHeroManagementController);
router.put("/about-manage", auth_js_1.authMiddleware, homeController_js_1.homeAboutManagementController);
router.post("/experience-manage", auth_js_1.authMiddleware, homeController_js_1.homeExperienceController);
router.delete("/experience-manage/:id", auth_js_1.authMiddleware, homeController_js_1.homeExperienceDeleteController);
router.get("/get-all-home", auth_js_1.authMiddleware, homeController_js_1.getAllHomeController);
router.post("/education-manage", auth_js_1.authMiddleware, homeController_js_1.homeEducationController);
router.delete("/education-manage/:id", auth_js_1.authMiddleware, homeController_js_1.homeEducationDeleteController);
router.put("/meta-manage", auth_js_1.authMiddleware, homeController_js_1.homeMetaUpdateController);
router.patch("/upload-profile-image", auth_js_1.authMiddleware, multerts_js_1.default.single("image"), uploadMiddleware_js_1.uploadToCloudinary, homeController_js_1.upload_profile_image);
router.delete("/delete-profile-image", auth_js_1.authMiddleware, homeController_js_1.delete_profile_image);
router.patch("/upload-cv", auth_js_1.authMiddleware, multerts_js_1.default.single("cv"), uploadMiddleware_js_1.uploadToCloudinary, homeController_js_1.upload_cv);
router.delete("/delete-cv/:language", auth_js_1.authMiddleware, homeController_js_1.delete_cv);
router.post("/create-skill", auth_js_1.authMiddleware, multerts_js_1.default.single("image"), uploadMiddleware_js_1.uploadToCloudinary, homeController_js_1.createSkill);
router.delete("/delete-skill/:id", auth_js_1.authMiddleware, homeController_js_1.deleteSkill);
exports.default = router;
//# sourceMappingURL=home-management.js.map