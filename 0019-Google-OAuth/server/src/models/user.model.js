import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: String,
    avatar: String,
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
