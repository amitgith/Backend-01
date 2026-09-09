import userModel from "../models/user.model.js";
import { generateTokens } from "../utils/auth.js";
import bcrypt from "bcryptjs";

export const apiController = (req, res) => {
  console.log("ok got it");
  res.status(200).json({
    message: "Welcome to authentication ap",
  });
};

/**
 * @POST /api/auth/register
 */

export const registerApiController = async (req, res) => {
  const { username, email, password } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({
      message: "User already exists",
      errors: {
        path: "email",
        message: "User already exists",
      },
    });
  }

  const user = await userModel.create({
    username,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });
  const { accessToken, refreshToken } = generateTokens({ userId: user._id });
  user.refrehToken = refreshToken;
  await user.save();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        username: user.username,
        email: user.email,
      },
    },
    accessToken,
  });
};
/**
 * @GET /api/auth/me
 */

export const aboutMeApiController = async (req, res) => {
  const accessToken = req.headers.authorization?.split("")[1];
  if (!accessToken) {
    return res.status(400).json({
        message:"Unauthorized token not found"
    });
  }
};
