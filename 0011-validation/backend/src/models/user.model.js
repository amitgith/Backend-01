import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already exist"],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number is already exist"],
      match: /^[6-9]\d{9}$/,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Minimum 8 characters are required"],
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
