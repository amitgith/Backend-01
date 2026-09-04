import express from "express";
import userModel from "../models/user.model.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { authenticate } from "../middleware/auth.middleware.js";
const app = express();
// middleware
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welocme to authenciation api",
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
    message: "User created successfully",
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
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne(
    {
      email,
    },
    config.ACCESS_TOKEN_SECRET,
  );
  const isValidPassword = await bycrpt.compare(password, user.password);
  if(!isValidPassword){
    return res.status(401).json({
        message:"Invalid email or password"
    })
  }
});
export default app;
