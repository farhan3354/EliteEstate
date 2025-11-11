import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["viewing", "meeting", "consultation"],
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: [true, "Please provide a scheduled date"],
    },
    duration: {
      type: Number,
      default: 30,
    },
    message: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
      default: "pending",
    },
    contactInfo: {
      name: String,
      phone: String,
      email: String,
    },
    reminders: {
      smsSent: { type: Boolean, default: false },
      emailSent: { type: Boolean, default: false },
    },
    cancellationReason: String,
    feedback: {
      rating: Number,
      comment: String,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ property: 1, scheduledDate: 1 });
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ agent: 1, status: 1 });

export default mongoose.model("Booking", bookingSchema);
