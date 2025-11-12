import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  registerUser,
  loggedInUser,
  logoutUser,
  accessTokenRefreshed,
  currentPasswordChange,
  currentUser,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router
  .route("/auth/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/auth/login").post(loggedInUser);
router.route("/auth/logout").post(verifyJWT, logoutUser);
router.route("/auth/refresh-token").post(accessTokenRefreshed);
router.route("/auth/password-change").patch(verifyJWT, currentPasswordChange);
router.route("/auth/current-user").get(verifyJWT, currentUser);
export default router;
