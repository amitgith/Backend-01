import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateTokens = ({ userId }) => {
  const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export function verifyAccessToken(token) {
  const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  return decoded;
}
export function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
  return decoded;
}
