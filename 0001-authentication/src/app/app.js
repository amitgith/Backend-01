import express from "express";
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
  const { email, name, password } = req.body;
  //   save data to db
  const token = jwt.sign(
    {
      email,
      name,
      //_id
    },
    "6955b383532d9e3717dc4d6f8646a608a7da5bdb3ad917761affd5e358f92a26",
  );
  res.status(201).json({
    message: "user created successfully",
    data: {
      user: {
        email,
        password,
      },
      token,
    },
  });
});

export default app;
