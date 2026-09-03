import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const app = express();
// middle ware
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to authentication api",
  });
});
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  // save data to data base
  const token = jwt.sign(
    {
      name,
      email,
      // _id
    },
    process.env.JWT_SECRET,
  );
  res.status(201).json({
    message: "User created succefully",
    data: {
      user: {
        name,
        email,
      },
      token,
    },
  });
});
export default app;
