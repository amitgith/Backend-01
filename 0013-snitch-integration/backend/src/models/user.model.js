import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Minimum 3 characters are required"],
      minLength: [3, "Minimum 3 characters are required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already exist"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "seller"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
