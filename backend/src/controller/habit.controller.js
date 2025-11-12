import { Habit } from "../models/habits.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const addHabit = AsyncHandler(async (req, res) => {
  const { title, description, categories } = req.body;
  if ([title, description, categories].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "Invalid habit fields");
  }
  const habit = await Habit.create({
    title,
    description,
    categories,
    user: res.user?._id,
  });
  await habit.save();
  if (!habit) {
    throw new ApiError(401, "habit creation faild");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, habit, "habit created successfully"));
});

const updateHabit = AsyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(401, "updated Id does not exist");
  }

  const { title, description, categories } = req.body;
  if ([title, description, categories].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "Invalid habit fields");
  }

  const update = await Habit.findByIdAndUpdate(
    id,
    {
      $set: { title, description, categories },
    },
    { new: true } // spending time for finding
  );

  if (!update) {
    throw new ApiError(401, "habit update faild");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, update, "habit updated successfully"));
});

const deleteHabit = AsyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Invalid delete id");
  }

  const removeHabit = await Habit.findByIdAndDelete(id);
  if (!removeHabit) {
    throw new ApiError(401, "habit deleted faild");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "habit deleted successfully"));
});

const myHabit = AsyncHandler(async (req, res) => {
  const userId = res.user?._id;
  if (!userId) {
    throw new ApiError(400, "user id does not exist");
  }

  const ownHabit = await Habit.find({ user: userId }).populate(
    "user",
    "name email"
  );

  if (!ownHabit) {
    throw new ApiError(401, "own habit does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, ownHabit, "my habit fetched successfullt"));
});

const allHabits = AsyncHandler(async (req, res) => {
  const gettingAllHabits = await Habit.find();
  if (!gettingAllHabits) {
    throw new ApiError(404, "Invalid all habit");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, gettingAllHabits, "all habit get successfully"));
});

const singleHabit = AsyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "habit id does not exist");
  }

  const getHabit = await Habit.findById({ _id: id }).populate(
    "user",
    "name email"
  );

  if (!getHabit) {
    throw new ApiError(401, "single habit does not exist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, getHabit, "single habit fetched successfully"));
});

const isCompleteHabit = AsyncHandler(async (req, res) => {
  const userId = res.user._id;
  const habitId = req.params.id;

  if (!userId && !habitId) {
    throw new ApiError(400, "userId and habitId does not exist");
  }

  const isComplete = await Habit.findById({ _id: habitId });

  if (!isComplete) {
    throw new ApiError(400, "is complete faild");
  }

  const date = new Date().toLocaleDateString("en-GB");
  const localDate = date.replace(/\//g, "-");

  if (!localDate) {
    throw new ApiError(401, "local date not working");
  }

  if (!isComplete.completionHistory.includes(localDate)) {
    isComplete.completionHistory.push(localDate);
    await isComplete.save();
  }
  const stack = isComplete.completionHistory.length;

  return res
    .status(200)
    .json(new ApiResponse(200, {isComplete, stack}, "habit created successfully"));
});

export {
  addHabit,
  updateHabit,
  deleteHabit,
  myHabit,
  allHabits,
  singleHabit,
  isCompleteHabit,
};
