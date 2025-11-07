import { Task } from "../Models/task.model.js";
import { Project } from "../Models/project.model.js";
import { Team } from "../Models/team.model.js";

export const CreateProject = async (req, res) => {
  try {
    const { name, description, team, dueDate } = req.body;

    if (!name || !description || !team || !dueDate)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const newteam = await Team.findOne({ name: team }).populate("memberList");
    if (!newteam)
      return res
        .status(400)
        .json({ success: false, message: "Team not found" });

    const project = await Project.create({
      name,
      description,
      team: newteam._id,
      dueDate,
      members: newteam.memberList.map((member) => member._id),
    });

    return res
      .status(201)
      .json({ success: true, message: "Project created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error creating project" });
  }
};

export const GetAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isDeleted: false })
      .populate("team", "name description logo")
      .populate("task", "name description status dueDate")
      .populate("members", "imageUrl firstName lastName email speciality");

    if (!projects || projects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No projects found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving projects",
    });
  }
};
