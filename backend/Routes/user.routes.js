import express from "express";
import {
  LoginUser,
  RegisterUser,
  UpdateUserProfile,
} from "../Controllers/auth.user.controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";
import {
  GetTasksByUser,
  UpdateTaskStatus,
} from "../Controllers/task.management.controller.js";
const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);

router.get("/tasks", protectRoute, GetTasksByUser);

router.put("/update/profile", protectRoute, UpdateUserProfile);

router.put("/update-status/:id", protectRoute, UpdateTaskStatus);

export default router;
