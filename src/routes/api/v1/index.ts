import express from "express";
import authRoutes from "./auth";
import userSideRoutes from "./user-side";
import home from "./home-management";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user-side", userSideRoutes);
router.use("/home-management", home);

export default router;
