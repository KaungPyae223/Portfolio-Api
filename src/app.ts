import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimitter from "./middlewares/rateLimitter";
import authRoutes from "./routes/api/v1/auth";
import cookieParser from "cookie-parser";
import userSideRoutes from "./routes/api/v1/user-side";

export const app = express();

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(compression())
  .use(helmet({}))
  .use(cookieParser())
  .use(rateLimitter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user-side", userSideRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const errorCode = error.err_code || "Error_Code";
  res.status(status).json({ message, error: errorCode });
});
