import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    image: [{ type: String }], // Array of image URLs or file paths
    number: { type: String },
    status: { type: Boolean, default: false }, // true for approved, false for pending
  },
  {
    timestamps: true,
  },
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
export default Application;
