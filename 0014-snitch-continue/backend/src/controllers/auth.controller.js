import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { gernerateToken } from "../utils/auth.util.js";

export const apiController = (req, res) => {
  try {
    console.log("Welcome to Snitch Project Api");
    res.status(200).json({
      message: "Welcome to Snitch Project api",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: "Internal server error",
    });
  }
};
export const registerApiController = async (req, res) => {
  const { email, name, password } = req.body;
  const isUserAlreadyExists = await userModel.findOne({
    email,
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "user already exists with this email address",
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
  const { accessToken, refreshToken } = gernerateToken({
    userId: user._id,
    role: user._role,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });
  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });
  res.status(200).json({
    message: "user registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    },
    accessToken,
  });
};
export const loginApiController = async (req, res) => {
  try {
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
    const { accessToken, refreshToken } = gernerateToken({
      userId: user._id,
      role: user.role,
    });
    await userModel.findByIdAndUpdate({ email }, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "user loggedIn successfully",
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
      messae: "Internal Server error",
    });
  }
};
