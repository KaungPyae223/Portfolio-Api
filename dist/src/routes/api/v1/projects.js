"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_js_1 = require("../../../middlewares/auth.js");
const multerts_js_1 = __importDefault(require("../../../config/multerts.js"));
const uploadMiddleware_js_1 = require("../../../middlewares/uploadMiddleware.js");
const express_1 = __importDefault(require("express"));
const projectController_js_1 = require("../../../controllers/projectController.js");
const router = express_1.default.Router();
router.get("/", projectController_js_1.getProjectController);
router.get("/:id", projectController_js_1.getProjectDetailsController);
router.post("/", auth_js_1.authMiddleware, multerts_js_1.default.single("image"), uploadMiddleware_js_1.uploadToCloudinary, projectController_js_1.createProjectController);
router.put("/:id", auth_js_1.authMiddleware, multerts_js_1.default.single("image"), uploadMiddleware_js_1.uploadToCloudinary, projectController_js_1.updateProjectController);
router.delete("/images", auth_js_1.authMiddleware, projectController_js_1.deleteProjectDetailsImage);
router.delete("/:id", auth_js_1.authMiddleware, projectController_js_1.deleteProjectController);
router.post("/:id/images", auth_js_1.authMiddleware, multerts_js_1.default.array("images"), uploadMiddleware_js_1.uploadToCloudinary, projectController_js_1.createProjectDetailsImages);
router.put("/featured/:id", auth_js_1.authMiddleware, projectController_js_1.updateFeaturedProjectController);
exports.default = router;
//# sourceMappingURL=projects.js.map