import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const apiController = (req, res) => {
  try {
    console.log("Welcome to Validators Api");
    res.status(200).json({
      message: "Welcome to Validators Api",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const registerApiController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await userModel.create({
      email,
      phone,
      passwordHash: await bcrypt.hash(password, 8),
    });

    res.status(201).json({
      message: "User Registered Successfully",
      data: {
        email,
        phone,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Internal Server error",
    });
  }
};
