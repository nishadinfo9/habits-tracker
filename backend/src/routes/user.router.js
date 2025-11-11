import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser } from "../controller/user.controller.js";
const router = Router();

router
  .route("/auth/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

export default router;
