import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";

export const apiController = (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome to snitch project api",
    });
    console.log("Welcome to snitch project api");
  } catch (error) {
    console.log(error.message);
  }
};
export const registerApiController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadyUsers = await userModel.findOne({ email });
    if (isAlreadyUsers) {
      return res.status(400).json({
        message: "Email is already exists",
        errors: {
          path: "email",
          message: "Email is already exist",
        },
      });
    }
    const user = await userModel.create({
      name,
      email,
      passwordHash: await bcrypt.hash(password, 12),
    });

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });
    res.status(200).json({
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
      message: "Internal server error",
    });
  }
};
export const loginApiController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });
    await userModel.findOneAndUpdate(
      { email },
      {
        refreshToken,
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "User loggedIn successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
