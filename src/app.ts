import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimitter from "./middlewares/rateLimitter";
import cookieParser from "cookie-parser";
import router from "./routes/api/v1/index";
import serverless from "serverless-http";

const app = express();

const whitelist = [process.env.ALLOW_ORIGIN];

const corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, origin?: any) => void,
  ) {
    // Allow requests with no origin ( like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors(corsOptions))
  .use(compression())
  .use(helmet({}))
  .use(cookieParser())
  .use(rateLimitter)
  .use("/api/v1", router);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const errorCode = error.err_code || "Error_Code";
  res.status(status).json({ message, error: errorCode });
});

export default serverless(app);
