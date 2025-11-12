import { Router } from "express";
import {
  addHabit,
  updateHabit,
  deleteHabit,
  myHabit,
  allHabits,
  singleHabit,
  isCompleteHabit,
} from "../controller/habit.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/user/add-habit").post(addHabit);
router.route("/user/update-habit/:id").patch(updateHabit);
router.route("/user/delete-habit/:id").delete(deleteHabit);
router.route("/user/my-habit").get(myHabit);
router.route("/user/all-habits").get(allHabits);
router.route("/user/single-habits/:id").get(singleHabit);
router.route("/user/complete-habits/:id").get(isCompleteHabit);

export default router;
