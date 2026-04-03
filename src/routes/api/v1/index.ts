import express from "express";
import authRoutes from "./auth";
import userSideRoutes from "./user-side";
import home from "./home-management";
import certificate from "./certificate";
import project from "./projects";
import about from "./about";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user-side", userSideRoutes);
router.use("/home-management", home);
router.use("/certificate", certificate);
router.use("/project", project);
router.use("/about", about);

router.use("/", function (req, res, next) {
  res.status(200).json({
    message: "Welcome to the Portfolio API",
  });
});

export default router;
