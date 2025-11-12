import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// middlewares
const app = express();
const allowOrigins = [
  "http://localhost:5173",
  "https://habits-tracker-pied.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("origin not allow"));
      }
    },
    credentials: true,
  })
);

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb" }));
app.use(cookieParser());

// import routes
import userRouter from "./src/routes/user.router.js";
import habitRouter from "./src/routes/habit.router.js";

// declear routes
app.use("/api/v1", userRouter);
app.use("/api/v1", habitRouter);

app.get("/", (req, res) => res.send("Backend is running!"));

export default app;
