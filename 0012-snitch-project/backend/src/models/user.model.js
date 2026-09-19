import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
  },
});
