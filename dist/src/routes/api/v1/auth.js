"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../../controllers/authController");
const auth_1 = require("../../../middlewares/auth");
const router = express_1.default.Router();
router.post("/register", authController_1.registerController);
router.post("/login", authController_1.loginController);
router.post("/change-password", auth_1.authMiddleware, authController_1.changePasswordController);
router.post("/logout", auth_1.authMiddleware, authController_1.logOutController);
router.get("/check-auth", auth_1.authMiddleware, authController_1.checkAuthController);
exports.default = router;
//# sourceMappingURL=auth.js.map