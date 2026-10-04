import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const createAccessToken = ({ userId, role }) => {
  const accessToken = jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const createRefreshToken = ({ userId, role }) => {
  const refreshToken = jwt.sign({ userId, role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
};
