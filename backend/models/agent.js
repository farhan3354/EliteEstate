import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
    },
    licenseExpiry: {
      type: Date,
      required: [true, "License expiry date is required"],
    },
    specialization: [
      {
        type: String,
        enum: [
          "residential",
          "commercial",
          "luxury",
          "rental",
          "investment",
          "new_development",
        ],
      },
    ],
    bio: {
      type: String,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },
    languages: [String],
    officeAddress: String,
    officePhone: String,
    website: String,
    socialMedia: {
      facebook: String,
      linkedin: String,
      instagram: String,
      twitter: String,
    },

    companyName: String,
    yearsOfExperience: Number,
    areasServed: [String],

    totalListings: {
      type: Number,
      default: 0,
    },
    activeListings: {
      type: Number,
      default: 0,
    },
    soldListings: {
      type: Number,
      default: 0,
    },
    totalCommission: {
      type: Number,
      default: 0,
    },
    avgDaysOnMarket: Number,

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
      breakdown: {
        communication: { type: Number, default: 0 },
        knowledge: { type: Number, default: 0 },
        responsiveness: { type: Number, default: 0 },
        negotiation: { type: Number, default: 0 },
      },
    },

    commissionRate: {
      type: Number,
      default: 5,
      min: 1,
      max: 20,
    },
    minCommission: Number,

    workingHours: {
      monday: { start: String, end: String },
      tuesday: { start: String, end: String },
      wednesday: { start: String, end: String },
      thursday: { start: String, end: String },
      friday: { start: String, end: String },
      saturday: { start: String, end: String },
      sunday: { start: String, end: String },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    idProof: String,
    addressProof: String,
    licenseCopy: String,
    taxDocuments: [String],
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected", "under_review"],
      default: "pending",
    },
    verifiedAt: Date,

    assignedOwners: [
      {
        ownerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Owner",
        },
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
        commissionAgreement: Object,
        assignedDate: Date,
      },
    ],

    clients: [
      {
        clientId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: ["buyer", "seller"],
        },
        since: Date,
        status: {
          type: String,
          enum: ["active", "past", "potential", "pending"],
          default: "active",
        },
      },
    ],

    monthlyStats: [
      {
        month: String,
        inquiries: Number,
        viewings: Number,
        dealsClosed: Number,
        commissionEarned: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

agentSchema.virtual("fullName").get(function () {
  const user = this.populated("user") || this.user;
  return user ? user.name : "";
});

agentSchema.virtual("agentEmail").get(function () {
  const user = this.populated("user") || this.user;
  return user ? user.email : "";
});

agentSchema.index({ verificationStatus: 1 });
agentSchema.index({ "rating.average": -1 });

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
