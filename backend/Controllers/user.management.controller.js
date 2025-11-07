import { User } from "../Models/user.model.js";

export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user", isDeleted: false }).select(
      "-password"
    );
    if (!users)
      return res.status(400).json({ success: false, message: "No member yet" });
    return res
      .status(200)
      .json({ success: true, message: "Members got successfully", users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error fetching all users",
    });
  }
};

export const AddNewUser = async (req, res) => {
  try {
    const { firstName, lastName, speciality, email, password } = req.body;
    if (!firstName || !lastName || !speciality || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    const user = { firstName, lastName, speciality, email, password };
    await User.create(user);
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error creating new user" });
  }
};

export const SoftDelete = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id)
      return res
        .status(200)
        .json({ success: false, message: "User id not found" });

    const user = await User.findByIdAndUpdate(
      user_id,
      { isDeleted: true },
      { new: true }
    );

    if (!user)
      return res
        .status(200)
        .json({ success: false, message: "User not found" });

    return res
      .status(200)
      .json({ success: true, message: "User moved to trash" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error deleting user" });
  }
};
