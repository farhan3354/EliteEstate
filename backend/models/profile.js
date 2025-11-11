import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    nationality: String,

    // For Agents/Brokers
    company: String,
    licenseNumber: String,
    bio: {
      type: String,
      maxlength: 500,
    },
    experience: {
      type: Number,
      default: 0,
    },
    specialization: [String], // ['residential', 'commercial', 'luxury']

    alternatePhone: String,
    website: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
    },

    address: {
      street: String,
      city: {
        type: String,
        default: "Abu Dhabi",
      },
      area: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    propertiesListed: {
      type: Number,
      default: 0,
    },
    totalSales: {
      type: Number,
      default: 0,
    },

    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
      },
      language: {
        type: String,
        default: "en",
      },
      currency: {
        type: String,
        default: "AED",
      },
    },

    documents: [
      {
        type: {
          type: String,
          enum: ["license", "id", "certificate"],
        },
        url: String,
        public_id: String,
        verified: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);
