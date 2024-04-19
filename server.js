import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

//dependencies
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import { nanoid } from "nanoid";
import cookieParser from "cookie-parser";

//routers
import authRouter from "./routes/authRoute.js";
import jobRouter from "./routes/jobRoute.js";
import userRouter from "./routes/userRoute.js";
//

//public
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
//

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
//
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
//

//middleware
app.use(cookieParser());
app.use(express.json());
//

//Routes
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
//

app.use(errorHandlerMiddleware);
//listen
try {
  const port = process.env.PORT;
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server running on ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
