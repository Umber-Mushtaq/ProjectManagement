import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req.header("authorization")?.replace("Bearer ", "");

    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Token not found in the request" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Server Error Verifing Token" });
  }
};

export const authorizeAdmin = async (req, res, next) => {
  if (req.user.role !== "admin")
    return res
      .status(400)
      .json({ success: false, message: "Access Denied - Admins Only" });
  next();
};
