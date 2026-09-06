import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is not found",
    });
  }
  const data = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  const user = await userModel.findById(data.id);
  req.user = user;
  next();
};
