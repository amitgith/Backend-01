import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

export const apiController = (req, res) => {
  try {
    console.log("Ok got it");
    res.status(200).json({
      message: "Welcome to authentication api",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Authentication connection error",
    });
  }
};

export const registerApiController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
      return res.status(401).json({
        message: "User already exists",
        errors: {
          path: "email",
          message: "User already exists",
        },
      });
    }
    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });
    const { accessToken, refreshToken } = generateTokens({ userId: user._id });
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Interval server server",
    });
  }
};
export const aboutMeApiController = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized, access token not found",
    });
  }
  try {
    const decoded = verifyAccessToken(accessToken);
    const user = await userModel.findById(decoded.id);
    res.status(200).json({
      message: "user fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      message: "Unathorized, Invalid or expired access token",
    });
  }
};
export const refreshApiController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Unathorized, refresh token not found",
    });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(decoded.id);
    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({
        message: "Unathorized, refresh token mismatch",
      });
    }
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });
    user.refreshToken = newRefreshToken;
    await user.save();
    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Interval Server error",
    });
  }
};
