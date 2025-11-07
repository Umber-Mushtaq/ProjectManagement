import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
    totalTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
