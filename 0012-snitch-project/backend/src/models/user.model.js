import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Minimum 3 characters are required"],
      maxLength: [20, "Maximum 20 characters are required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already exist"],
      lowercase: true, // Automically lowercases the email
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Minimum 8 characters are required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "seller"],
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("users", userSchema);
export default userModel;
