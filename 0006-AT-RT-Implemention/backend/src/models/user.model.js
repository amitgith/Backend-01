import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [3, "Minimum 3 characters are required"],
      maxLength: [20, "Maximum 20 characters are required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already exits"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    passwordHash: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Minimum 8 lengths are required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
