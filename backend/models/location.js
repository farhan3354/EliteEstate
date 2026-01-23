import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Location name is required"],
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Location image is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema);

export default Location;
