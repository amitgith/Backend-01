import userModel from "../models/user.model.js";
import bycrpt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
export const apicontroller = (req, res) => {
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
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.ACCESS_TOKEN_SECRET,
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
      token,
    },
  });
};
export const aboutMeApicontroller = async (req, res) => {
  console.log(req.user);
  res.status(200).json({
    data: {
      user: req.user,
    },
  });
};
