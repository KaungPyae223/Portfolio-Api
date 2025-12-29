import express from "express";
import {
  loginController,
  changePasswordController,
  registerController,
  logOutController,
  checkAuthController,
} from "../../../controllers/authController";
import { authMiddleware } from "../../../middlewares/auth";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/change-password", authMiddleware, changePasswordController);
router.post("/logout", authMiddleware, logOutController);
router.get("/check-auth", authMiddleware, checkAuthController);
export default router;
