import express from "express";
import dotenv from "dotenv";
import bycrptjs from "bcryptjs";
dotenv.config();
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { authenticate } from "../middleware/auth.middleware.js";
const app = express();
// middleware
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to authentication",
  });
});
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password: await bycrptjs.hash(password, 10),
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
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

app.get("/api/auth/me", authenticate, async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    data: {
      user: req.user,
    },
  });
});
export default app;
