import express from "express";
import {
  LoginAdmin,
  RegisterAdmin,
  UpdateProfile,
} from "../Controllers/auth.admin.controller.js";
import { authorizeAdmin, protectRoute } from "../Middleware/auth.middleware.js";
import {
  AddNewUser,
  GetAllUsers,
  SoftDelete,
} from "../Controllers/user.management.controller.js";
import {
  CreateTeam,
  DeleteTeam,
  GetAllTeams,
  UpdateTeam,
} from "../Controllers/team.management.controller.js";
import {
  CreateProject,
  GetAllProjects,
} from "../Controllers/project.management.controller.js";
import {
  CreateTask,
  GetAllTasks,
  GetTasksByProject,
} from "../Controllers/task.management.controller.js";
const router = express.Router();

router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);
router.post("/add", protectRoute, authorizeAdmin, AddNewUser);

router.post("/team/create", protectRoute, authorizeAdmin, CreateTeam);

router.post("/project/create", protectRoute, authorizeAdmin, CreateProject);
router.post("/task/create", protectRoute, authorizeAdmin, CreateTask);

router.get("/project/all", protectRoute, authorizeAdmin, GetAllProjects);
router.get("/tast/getall", protectRoute, authorizeAdmin, GetAllTasks);
router.get(
  "/task/project/:id",
  protectRoute,
  authorizeAdmin,
  GetTasksByProject
);
router.get("/team/get", protectRoute, authorizeAdmin, GetAllTeams);
router.get("/all", protectRoute, authorizeAdmin, GetAllUsers);

router.put("/update", protectRoute, authorizeAdmin, UpdateProfile);

router.patch("/soft-delete/:id", protectRoute, authorizeAdmin, SoftDelete);

router.put("/team/update/:id", protectRoute, authorizeAdmin, UpdateTeam);

router.delete("/team/delete/:id", protectRoute, authorizeAdmin, DeleteTeam);

export default router;
