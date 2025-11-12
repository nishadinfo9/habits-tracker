import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// middlewares
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb" }));
app.use(cookieParser());

// import routes
import userRouter from "./src/routes/user.router.js";
import habitRouter from "./src/routes/habit.router.js";

// declear routes
app.use("/api/v1", userRouter);
app.use("/api/v1", habitRouter);

export default app;
