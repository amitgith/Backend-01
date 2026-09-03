import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const app = express();
// middleware
app.use(express.json());
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to authentication",
  });
});
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  //   save data to db
  const token = jwt.sign(
    {
      name,
      email,
      // _id
    },
    process.env.JWT_SECRET,
  );
  res.status(201).json({
    message: "User Created Successfully",
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
