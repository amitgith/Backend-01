import express from "express";
const app = express();
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to authentication api",
  });
});
export default app;
