import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.router.js";
dotenv.config({ path: "./.env" });
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1", userRouter);

export default app;
