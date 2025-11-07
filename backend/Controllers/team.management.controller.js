import { Team } from "../Models/team.model.js";
import { User } from "../Models/user.model.js";

export const CreateTeam = async (req, res) => {
  try {
    const { name, description, logo, memberList } = req.body;
    if (!name || !description || !logo || !memberList) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    const checkTeam = await Team.findOne({ name });
    if (checkTeam)
      return res
        .status(400)
        .json({ success: false, message: "The name already exists" });

    const team = new Team({ name, description, logo, memberList });
    await team.save();

    await Promise.all(
      memberList.map((userId) =>
        User.findByIdAndUpdate(
          userId,
          { team: team.name },
          { runValidators: true }
        )
      )
    );

    return res
      .status(201)
      .json({ success: true, message: "Team Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error creating team" });
  }
};

export const GetAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate(
      "memberList",
      "firstName lastName email speciality"
    );

    if (teams.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No teams found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return res.status(500).json({
      success: false,
      message: "Server error retrieving teams",
    });
  }
};

export const UpdateTeam = async (req, res) => {
  try {
    const team_id = req.params.id;
    const { name, description, logo, memberList } = req.body;
    if (!name || !description || !logo || !memberList) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    const newTeam = { name, description, logo, memberList };

    const updated = await Team.findByIdAndUpdate(team_id, newTeam, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Team Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error updating team" });
  }
};

export const DeleteTeam = async (req, res) => {
  try {
    const team_id = req.params.id;

    const deleted = await Team.findByIdAndDelete(team_id);

    if (!deleted)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    return res
      .status(200)
      .json({ success: true, message: "Team Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error updating team" });
  }
};
