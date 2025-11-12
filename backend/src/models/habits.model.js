import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      enum: ["Morning", "Work", "Fitness", "Evening", "Study"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completionHistory: {
      type: [String],
      default: [],
    },
  },

  { timestamps: true }
);

export const Habit = mongoose.model("Habit", habitSchema);
