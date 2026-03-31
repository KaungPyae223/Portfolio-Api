"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../../middlewares/auth");
const multerts_1 = __importDefault(require("../../../config/multerts"));
const uploadMiddleware_1 = require("../../../middlewares/uploadMiddleware");
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../../../controllers/projectController");
const router = express_1.default.Router();
router.get("/", projectController_1.getProjectController);
router.get("/:id", projectController_1.getProjectDetailsController);
router.post("/", auth_1.authMiddleware, multerts_1.default.single("image"), uploadMiddleware_1.uploadToCloudinary, projectController_1.createProjectController);
router.put("/:id", auth_1.authMiddleware, multerts_1.default.single("image"), uploadMiddleware_1.uploadToCloudinary, projectController_1.updateProjectController);
router.delete("/images", auth_1.authMiddleware, projectController_1.deleteProjectDetailsImage);
router.delete("/:id", auth_1.authMiddleware, projectController_1.deleteProjectController);
router.post("/:id/images", auth_1.authMiddleware, multerts_1.default.array("images"), uploadMiddleware_1.uploadToCloudinary, projectController_1.createProjectDetailsImages);
router.put("/featured/:id", auth_1.authMiddleware, projectController_1.updateFeaturedProjectController);
exports.default = router;
//# sourceMappingURL=projects.js.map