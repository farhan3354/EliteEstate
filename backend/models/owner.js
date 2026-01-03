import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: String,
    businessType: {
      type: String,
      enum: ["individual", "company", "trust", "partnership"],
      default: "individual",
    },
    taxId: String,
    registrationNumber: String,

    businessAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    alternatePhone: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },

    properties: [
      {
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
        ownershipType: {
          type: String,
          enum: ["sole", "joint", "company"],
          default: "sole",
        },
        ownershipPercentage: {
          type: Number,
          min: 0,
          max: 100,
          default: 100,
        },
        acquiredDate: Date,
        purchasePrice: Number,
      },
    ],

    bankDetails: {
      accountNumber: String,
      bankName: String,
      branch: String,
      ifscCode: String,
      accountHolderName: String,
      accountType: {
        type: String,
        enum: ["savings", "current", "business"],
        default: "savings",
      },
    },
    preferredPaymentMethod: {
      type: String,
      enum: ["bank_transfer", "check", "online"],
      default: "bank_transfer",
    },

    assignedAgents: [
      {
        agentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent",
        },
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
        agreement: {
          commissionRate: Number,
          startDate: Date,
          endDate: Date,
          terms: String,
          isExclusive: {
            type: Boolean,
            default: false,
          },
        },
        status: {
          type: String,
          enum: ["active", "pending", "terminated", "expired"],
          default: "active",
        },
        assignedDate: Date,
      },
    ],

    documents: {
      idProof: String,
      addressProof: String,
      ownershipProofs: [String],
      taxDocuments: [String],
      bankProof: String,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected", "under_review"],
      default: "pending",
    },
    verifiedAt: Date,

    tenants: [
      {
        tenantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
        lease: {
          startDate: Date,
          endDate: Date,
          rentAmount: Number,
          securityDeposit: Number,
          paymentDueDate: Number,
        },
        status: {
          type: String,
          enum: ["active", "past", "pending"],
          default: "active",
        },
      },
    ],

    totalProperties: {
      type: Number,
      default: 0,
    },
    activeListings: {
      type: Number,
      default: 0,
    },
    rentedProperties: {
      type: Number,
      default: 0,
    },
    monthlyRevenue: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },

    notificationPreferences: {
      rentReminders: { type: Boolean, default: true },
      maintenanceAlerts: { type: Boolean, default: true },
      agentUpdates: { type: Boolean, default: true },
      marketInsights: { type: Boolean, default: false },
    },

    monthlyReports: [
      {
        month: String,
        propertiesListed: Number,
        propertiesRented: Number,
        propertiesSold: Number,
        totalRevenue: Number,
        expenses: Number,
        netProfit: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

ownerSchema.virtual("ownerName").get(function () {
  const user = this.populated("user") || this.user;
  return user ? user.name : "";
});

ownerSchema.virtual("ownerEmail").get(function () {
  const user = this.populated("user") || this.user;
  return user ? user.email : "";
});

ownerSchema.index({ user: 1 });
ownerSchema.index({ verificationStatus: 1 });
ownerSchema.index({ "properties.propertyId": 1 });

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
