import { Task } from "../Models/task.model.js";
import { Project } from "../Models/project.model.js";

export const CreateTask = async (req, res) => {
  try {
    const { name, description, projectId, assignedTo, dueDate } = req.body;

    if (!name || !projectId) {
      return res
        .status(400)
        .json({ success: false, message: "Name and project ID are required" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const newTask = await Task.create({
      name,
      description,
      project: projectId,
      assignedTo,
      dueDate,
    });

    project.task.push(newTask._id);
    project.totalTasks += 1;
    await project.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully and added to project",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error creating task" });
  }
};

export const GetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ isDeleted: false })
      .populate("project", "name description")
      .populate("assignedTo", "firstName lastName email speciality imageUrl")
      .sort({ createdAt: -1 });

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving tasks",
    });
  }
};

export const GetTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    const tasks = await Task.find({ project: projectId, isDeleted: false })
      .populate("assignedTo", "firstName lastName email speciality imageUrl")
      .sort({ createdAt: -1 });

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this project",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving tasks",
    });
  }
};

export const GetTasksByUser = async (req, res) => {
  try {
    const userid = req.user.id;

    if (!userid) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const tasks = await Task.find({
      assignedTo: userid,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving tasks",
    });
  }
};

export const UpdateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const { status } = req.body;

    const allowedStatuses = ["todo", "inProgress", "done"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed: todo, inProgress, done",
      });
    }

    // Find the existing task first
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const oldStatus = task.status; // ✅ store old status before changing

    // If status is the same, no need to update
    if (oldStatus === status) {
      return res.status(200).json({
        success: true,
        message: "Status already set to the provided value",
        task,
      });
    }

    // Update the task's status
    task.status = status;
    await task.save();

    // Update Project's completedTasks count
    const project = await Project.findById(task.project);
    if (project) {
      // ✅ Case 1: Task changed TO 'done'
      if (status === "done" && oldStatus !== "done") {
        project.completedTasks += 1;
      }
      // ✅ Case 2: Task changed FROM 'done' to something else
      else if (oldStatus === "done" && status !== "done") {
        project.completedTasks = Math.max(project.completedTasks - 1, 0);
      }

      await project.save();
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating task status",
    });
  }
};
