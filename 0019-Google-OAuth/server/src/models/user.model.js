import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
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
      trim: true,
    },
    name: String,
    avatar: String,
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.googleId;
      },
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
