import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String, // Path or identifier for the icon
      default: "FiHome",
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
    }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
