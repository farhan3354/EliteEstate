import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a property title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a property description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide the property price"],
    },
    type: {
      type: String,
      required: [true, "Please specify property type"],
      enum: ["sale", "rent"],
    },
    category: {
      type: String,
      required: [true, "Please specify property category"],
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
      required: [true, "Please specify number of bedrooms"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please specify number of bathrooms"],
    },
    area: {
      type: Number,
      required: [true, "Please specify area"],
    },
    yearBuilt: Number,
    furnishing: {
      type: String,
      enum: ["furnished", "unfurnished", "semi-furnished"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Please provide the address"],
      },
      city: {
        type: String,
        default: "Abu Dhabi",
      },
      area: {
        type: String,
        required: [true, "Please specify the area"],
      },
      community: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    features: [String],
    amenities: {
      building: [String],
      apartment: [String],
      community: [String],
    },
    images: [
      {
        url: String,
        public_id: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    videos: [
      {
        url: String,
        thumbnail: String,
      },
    ],
    virtualTour: String,
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    status: {
      type: String,
      enum: ["active", "sold", "rented", "inactive", "expired"],
      default: "active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    favoritesCount: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000),
    },
    availableFrom: Date,
  },
  {
    timestamps: true,
  }
);

propertySchema.index({ "location.coordinates": "2dsphere" });
propertySchema.index({ category: 1, type: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({ isFeatured: -1, createdAt: -1 });

const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
