import express from "express";
import userModel from "../models/user.model.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const app = express();
// middleware
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to authenciation api",
  });
});
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
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
    message: "User Created Successfully",
    data: {
      user: {
        name,
        email,
        id: user._id,
      },
      token,
    },
  });
});
app.get("/api/auth/me",)
export default app;
