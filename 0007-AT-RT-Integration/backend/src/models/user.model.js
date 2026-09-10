import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: [3, "Minimum 3 characters are required"],
      maxLength: [10, "Maximum 10 characters are required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already exist"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    passwordHash: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Minimum 8 length is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
