import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/auth.utils.js";

export const apiController = (req, res) => {
  try {
    console.log("Welcome to Snitch Api");
    res.status(200).json({
      message: "Welcome to Snitch Api",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: "Interval Server error",
    });
  }
};
export const registerApiController = async (req, res) => {
  const { name, email, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    email,
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email address",
      errors: [
        {
          field: "email",
          message: "User already exists with this email address",
        },
      ],
    });
  }
  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });
  const { accessToken, refreshToken } = generateTokens({ userId: user._id });
  user.refreshToken = refreshToken;
  await user.save();
};
