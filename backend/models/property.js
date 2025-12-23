import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: ["sale", "rent", "lease"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "apartments",
        "villas",
        "townhouses",
        "commercial",
        "land",
        "rooms",
        "warehouses",
        "buildings",
      ],
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    images: [{ type: String }],
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "sold", "rented", "inactive"],
    },
    location: {
      address: String,
      city: {
        type: String,
        default: "Abu Dhabi",
      },
      area: String,
    },
    contactInfo: {
      name: String,
      phone: String,
      email: String,
      showPhone: {
        type: Boolean,
        default: true,
      },
    },

    yearBuilt: Number,
    furnishing: {
      type: String,
      enum: ["furnished", "unfurnished", "semi-furnished"],
    },
    priceType: {
      type: String,
      enum: ["total", "per-year", "per-month"],
      default: "total",
    },
    areaUnit: {
      type: String,
      enum: ["sqft", "sqm"],
      default: "sqft",
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
