import userModel from "../models/user.model.js";
import {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";
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
  user.refreshToken = refreshToken;
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
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized token not found",
    });
  }
  try {
    const decoded = verifyAccessToken(accessToken);
    const user = await userModel.findById(decoded.id);
    res.status(200).json({
      message: "user fetched successfully",
      data: {
        user: {
          username: user.username,
          email: user.username,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired access token",
    });
  }
};

/**
 * @POST /api/auth/refresh
 */

export const loginApiController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized, refresh token not found",
    });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(decoded.id);
    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({
        message: "Unauthorized, refresh token mismatch",
      });
    }
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
    user.refreshToken = newRefreshToken;
    await user.save();
    res.stauts(200).json({
      message: "Token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized, Invalid or expired refresh token",
    });
  }
};
