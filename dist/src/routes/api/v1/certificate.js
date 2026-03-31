"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../../../middlewares/auth");
const multerts_1 = __importDefault(require("../../../config/multerts"));
const uploadMiddleware_1 = require("../../../middlewares/uploadMiddleware");
const express_1 = __importDefault(require("express"));
const certificateController_1 = require("../../../controllers/certificateController");
const router = express_1.default.Router();
router.get("/", certificateController_1.getCertificateController);
router.get("/:id", certificateController_1.getCertificateDetailsController);
router.post("/", auth_1.authMiddleware, multerts_1.default.single("image"), uploadMiddleware_1.uploadToCloudinary, certificateController_1.createCertificateController);
router.put("/:id", auth_1.authMiddleware, multerts_1.default.single("image"), uploadMiddleware_1.uploadToCloudinary, certificateController_1.updateCertificateController);
router.delete("/:id", auth_1.authMiddleware, certificateController_1.deleteCertificateController);
router.put("/featured/:id", auth_1.authMiddleware, certificateController_1.updateFeaturedCertificateController);
exports.default = router;
//# sourceMappingURL=certificate.js.map