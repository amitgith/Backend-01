import mongoose from "mongoose";
const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "OriginalUrl is required"],
    },
    shortCode: {
      type: String,
      required: [true, "shortCode is required"],
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const urlModel = mongoose.model("urls", urlSchema);
export default urlModel;
