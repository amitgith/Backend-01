import jwt from "jsonwebtoken";
import config from "../config/config.js";
export const gernerateToken = ({ userId, role }) => {
  const accessToken = jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId, role }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accessToken,
    refreshToken,
  };
};

export const verifyAccessToken = (accessToken) => {
  const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
  return decoded;
};
export const verifyRefreshToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, config.refreshToken);
  return decoded;
};
