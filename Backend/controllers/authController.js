import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { fullname, email, phoneNumber, password, isAdmin } = req.body;
  if (!fullname || !email || !phoneNumber || !password || !isAdmin) {
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exist with this email.",
      success: false,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newuser = await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    isAdmin,
  });

  return res.status(201).json({
    message: "Account created successfully.",
    success: true,
  });

  res.json({ token: generateToken(newuser._id) });
};

export const login = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  if (!email || !password || !isAdmin) {
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Incorrect email or password.",
      success: false,
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Incorrect email or password.",
      success: false,
    });
  }

  if (isAdmin !== user.isAdmin) {
    return res.status(400).json({
      message: "Account doesn't exist with current role.",
      success: false,
    });
  }

  res.json({ token: generateToken(user._id) });
};
