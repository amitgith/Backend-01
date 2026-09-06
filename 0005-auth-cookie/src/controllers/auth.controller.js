import userModel from "../models/user.model.js";
import bycrpt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
export const apiController = (req, res) => {
  res.status(200).json({
    message: "Welcome to authentication api",
  });
};
export const registerApiController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "username,email and password are required",
    });
  }
  const alreadyRegister = await userModel.findOne({
    email,
  });
  if (alreadyRegister) {
    return res.status(400).json({
      success: false,
      message: "user is already exists",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password: await bycrpt.hash(password, 10),
  });
  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
  res.status(201).json({
    message: "User created successfully",
    data: {
      user: {
        username,
        email,
        password,
        id: user._id,
      },
      accessToken,
      refreshToken,
    },
  });
};
export const aboutMeApiController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    data: {
      user: req.user,
    },
  });
};
export const loginApiController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email or password is required",
    });
  }
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const hashPassword = await bycrpt.compare(password, user.password);
  if (!hashPassword) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const accesstoken = jwt.sign(
    {
      id: user._id,
    },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
  const refreshtoken = jwt.sign(
    {
      id: user._id,
    },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "15m",
    },
  );
  res.status(200).json({
    message: "user loggedIn successfully",
    data: {
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
      accesstoken,
      refreshtoken,
    },
  });
};
