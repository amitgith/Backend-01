import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.utils.js";
export const apiController = (req, res) => {
  try {
    console.log("Welcome to Snitch Integration Api");
    res.status(200).json({
      message: "Welcome to Snitch Integration Api ",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
export const registerApiController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isUserAlreadyExists = await userModel.findOne({
      email,
    });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists with this email address",
        errors: [
          {
            path: "email",
            message: "User already exists with this email address",
          },
        ],
      });
    }
    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });
    const { accessToken, refreshToken } = generateTokens({
      userId: user._id,
      role: user.role,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });
    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
export const loginApiController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const { accessToken, refreshToken } = generateTokens({
    userId: user._id,
    role: user.role,
  });
  await userModel.findOneAndUpdate({ email }, { refreshToken });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  res.status(200).json({
    message: "User loggedIn Succesfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    },
    accessToken,
  });
};
export const refreshApiController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.staus(401).json({
      message: "Refresh token is required",
    });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const { userId, role } = decoded;
    const user = await userModel.findById(userId);
    if (refreshToken != user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });
      return res.status(401).json({
        message: "Refresh Token mismatch",
      });
    }
    const accessToken = verifyAccessToken({
      userId,
      role,
    });
    const newRefreshToken = verifyRefreshToken({
      userId,
      role,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "Tokens rotated successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Refresh Token",
    });
  }
};
