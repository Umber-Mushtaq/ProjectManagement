import { User } from "../Models/user.model.js";
import { generateToken } from "../Utils/util.js";
import bcrypt from "bcrypt";

export const RegisterUser = async (req, res) => {
  try {
    const { imageUrl, firstName, lastName, speciality, email, password } =
      req.body;
    if (
      !imageUrl ||
      !firstName ||
      !lastName ||
      !speciality ||
      !email ||
      !password
    )
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    const user = await User.create({
      imageUrl,
      firstName,
      lastName,
      speciality,
      email,
      password,
      role: "user",
    });
    const token = generateToken(user);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .json({
        success: true,
        message: "User Created Successfully",
        user,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error creating user" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Fill all the fields" });
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Please Register Yourself" });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Wrong Password" });
    const token = generateToken(user);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .json({
        success: true,
        message: "User LogedIn Successfully",
        user,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server error login user" });
  }
};

export const UpdateUserProfile = async (req, res) => {
  try {
    const { imageUrl, firstName, lastName, speciality, email } = req.body;
    if (!imageUrl || !firstName || !lastName || !speciality || !email)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    const id = req.user.id;
    const newData = { imageUrl, firstName, lastName, speciality, email };
    const user = await User.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
      selece: "-password",
    });
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Server Error Editing The Profile");
  }
};
