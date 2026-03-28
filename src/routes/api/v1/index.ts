import express from "express";
import authRoutes from "./auth";
import userSideRoutes from "./user-side";
import home from "./home-management";
import certificate from "./certificate";
import project from "./projects";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user-side", userSideRoutes);
router.use("/home-management", home);
router.use("/certificate", certificate);
router.use("/project", project);

export default router;
