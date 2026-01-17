import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property is required"],
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Buyer is required"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller/Agent is required"],
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    buyerContact: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "viewing-scheduled",
        "negotiating",
        "closed",
        "not-interested",
      ],
      default: "new",
    },
    contactMethod: {
      type: String,
      enum: ["call", "whatsapp", "chat", "email"],
      default: "chat",
    },
    responses: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    viewingScheduled: {
      type: Boolean,
      default: false,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    readBySeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
inquirySchema.index({ property: 1, createdAt: -1 });
inquirySchema.index({ buyer: 1, status: 1 });
inquirySchema.index({ seller: 1, status: 1, readBySeller: 1 });
inquirySchema.index({ status: 1, createdAt: -1 });

// Virtual for response count
inquirySchema.virtual("responseCount").get(function () {
  return this.responses ? this.responses.length : 0;
});

// Ensure virtuals are included in JSON
inquirySchema.set("toJSON", { virtuals: true });
inquirySchema.set("toObject", { virtuals: true });

export default mongoose.model("Inquiry", inquirySchema);
